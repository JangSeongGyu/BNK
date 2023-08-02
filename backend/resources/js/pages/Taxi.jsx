import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import MarketShipmentDialog from '../components/MarketShipmentDialog';
import { Dialog, Typography, Button, Box } from '@mui/material';
import { toast } from 'react-hot-toast';

const Taxi = (props) => {
    const pageType = props.pageType;
    const [selectDate, SetSelectDate] = useState('');
    const [open, SetOpen] = useState(false);
    const [logDatas, SetLogDatas] = useState('');
    const [pouchDatas, SetPouchDatas] = useState('');
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
            .get(`/api/${pageType}/order/`)
            .then((res) => {
                SetSFDatas(res.data);
                console.log(res.data);
            })
            .catch((e) => {});
    };

    const ClickSFData = () => {
        toast.loading('サーバ接続中...');
        axios
            .post(`/api/${pageType}/order/`)
            .then((res) => {
                callBacklog();
                SetSFDatas('');
                toast.success('SFデータ取得完了。');
            })
            .catch((e) => {
                toast.success(e.response.current);
            });
    };

    const callBacklog = () => {
        axios
            .get(`/api/${pageType}/backlogdata/`)
            .then((res) => {
                console.log(res.data);
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
        SetOpen(false);
    };
    const handleOpen = () => {
        if (logDatas.length == 0) toast.error('出荷する案件がありません。');
        else SetOpen(true);
    };

    // Get Calender -> selectDate & dailyData
    const CallSelectDate = (data) => {
        SetSelectDate(data.selectDate);
        if (data.isData == true) callDailyData(data.selectDate);
        else SetIsData(false);
        // SetIsData(data.isData);
    };

    const callDailyData = (date) => {
        axios
            .get(`/api/${pageType}/dailydata/${date}`)
            .then((res) => {
                SetIsData(true);
                console.log(res.data);
            })
            .catch((e) => {
                // SetIsData(false);
            });
    };

    return (
        <>
            <Header page={0} pageType={pageType} />

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
                            パウチ
                            <br />
                            {logDatas.length}
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
                            通常
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

export default Taxi;
