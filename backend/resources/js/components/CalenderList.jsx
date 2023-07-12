import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Grid, Modal, Typography, Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import dayGridPlugin from '@fullcalendar/daygrid';
import tippy from 'tippy.js';
import axios from 'axios';
import SuperMarketDesign from '../Design/SuperMarketDesign';

const CalenderList = (props) => {
    const [selectDate, SetSelectDate] = useState('');
    const [eventDatas, SetEventDatas] = useState([]);
    const [monthlyDatas, setMonthlyDatas] = useState([]);
    const [clickType, SetClickType] = useState('');
    const [cssStr, SetCssStr] = useState('');
    const [currentDate, SetCurrentDate] = useState(props.Today);
    const calref = useRef(null);
    var cssOption = '';
    const StyleWrapper = styled.div`
        margin: 0 10px;
        width: 100%;
        // min-width: 1000px;
        .fc-daygrid-day:hover {
            background-color: #eeeeee;
            cursor: pointer;
        }
        [data-date='${selectDate}'] {
            ${cssStr}
        }

        .fc-daygrid-event {
            border-color: #0066ff;
            background-color: #0066ff;
            cursor: pointer;
        }
        .fc-daygrid-event:hover {
            opacity: 0.6;
            cursor: pointer;
        }
    `;
    // Monthly_Data & Data_Grouping
    useEffect(() => {
        updateCalendar();
    }, []);

    const updateCalendar = () => {
        var startDate = CreateDate(calref.current.calendar.view.activeStart);
        var endDate = CreateDate(calref.current.calendar.view.activeEnd);
        SetCurrentDate(CreateDate(calref.current.calendar.getDate()));
        console.log(startDate, endDate);

        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    '/api/supermarket/betweendata/' +
                    startDate +
                    '/' +
                    endDate
            )
            .then((res) => {
                console.log(res.data);
                setMonthlyDatas(GroupingDate(res.data));
            })
            .catch();
    };

    const CreateDate = (data) => {
        var startYear = data.getFullYear();
        var startMonth = data.getMonth() + 1;

        if (data.getMonth() + 1 < 10) startMonth = '0' + startMonth;
        var startDay = data.getDate();
        if (startDay < 10) startDay = '0' + startDay;

        return `${startYear}-${startMonth}-${startDay}`;
    };

    // Get Select Date Data
    useEffect(() => {
        if (selectDate != '') {
            var dailyData = [];
            if (monthlyDatas[selectDate]) dailyData = monthlyDatas[selectDate];

            console.log('dailyData', dailyData);
            props.CallSelectDate({
                selectDate: selectDate,
                dailyData: dailyData,
                // clickType: clickType,
            });
        }
    }, [selectDate]);

    //Grouping Date
    const GroupingDate = (datas) => {
        var result = {};
        let strData = [];
        console.log(datas);

        // Grouping
        datas.forEach((data) => {
            var nowDate = data.出荷日;
            if (!result[nowDate]) {
                result[nowDate] = [];
            }
            result[nowDate].push(data);
        });

        //  Create EVENT
        Object.keys(result).forEach((k) => {
            strData.push({
                date: k,
                title: '出荷 : ' + result[k].length + '件',
            });
        });
        console.log(strData);
        SetEventDatas(strData);
        console.log('eventDatas', eventDatas);
        return result;
    };

    const handleDateClick = (dateClickInfo) => {
        SetSelectDate(dateClickInfo.dateStr);
        console.log('dateClickInfo: ', dateClickInfo); // 選択した範囲の情報をconsoleに出力
        // SetClickType('Date');
        SetCssStr(`
            outline: 2px solid red;
            outline-offset: -2px;
            cursor: pointer;
        `);
        // alert('Date: ' + dateClickInfo.dateStr);
    };

    const handleEventClick = (eventClickInfo) => {
        // console.log('eventClickInfo:', eventClickInfo.event.startStr); // 選択した範囲の情報をconsoleに出力
        // SetSelectDate(eventClickInfo.event.startStr);
        // SetClickType('Event');
        // SetCssStr(`
        // .fc-event-main {
        //     outline: 2px solid red;
        //     outline-offset: -2px;
        //     cursor: pointer;
        // }`);
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                marginTop: 2,
            }}
        >
            <StyleWrapper>
                <FullCalendar
                    ref={calref}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    initialDate={currentDate}
                    locales={[jaLocale]}
                    locale="ja"
                    contentHeight={'500px'}
                    businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
                    // eventDidMount={eventWithTooltip}
                    events={eventDatas}
                    dateClick={handleDateClick}
                    // eventClick={handleEventClick}
                    customButtons={{
                        prevBtn: {
                            click: function () {
                                calref.current.calendar.prev();
                                updateCalendar();
                            },
                            icon: 'chevron-left',
                        },
                        nextBtn: {
                            click: function () {
                                calref.current.calendar.next();
                                updateCalendar();
                            },
                            icon: 'chevron-right',
                        },
                    }}
                    headerToolbar={{
                        left: 'title',
                        right: 'prevBtn nextBtn',
                    }}
                />
            </StyleWrapper>
        </Box>
    );
};
export default CalenderList;
