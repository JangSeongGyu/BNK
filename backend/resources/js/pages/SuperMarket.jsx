import { useEffect, useState, useRef } from 'react';
import Header from '../components/HeaderCompnent/Header';
import axios from 'axios';
import CalendarList from '../components/CalendarList';
import MarketSideList from '../components/MarketSideList';
import ShipmentDialog from '../components/ShipmentComponent/ShipmentDialog';
import { Dialog, Divider, Typography, Button, Box } from '@mui/material';
import { grey, pink, red } from '@mui/material/colors';
import { toast } from 'react-hot-toast';
import { paddingNum } from '../components/GlobalComponent';

const BacklogTextOption = {
    width: 100,
    fontSize: 18,
    fontWeight: 'bold',
};

const SuperMarket = (props) => {
    const pageType = props.pageType;
    const [selectDate, SetSelectDate] = useState('');
    const [open, SetOpen] = useState(false);
    const [logDatas, SetLogDatas] = useState([]);
    const [SFDatas, SetSFDatas] = useState('');
    const [isData, SetIsData] = useState(false);
    const UpdateRef = useRef(null);

    useEffect(() => {
        callBacklog();
    }, []);

    const thisMonth = () => {
        const today = new Date();
        const month = paddingNum(String(today.getMonth() + 1), 2);
        if (localStorage.getItem('LastSelectDate')) {
            const date = localStorage.getItem('LastSelectDate');
            return date;
        }

        localStorage.removeItem('LastSelectDate');
        return `${today.getFullYear()}-${month}`;
    };

    const callBacklog = () => {
        axios
            .get(`/api/${pageType}/backlogdata/`)
            .then((res) => {
                console.log(res.data);
                SetLogDatas(res.data[0]);
                SetSelectDate(data.selectDate);
            })
            .catch((e) => {});
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
        console.log(logDatas);
        if (logDatas.件数 == 0 || logDatas.length == 0) {
            toast.error('処理するデータがありません');
        } else {
            SetOpen(true);
        }
    };

    // Get Calender -> selectDate
    const CallSelectDate = (data) => {
        SetSelectDate(data.selectDate);
        if (data.isData == true) callDailyData(data.selectDate);
        else SetIsData(false);
    };

    // Get Side List Data
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
        <Box height={'100%'} backgroundColor={grey[200]}>
            <Header page={0} pageType={pageType} />
            <Box height={'80%'} sx={{ display: 'flex' }}>
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

                        <Typography sx={BacklogTextOption}>
                            未処理総計
                            <br />
                            {logDatas.件数 ? logDatas.件数 : 0}
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
                <Box
                    mt={1}
                    sx={{ width: '40%' }}
                    minWidth={450}
                    height={'100%'}
                >
                    {isData && (
                        <MarketSideList
                            pageType={pageType}
                            selectDate={selectDate}
                            isData={isData}
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

export default SuperMarket;
