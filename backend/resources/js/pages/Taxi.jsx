import { useEffect, useState, useRef } from 'react';
import Header from '../components/HeaderCompnent/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import ShipmentDialog from '../components/ShipmentComponent/ShipmentDialog';
import { Dialog, Typography, Button, Box, Tooltip } from '@mui/material';
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
    const [logDatas, SetLogDatas] = useState([]);
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
                SetLogDatas(res.data[0]);
                SetSelectDate(data.selectDate);
            })
            .catch((e) => {});
    };

    const thisMonth = () => {
        const today = new Date();
        if (localStorage.getItem('LastSelectDate')) {
            const date = localStorage.getItem('LastSelectDate');
            return date;
        }
        localStorage.removeItem('LastSelectDate');
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
            2,
            '0'
        )}`;
    };

    const handleClose = (res) => {
        if (res) {
            callBacklog();
            UpdateRef.current.event();
            UpdateRef.current.side(selectDate);
        }
        SetOpen(false);
    };
    const handleOpen = () => {
        const logDataSum =
            parseInt(logDatas.イーグルス) +
            parseInt(logDatas.イーグルスP) +
            parseInt(logDatas.通常) +
            parseInt(logDatas.通常P);

        if (logDataSum == 0 || logDatas.length == 0)
            toast.error('処理するデータがありません');
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
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = 'サーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.error(errMsg, { id: toastId });
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
            <Box height={'100%'} p={2} gap={2} sx={{ display: 'flex' }}>
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
                        <Tooltip
                            title={
                                <Typography>
                                    タクシー：{logDatas.通常}
                                    <br />
                                    タクシーパウチ：{logDatas.通常P}
                                    <br />
                                    イーグルス：{logDatas.イーグルス}
                                    <br />
                                    イーグルスパウチ：{logDatas.イーグルスP}
                                </Typography>
                            }
                        >
                            <Typography sx={BacklogTextOption}>
                                未処理総計
                                <br />
                                {logDatas.通常 ? (
                                    <>
                                        {parseInt(logDatas.通常) +
                                            parseInt(logDatas.通常P) +
                                            parseInt(logDatas.イーグルス) +
                                            parseInt(logDatas.イーグルスP)}
                                    </>
                                ) : (
                                    '0'
                                )}
                            </Typography>
                        </Tooltip>
                    </Box>

                    <CalendarList
                        UpdateRef={UpdateRef}
                        pageType={pageType}
                        Today={thisMonth}
                        CallSelectDate={CallSelectDate}
                        handleOpen={handleOpen}
                    />
                </Box>
                <Box sx={{ width: '40%' }} minWidth={500} height={'100%'}>
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

export default Taxi;
