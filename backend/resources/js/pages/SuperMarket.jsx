import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import MarketShipmentDialog from '../components/MarketShipmentDialog';
import { Dialog, Divider, Typography } from '@mui/material';
import { grey, pink, red } from '@mui/material/colors';
import ToasterComp from '../components/ToasterComp';
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
            <ToasterComp />
            <Header title="スーパーマーケット" />
            <Box
                sx={{
                    fontSize: 28,
                    height: '4%',
                    color: 'black',
                    textAlign: 'center',
                }}
            >
                未処理件数:
                {logDatas.length}
            </Box>
            <Box height={'80%'} sx={{ display: 'flex' }}>
                <Box height={'100%'} sx={{ width: '60%' }}>
                    <CalendarList
                        Today={thisMonth}
                        CallSelectDate={CallSelectDate}
                        handleOpen={handleOpen}
                    />
                </Box>
                <Box mt={2} sx={{ width: '40%' }}>
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
