import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import MarketShipmentDialog from '../components/MarketShipmentDialog';
import { Dialog, Typography, Button, Box } from '@mui/material';
import { toast } from 'react-hot-toast';
import { grey } from '@mui/material/colors';

const BacklogTextOption = {
    width: 100,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 1,
};

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
        const toastId = toast.loading(date + 'データ取得中...');
        axios
            .get(`/api/${pageType}/dailydata/${date}`)
            .then((res) => {
                toast.success('データ取得完了。', { id: toastId });
                SetIsData(true);
                console.log(res.data);
            })
            .catch((e) => {
                errMsg = e.response.data.message;
                toast.error(errMsg, { id: toastId });
            });
    };

    return (
        <Box height={'100%'} backgroundColor={grey[200]}>
            <Header page={0} pageType={pageType} />

            <Box height={'80%'} sx={{ display: 'flex' }}>
                <Box sx={{ width: '60%', height: '100%' }}>
                    <Box
                        sx={{
                            left: 170,
                            top: 120,
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
                        <Typography sx={BacklogTextOption}>
                            SFデータ
                            <br />
                            {SFDatas.length}
                        </Typography>

                        <Typography sx={BacklogTextOption}>
                            パウチ
                            <br />
                            {logDatas.length}
                        </Typography>
                        <Typography sx={BacklogTextOption}>
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
        </Box>
    );
};

export default Taxi;
