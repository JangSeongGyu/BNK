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

const CalendarList = (props) => {
    const [selectDate, SetSelectDate] = useState('');
    const [eventDatas, SetEventDatas] = useState([]);
    // const [monthlyDatas, setMonthlyDatas] = useState([]);
    const [cssStr, SetCssStr] = useState('');
    const [currentDate, SetCurrentDate] = useState(props.Today);
    const calref = useRef(null);
    const [eventDates, SetEventDates] = useState({});
    let test = {};
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
                    '/api/supermarket/betweencount/' +
                    startDate +
                    '/' +
                    endDate
            )
            .then((res) => {
                console.log(res.data);
                SetEventList(res.data);
                test = res.data;
            })
            .catch();
    };

    const SetEventList = (datas) => {
        let strData = [];
        datas.forEach((data) => {
            strData.push({
                date: data.出荷日,
                title: '出荷 : ' + data.件数 + '件',
            });
            SetEventDates((prevState) => ({ ...prevState, [data.出荷日]: 1 }));
        });
        SetEventDatas(strData);
    };

    const CreateDate = (data) => {
        var startYear = data.getFullYear();
        var startMonth = data.getMonth() + 1;

        if (data.getMonth() + 1 < 10) startMonth = '0' + startMonth;
        var startDay = data.getDate();
        if (startDay < 10) startDay = '0' + startDay;

        return `${startYear}-${startMonth}-${startDay}`;
    };

    const CheckDate = (date) => {
        let res = false;
        eventDatas.forEach((data) => {
            if (data.date == date) res = true;
        });
        return res;
    };

    // Get Select Date Data
    useEffect(() => {
        if (selectDate != '') {
            if (CheckDate(selectDate)) {
                console.log('isData');
                props.CallSelectDate({
                    selectDate: selectDate,
                    isData: true,
                });
            } else {
                props.CallSelectDate({
                    selectDate: selectDate,
                    isData: false,
                });
            }
        }
    }, [selectDate]);

    const handleDateClick = (dateClickInfo) => {
        SetSelectDate(dateClickInfo.dateStr);
        if (!CheckDate(dateClickInfo.dateStr)) props.handleOpen();
        SetCssStr(`
            outline: 2px solid red;
            outline-offset: -2px;
            cursor: pointer;
        `);
    };

    const handleEventClick = (eventClickInfo) => {};

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
export default CalendarList;
