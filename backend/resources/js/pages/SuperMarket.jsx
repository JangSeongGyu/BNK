import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import 'tippy.js/dist/tippy.css';
import Header from '../components/Header';
import axios from 'axios';
import FunctionList from '../components/FunctionList';
import { Grid, Modal, Typography } from '@mui/material';
import CalenderList from '../components/CalenderList';
import MarketSideList from '../components/MarketSideList';
import MarketSideDateList from '../components/MarketSideDateList';

const SuperMarket = () => {
    const [selectDate, SetSelectDate] = useState('');
    const [open, SetOpen] = useState(false);
    const [logDatas, SetLogDatas] = useState('');
    const [dailyData, SetDailyData] = useState([]);
    const [clickType, SetClickType] = useState('');

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

    // Get Calender -> selectDate & dailyData
    const CallSelectDate = (data) => {
        console.log(data);
        SetSelectDate(data.selectDate);
        SetDailyData(data.dailyData);
        // SetClickType(data.clickType);
    };

    return (
        <>
            <Header title="スーパーマーケット" />
            <Box sx={{ fontSize: 28 }}>
                全体:000 未処理件数:
                {logDatas.length}
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '60%' }}>
                    <CalenderList
                        Today={thisMonth}
                        CallSelectDate={CallSelectDate}
                    />
                </Box>
                <Box sx={{ width: '40%' }}>
                    <MarketSideList
                        selectDate={selectDate}
                        dailyData={dailyData}
                        logDatas={logDatas}
                    />
                </Box>
            </Box>
        </>
    );
};

export default SuperMarket;
