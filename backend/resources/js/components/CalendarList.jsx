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
import { Today } from './GlobalComponent';

const CalendarList = (props) => {
    const pageType = props.pageType;
    const [selectDate, SetSelectDate] = useState('');
    const [eventDatas, SetEventDatas] = useState([]);
    const [cssStr, SetCssStr] = useState('');
    const [currentDate, SetCurrentDate] = useState(props.Today);
    const calref = useRef(null);
    const [eventDates, SetEventDates] = useState({});
    const dialogRef = useRef('null');
    const [rightList, SetRightList] = useState('');

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
        props.CallSelectDate({
            selectDate: selectDate,
            isData: false,
        });

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
        const toastId = toast.loading('カレンダー情報更新中...');
        let startDate = CreateDate(calref.current.calendar.view.activeStart);
        let endDate = CreateDate(calref.current.calendar.view.activeEnd);
        SetCurrentDate(CreateDate(calref.current.calendar.getDate()));
        SetRightList('');
        SetEventDatas([]);

        axios
            .get(`/api/${pageType}/betweencount/${startDate}/${endDate}`)
            .then((res) => {
                // calendar Button Controll
                SetRightList('prevBtn nextBtn');
                toast.success('カレンダー情報更新完了。', {
                    id: toastId,
                });
                console.log('Calendar Data', res.data);
                SetEventList(res.data);
            })
            .catch((e) => {
                SetRightList('prevBtn nextBtn');

                let errMsg = '';
                if (e.response == null) {
                    errMsg = 'カレンダーサーバー接続失敗';
                } else if (e.response.status == '410') {
                    toast.success('カレンダー情報更新完了', { id: toastId });
                    return;
                } else {
                    errMsg = e.response.data.message;
                }
                toast.error(errMsg, { id: toastId });
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
        const originalDate = dropInfo.oldEvent.startStr;
        const changeDate = dropInfo.event.startStr;

        console.log(dropInfo);
        if (changeDate < Today()) {
            toast.error('出荷日は本日より前日に設定することは出来ません');
            dropInfo.revert();
        } else {
            dialogRef.current.ChangeDate(dropInfo, originalDate, changeDate);
        }
    };
    const handleDateClick = (dateClickInfo) => {
        SetSelectDate(dateClickInfo.dateStr);
        if (!CheckDate(dateClickInfo.dateStr)) {
            if (dateClickInfo.dateStr < Today())
                toast.error('出荷日は本日より前日に設定することは出来ません');
            else props.handleOpen();
        }
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
            <CalendarChangeDialog
                updateCalendar={updateCalendar}
                pageType={pageType}
                ref={dialogRef}
            />
            <StyleWrapper>
                <FullCalendar
                    ref={calref}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    initialDate={currentDate}
                    droppable={true}
                    dragScroll={false}
                    editable={true}
                    eventOverlap={false}
                    eventDurationEditable={false}
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
                        right: rightList,
                    }}
                />
            </StyleWrapper>
        </Box>
    );
};
export default CalendarList;
