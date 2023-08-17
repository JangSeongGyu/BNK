import { useEffect, useState, useRef } from 'react';
import Header from '../components/HeaderCompnent/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import ShipmentDialog from '../components/ShipmentComponent/ShipmentDialog';
import { Dialog, Typography, Button, Box, Slide } from '@mui/material';
import { grey } from '@mui/material/colors';
import { toast } from 'react-hot-toast';
import { Today } from '../components/GlobalComponent';
import { useParams } from 'react-router-dom';

const BacklogTextOption = {
    width: 100,
    fontSize: 18,
    fontWeight: 'bold',
};

const SuperMarket = (props) => {
    const pageType = props.pageType;
    const { selectDate } = useParams();
    const [open, SetOpen] = useState(false);
    const [logDatas, SetLogDatas] = useState([]);
    const [SFDatas, SetSFDatas] = useState('');
    const [isData, SetIsData] = useState(false);
    const UpdateRef = useRef(null);

    useEffect(() => {
        CallSFData();
        callBacklog();
    }, []);

    useEffect(() => {
        if (selectDate == null) return;
        SetIsData(false);
        callDailyData(selectDate);
    }, [selectDate]);

    const CallSFData = () => {
        axios
            .get(`/api/${pageType}/order/`)
            .then((res) => {
                SetSFDatas(res.data);
            })
            .catch((e) => {});
    };

    const ClickSFData = () => {
        const toastId = toast.loading('サーバ接続中...');
        axios
            .post(`/api/${pageType}/order/`)
            .then((res) => {
                callBacklog();
                SetSFDatas('');
                toast.success('SFデータ取得完了', { id: toastId });
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = '作業進捗サーバー接続失敗';
                } else if (e.response.status == 410) {
                    errMsg = '進捗情報がありません';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    };

    const callBacklog = () => {
        axios
            .get(`/api/${pageType}/backlogdata/`)
            .then((res) => {
                SetLogDatas(res.data[0]);
            })
            .catch((e) => {});
    };

    const handleClose = (confirm) => {
        if (confirm) {
            callBacklog();
            UpdateRef.current();
            callDailyData(selectDate);
        }

        SetOpen(false);
    };
    const handleOpen = () => {
        if (selectDate < Today()) {
            toast.error('出荷日は本日より前日に設定することは出来ません');
            return;
        }
        if (logDatas.件数 == 0 || logDatas.length == 0) {
            toast.error('処理するデータがありません');
            return;
        }
        SetOpen(true);
    };

    const callDailyData = (selectDate) => {
        axios
            .get(`/api/${pageType}/dailydata/${selectDate}`)
            .then((res) => {
                SetIsData(true);
            })
            .catch((e) => {
                handleOpen(true);
            });
    };

    return (
        <Box
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            minWidth={1300}
            backgroundColor={grey[200]}
        >
            <Header page={0} pageType={pageType} />
            <Box height={'100%'} gap={2} p={2} sx={{ display: 'flex' }}>
                <Box sx={{ width: '60%', height: '100%', minWidth: 700 }}>
                    <Box
                        sx={{
                            left: 180,
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
                                ml: 2,
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
                            未処理総計
                            <br />
                            {logDatas.件数 ? logDatas.件数 : 0}
                        </Typography>
                    </Box>

                    <CalendarList
                        UpdateRef={UpdateRef}
                        pageType={pageType}
                        selectDate={selectDate}
                    />
                </Box>
                <Box
                    width="40%"
                    overflow={'hidden'}
                    minWidth={500}
                    height={'100%'}
                >
                    <MarketSideList
                        pageType={pageType}
                        selectDate={selectDate}
                        isData={isData}
                    />
                </Box>
            </Box>
            <Dialog onClose={() => handleClose(false)} open={open}>
                <ShipmentDialog
                    pageType={pageType}
                    handleClose={handleClose}
                    logDatas={logDatas}
                    selectDate={selectDate}
                />
            </Dialog>
        </Box>
    );
};

export default SuperMarket;
