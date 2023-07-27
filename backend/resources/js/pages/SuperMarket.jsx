import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import MarketShipmentDialog from '../components/MarketShipmentDialog';
import { Dialog, Divider, Typography, Button, Box } from '@mui/material';
import { grey, pink, red } from '@mui/material/colors';
import { toast } from 'react-hot-toast';
import SuperMarketDesign from '../Design/SuperMarketDesign';

const BtnOption = SuperMarketDesign('BtnOption');

const SuperMarket = (props) => {
    const pageType = props.pageType;
    const [selectDate, SetSelectDate] = useState('');
    const [open, SetOpen] = useState(false);
    const [logDatas, SetLogDatas] = useState('');
    const [SFDatas, SetSFDatas] = useState('');
    const [dailyData, SetDailyData] = useState([]);
    const [clickType, SetClickType] = useState('');
    const [isData, SetIsData] = useState(false);
    const UpdateRef = useRef(null);

    useEffect(() => {
        CallSFData();
        callBacklog();
    }, []);

    const CallSFData = () => {
        axios
            .get(import.meta.env.VITE_DOMAIN + `/api/${pageType}/order/`)
            .then((res) => {
                SetSFDatas(res.data);
                console.log(res.data);
            })
            .catch((e) => {});
    };

    const ClickSFData = () => {
        // axios
        //     .post(import.meta.env.VITE_DOMAIN + '/api/supermarket/order/')
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((e) => {});
    };

    const callBacklog = () => {
        axios
            .get(import.meta.env.VITE_DOMAIN + `/api/${pageType}/backlogdata/`)
            .then((res) => {
                SetLogDatas(res.data);
                SetSelectDate(data.selectDate);
            })
            .catch((e) => {});
    };

    const thisMonth = () => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
            2,
            '0'
        )}`;
    };

    const handleClose = (res) => {
        if (res == 'ok') {
            callBacklog();
            UpdateRef.current.event();
            UpdateRef.current.side(selectDate);
        }
        // else if (res == 'error' || res == 'exit') {}
        // console.log('close');
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
            <Header pageType={pageType} />

            <Box height={'80%'} sx={{ display: 'flex' }}>
                <Box sx={{ width: '60%', height: '100%' }}>
                    <Box
                        sx={{
                            left: 160,
                            top: 110,
                            gap: 1,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Button
                            disabled={SFDatas.length == 0 ? true : false}
                            sx={{
                                width: 150,
                                height: 50,
                                border: 1,
                                color: 'primary.main',
                                backgroundColor: 'white',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                },
                            }}
                            onClick={() => {
                                ClickSFData();
                            }}
                        >
                            SFデータ取得
                        </Button>
                        <Typography
                            width={110}
                            fontSize={20}
                            fontWeight={'bold'}
                            backgroundColor={'white'}
                            color={'primary.main'}
                            borderRadius={1}
                        >
                            SFデータ
                            <br />
                            {SFDatas.length}
                        </Typography>

                        <Typography
                            width={110}
                            fontSize={20}
                            fontWeight={'bold'}
                            white
                            backgroundColor={'white'}
                            color={'primary.main'}
                            borderRadius={1}
                        >
                            未処理
                            <br />
                            {logDatas.length}
                        </Typography>
                    </Box>

                    <CalendarList
                        UpdateRef={UpdateRef}
                        pageType={pageType}
                        Today={thisMonth}
                        CallSelectDate={CallSelectDate}
                        handleOpen={handleOpen}
                    />
                </Box>
                <Box mt={1} sx={{ width: '40%' }} height={'100%'}>
                    {isData && (
                        <MarketSideList
                            pageType={pageType}
                            selectDate={selectDate}
                            isData={isData}
                            logDatas={logDatas}
                        />
                    )}
                </Box>
            </Box>
            <Dialog onClose={() => handleClose('exit')} open={open}>
                <MarketShipmentDialog
                    pageType={pageType}
                    handleClose={handleClose}
                    logDatas={logDatas.length}
                    selectDate={selectDate}
                />
            </Dialog>
        </>
    );
};

export default SuperMarket;
