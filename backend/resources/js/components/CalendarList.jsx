import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Grid, Modal, Typography, Box, Dialog } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import dayGridPlugin from '@fullcalendar/daygrid';
import CalendarChangeDialog from './CalendarChangeDialog';
import { grey } from '@mui/material/colors';

const CalendarList = (props) => {
    const pageType = props.pageType;
    const [selectDate, SetSelectDate] = useState('');
    const [eventDatas, SetEventDatas] = useState([]);
    const [cssStr, SetCssStr] = useState('');
    const [currentDate, SetCurrentDate] = useState(props.Today);
    const calref = useRef(null);
    const [eventDates, SetEventDates] = useState({});
    const dialogRef = useRef('null');

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

    useEffect(() => {
        if (pageType != null) {
            // parent Ref
            props.UpdateRef.current = {
                event: updateCalendar,
                side: SetSideList,
            };

            //first Get Data
            updateCalendar();
        }
    }, []);

    // Get Select Date Data
    useEffect(() => {
        if (selectDate != '') {
            if (CheckDate(selectDate)) {
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

    const updateCalendar = () => {
        const toastid = toast.loading('カレンダー情報更新中...');
        let startDate = CreateDate(calref.current.calendar.view.activeStart);
        let endDate = CreateDate(calref.current.calendar.view.activeEnd);
        SetCurrentDate(CreateDate(calref.current.calendar.getDate()));

        axios
            .get(`/api/${pageType}/betweencount/${startDate}/${endDate}`)
            .then((res) => {
                toast.success('カレンダー情報更新完了。', {
                    id: toastid,
                });
                console.log('Calendar Data', res.data);
                SetEventList(res.data);
            })
            .catch((e) => {
                if (e.response == null) {
                    toast.error('カレンダー更新失敗。', {
                        id: toastid,
                    });
                } else if (e.response.status == '410') {
                    toast.success('カレンダー情報更新完了。', {
                        id: toastid,
                    });
                } else {
                    toast.error(e.response.message, { id: toastid });
                }
            });
    };

    const SetEventList = (datas) => {
        let strData = [];
        datas.forEach((data) => {
            strData.push({
                date: data.出荷日,
                title: '出荷 ' + data.件数 + '件',
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

    const SetSideList = (date) => {
        SetSelectDate(date);
        props.CallSelectDate({
            selectDate: date,
            isData: true,
        });
    };
    const EventDrop = (dropInfo) => {
        const start = dropInfo.oldEvent.startStr;
        const end = dropInfo.event.startStr;
        dialogRef.current.ChangeDate(dropInfo, start, end);
    };
    const handleDateClick = (dateClickInfo) => {
        SetSelectDate(dateClickInfo.dateStr);
        if (!CheckDate(dateClickInfo.dateStr)) props.handleOpen();
        SetCssStr(`
            outline: 2px solid red;
            outline-offset: -2px;
            cursor: pointer;
        `);
    };

    return (
        <Box
            sx={{
                border: 1,
                borderRadius: 2,
                borderColor: grey[400],
                boxShadow: 2,
                p: 1,
                backgroundColor: 'white',
                width: '100%',
                display: 'flex',
                height: '100%',
                marginTop: 2,
                ml: 1,
            }}
        >
            <CalendarChangeDialog ref={dialogRef} />
            <StyleWrapper>
                <FullCalendar
                    ref={calref}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    initialDate={currentDate}
                    droppable={true}
                    editable={true}
                    locales={[jaLocale]}
                    locale="ja"
                    height={'100%'}
                    eventDrop={(dropInfo) => EventDrop(dropInfo)}
                    businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
                    events={eventDatas}
                    dateClick={handleDateClick}
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
