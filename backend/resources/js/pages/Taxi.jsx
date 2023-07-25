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

const Taxi = (props) => {
    const pageType = props.pageType;
    const [selectDate, SetSelectDate] = useState('');
    const [open, SetOpen] = useState(false);
    const [logDatas, SetLogDatas] = useState('');
    const [normalCnt, SetNormalCnt] = useState(0);
    const [pouchCnt, SetPouchCnt] = useState(0);
    const [dailyData, SetDailyData] = useState([]);
    const [clickType, SetClickType] = useState('');
    const [isData, SetIsData] = useState(false);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_DOMAIN + `/api/taxi/backlogdata`)
            .then((res) => {
                SetLogDatas(res.data);
                let arr = res.data;
                if (arr.length == 0) return;
                arr.forEach((data) => {
                    if (data.パウチ == 1) SetPouchCnt(pouchCnt + 1);
                    else SetNormalCnt(normalCnt + 1);
                });
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

    const CallSelectDate = (data) => {
        SetSelectDate(data.selectDate);
        SetIsData(data.isData);
    };

    return (
        <>
            <Header pageType={pageType} />
            {logDatas.length > 0 && (
                <Typography
                    sx={{
                        left: 170,
                        top: 105,
                        position: 'absolute',
                        display: 'inline',
                        fontSize: 28,
                        p: 1,
                        borderRadius: 3,
                        zIndex: 10,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    パウチ : {logDatas.length}
                    <> / </>
                    通常:{logDatas.length}
                </Typography>
            )}
            <Box height={'80%'} sx={{ display: 'flex' }}>
                <Box height={'100%'} sx={{ width: '60%' }}>
                    <CalendarList
                        pageType={pageType}
                        Today={thisMonth}
                        CallSelectDate={CallSelectDate}
                        handleOpen={handleOpen}
                    />
                </Box>

                <Box mt={1} sx={{ width: '40%' }}>
                    {isData && (
                        <MarketSideList
                            pageType={pageType}
                            selectDate={'2023-07-20'}
                            isData={true}
                        />
                    )}
                </Box>
            </Box>
            <Dialog onClose={handleClose} open={open}>
                <MarketShipmentDialog
                    pageType={pageType}
                    handleClose={handleClose}
                    logDatas={logDatas.length}
                    normalCnt={normalCnt}
                    pouchCnt={pouchCnt}
                    selectDate={selectDate}
                />
            </Dialog>
        </>
    );
};
export default Taxi;
