import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import MarketShipmentDialog from '../components/MarketShipmentDialog';
import { Dialog, Divider, Typography } from '@mui/material';
import { grey, pink, red } from '@mui/material/colors';

const SuperMarket = () => {
    const [selectDate, SetSelectDate] = useState('');
    const [open, SetOpen] = useState(false);
    const [logDatas, SetLogDatas] = useState('');
    const [dailyData, SetDailyData] = useState([]);
    const [clickType, SetClickType] = useState('');
    const [isData, SetIsData] = useState(false);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_DOMAIN + '/api/supermarket/backlogdata/')
            .then((res) => {
                // console.log(res.data);
                SetLogDatas(res.data);
            })
            .catch();
    }, []);

    const thisMonth = () => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
            2,
            '0'
        )}`;
    };

    const handleClose = () => {
        console.log('close');
        SetOpen(false);
    };
    const handleOpen = () => {
        console.log('open');
        SetOpen(true);
    };

    // Get Calender -> selectDate & dailyData
    const CallSelectDate = (data) => {
        SetSelectDate(data.selectDate);
        SetIsData(data.isData);
    };

    return (
        <>
            <Header title="スーパーマーケット" />
            <Box
                sx={{
                    fontSize: 28,
                    backgroundColor: grey[200],
                    color: 'black',
                    textAlign: 'center',
                }}
            >
                未処理件数:
                {logDatas.length}
            </Box>
            <Divider />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '60%' }}>
                    <CalendarList
                        Today={thisMonth}
                        CallSelectDate={CallSelectDate}
                        handleOpen={handleOpen}
                    />
                </Box>
                <Box sx={{ width: '40%' }}>
                    {isData && (
                        <MarketSideList
                            selectDate={selectDate}
                            isData={isData}
                            logDatas={logDatas}
                        />
                    )}
                </Box>
            </Box>
            <Dialog onClose={handleClose} open={open}>
                <MarketShipmentDialog
                    handleClose={handleClose}
                    logDatas={logDatas.length}
                    selectDate={selectDate}
                />
            </Dialog>
        </>
    );
};

export default SuperMarket;
