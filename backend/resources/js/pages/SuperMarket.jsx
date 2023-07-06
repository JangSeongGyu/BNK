import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';
import styled from '@emotion/styled';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import Header from '../components/Header';
import FunctionList from '../components/FunctionList';

const StyleWrapper = styled.div`
    margin: 0 0 0 auto;
    min-width: 1200px;
    .fc-daygrid-day:hover {
        background-color: #eeeeee;
        cursor: pointer;
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
const thisMonth = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
        2,
        '0'
    )}`;
};
const handleDateClick = (dateClickInfo) => {
    console.log('dateClickInfo: ', dateClickInfo); // 選択した範囲の情報をconsoleに出力
    alert('Date: ' + dateClickInfo.dateStr);
};
const handleEventClick = (eventClickInfo) => {
    console.log('eventClickInfo: ', eventClickInfo); // 選択した範囲の情報をconsoleに出力
    alert('event');
};
const eventWithTooltip = (event) => {
    tippy(event.el, {
        content: 'aaaaaa<br>aaaaa',
        allowHTML: true,
    });
};
const SuperMarket = () => {
    return (
        <>
            <Header title="スーパーマーケット" />
            <Box sx={{ display: 'flex', height: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        marginTop: 5,
                        marginRight: 10,
                    }}
                >
                    <StyleWrapper>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            locales={[jaLocale]}
                            locale="ja"
                            contentHeight={'700px'}
                            businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
                            eventDidMount={eventWithTooltip}
                            events={[
                                { title: 'event 1', date: `${thisMonth()}-03` },
                                { title: 'event 2', date: `${thisMonth()}-05` },
                            ]}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                        />
                    </StyleWrapper>
                </Box>
            </Box>
        </>
    );
};

export default SuperMarket;
