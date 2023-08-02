import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import MarketShipmentDialog from '../components/MarketShipmentDialog';
import { Dialog, Divider, Typography, Button, Box } from '@mui/material';
import { grey, pink, red } from '@mui/material/colors';
import { toast } from 'react-hot-toast';
import { BtnOption } from '../Design/DesignOption';
import { paddingNum } from '../components/GlobalComponent';

const SuperMarket = (props) => {
    const pageType = props.pageType;
    const [selectDate, SetSelectDate] = useState('');
    const [open, SetOpen] = useState(false);
    const [logDatas, SetLogDatas] = useState('');
    const [SFDatas, SetSFDatas] = useState('');
    const [isData, SetIsData] = useState(false);
    const UpdateRef = useRef(null);

    useEffect(() => {
        // console.log();
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
        axios
            .post(`/api/${pageType}/order/`)
            .then((res) => {
                callBacklog();
                SetSFDatas('');
                console.log(res.data);
            })
            .catch((e) => {});
    };

    const callBacklog = () => {
        axios
            .get(`/api/${pageType}/backlogdata/`)
            .then((res) => {
                SetLogDatas(res.data);
            })
            .catch((e) => {});
    };

    const thisMonth = () => {
        const today = new Date();
        const month = paddingNum(String(today.getMonth() + 1), 2);
        return `${today.getFullYear()}-${month}`;
    };

    const handleClose = (res) => {
        if (res == false) {
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
                            width={100}
                            fontSize={18}
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
                            width={100}
                            fontSize={18}
                            fontWeight={'bold'}
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
            <Dialog onClose={() => handleClose(false)} open={open}>
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
