import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import MarketShipmentDialog from '../components/MarketShipmentDialog';
import { Dialog, Divider, Typography } from '@mui/material';
import { grey, pink, red } from '@mui/material/colors';

import { toast } from 'react-hot-toast';

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
                SetLogDatas(res.data);
                // SetLogDatas('');
            })
            .catch((e) => {});
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
        if (logDatas.length == 0) toast.error('出荷する案件がありません。');
        else SetOpen(true);
    };

    // Get Calender -> selectDate & dailyData
    const CallSelectDate = (data) => {
        SetSelectDate(data.selectDate);
        SetIsData(data.isData);
    };

    return (
        <>
            <Header pageType={'supermarket'} />

            <Box height={'80%'} sx={{ display: 'flex' }}>
                <Box height={'100%'} sx={{ width: '60%' }}>
                    {logDatas.length > 0 && (
                        <Box
                            sx={{
                                left: 180,
                                top: 115,
                                position: 'absolute',
                                display: 'inline',
                                fontSize: 20,
                                p: 1,
                                borderRadius: 3,
                                zIndex: 10,
                                color: 'white',
                                backgroundColor: pink[500],
                                textAlign: 'center',
                            }}
                        >
                            未処理 : {logDatas.length}
                        </Box>
                    )}
                    <CalendarList
                        pageType={'supermarket'}
                        Today={thisMonth}
                        CallSelectDate={CallSelectDate}
                        handleOpen={handleOpen}
                    />
                </Box>
                <Box mt={1} sx={{ width: '40%' }}>
                    {isData && (
                        <MarketSideList
                            pageType={'supermarket'}
                            selectDate={selectDate}
                            isData={isData}
                            logDatas={logDatas}
                        />
                    )}
                </Box>
            </Box>
            <Dialog onClose={handleClose} open={open}>
                <MarketShipmentDialog
                    pageType={'supermarket'}
                    handleClose={handleClose}
                    logDatas={logDatas.length}
                    selectDate={selectDate}
                />
            </Dialog>
        </>
    );
};

export default SuperMarket;
