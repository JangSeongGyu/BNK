import React, {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from 'react';
import {
    Typography,
    Grid,
    Box,
    Button,
    TextField,
    Dialog,
} from '@mui/material';
import { blue, green, grey, lightGreen, pink, red } from '@mui/material/colors';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'dayjs/locale/ja';
import { dialogYes, dialogNo } from '../../Design/DesignOption';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { paddingNum } from '../GlobalComponent';
import { useNavigate } from 'react-router-dom';

const BtnOption = {
    height: 50,
    border: 1,
    // borderRadius: '100%',
    color: 'white',
    backgroundColor: grey[700],
    borderColor: grey[700],
    ':hover': { backgroundColor: grey[900] },
};

const MasterMonthDialog = forwardRef((props, ref) => {
    const openType = props.openType;
    const pageType = props.pageType;
    const [open, SetOpen] = useState(false);
    const [textData, SetTextData] = useState('');
    const [monthlyData, SetMonthlyData] = useState([]);
    const today = new Date();
    const [calendarYear, SetCalendarYear] = useState(today.getFullYear());
    const [selectDate, SetSelectDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (openType == null) return;
        if (openType == 'create_monthly') {
            SetOpen(true);
        }
    }, [openType]);

    useEffect(() => {
        callMonthlyData();
    }, []);

    useEffect(() => {
        if (monthlyData[selectDate])
            SetTextData(monthlyData[selectDate].受注番号);
        else SetTextData('');
    }, [selectDate]);

    const callMonthlyData = () => {
        axios
            .get(`/api/${pageType}/monthlynumber`)
            .then((res) => {
                console.log(res.data);
                grouping(res.data);
            })
            .catch((e) => {});
    };

    const grouping = (datas) => {
        let group = {};
        datas.forEach((data) => {
            group[data.年月] = data;
        });
        SetMonthlyData(group);
    };

    const dateformatting = (year, month) => {
        const pmonth = paddingNum(String(month), 2);
        return `${year}-${pmonth}`;
    };

    const clickCreate = () => {
        const toastId = toast.loading('登録しています...');
        axios
            .put(`/api/${pageType}/monthlynumber`, {
                order_no: textData,
                year_month: selectDate,
            })
            .then((res) => {
                console.log('MonthDialog', res.data);
                // SetMonthlyData(res.data);
                callMonthlyData();
                toast.success('登録完了。', { id: toastId });
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = 'サーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    };

    const TextChange = (event) => {
        const eventId = event.target.id;
        const eventValue = event.target.value;
        SetTextData(eventValue);
    };

    const handleClose = () => {
        Clear();
        SetOpen(false);
        navigate(`/${pageType}/master`);
    };

    const Clear = () => {
        SetTextData('');
        SetCalendarYear(today.getFullYear());
        SetSelectDate('');
    };

    const Calendar = () => {
        let html = [];
        for (let i = 1; i <= 12; i++) {
            let currentMonth = dateformatting(calendarYear, i);
            html.push(
                <Grid
                    item
                    xs={3}
                    key={i}
                    borderBottom={1}
                    borderRight={1}
                    backgroundColor={
                        monthlyData[currentMonth] ? lightGreen[100] : 'white'
                    }
                >
                    <Box
                        id={i}
                        height={140}
                        p={1}
                        onClick={(event) => SetSelectDate(currentMonth)}
                        border={selectDate == currentMonth && 2}
                        borderColor={
                            selectDate == currentMonth ? red[500] : grey[500]
                        }
                        sx={{
                            ':hover': {
                                backgroundColor: monthlyData[currentMonth]
                                    ? lightGreen[200]
                                    : grey[200],
                            },
                        }}
                    >
                        <Typography display={'hidden'} fontWeight={'bold'}>
                            {i}月
                        </Typography>

                        <Typography
                            mt={4}
                            fontWeight={'bold'}
                            display={
                                monthlyData[currentMonth] ? 'flex' : 'none'
                            }
                        >
                            月次データあり
                        </Typography>
                    </Box>
                </Grid>
            );
        }
        return html;
    };

    return (
        <Dialog maxWidth="lg" onClose={() => handleClose()} open={open}>
            {/* Input */}
            <Box
                backgroundColor={grey[200]}
                gap={2}
                p={2}
                width={1000}
                height={600}
                display={'flex'}
            >
                <Box
                    boxShadow={2}
                    backgroundColor="white"
                    border={1}
                    borderColor={grey[400]}
                    borderRadius={2}
                    p={2}
                    gap={2}
                    width={'40%'}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Box>
                        <Typography
                            borderBottom={1}
                            borderColor={grey[400]}
                            fontWeight={'bold'}
                            fontSize={40}
                        >
                            月次登録
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Box mb={2}>
                            <Typography fontSize={20} fontWeight={'bold'}>
                                選択年月
                            </Typography>
                            {selectDate != '' ? (
                                <Typography fontSize={20}>
                                    {selectDate}
                                </Typography>
                            ) : (
                                <Typography
                                    ml={1}
                                    fontSize={18}
                                    alignItems={'end'}
                                    color={red[500]}
                                    fontWeight={'bold'}
                                >
                                    カレンダーから月を選択してください。
                                </Typography>
                            )}
                        </Box>
                        <Box display={'flex'}>
                            <Typography fontSize={20} fontWeight={'bold'}>
                                受注番号
                            </Typography>
                        </Box>
                        <TextField
                            disabled={selectDate == '' ? true : false}
                            id="number"
                            value={textData}
                            onChange={(event) => TextChange(event)}
                            type="text"
                        />
                    </Box>
                    <Box
                        height={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'end'}
                    >
                        <Box gap={2} display={'flex'}>
                            <Button
                                disabled={textData == '' ? true : false}
                                l
                                onClick={() => clickCreate()}
                                sx={dialogYes}
                            >
                                <Typography fontWeight={'bold'}>
                                    {monthlyData[selectDate] ? '修正' : '登録'}
                                </Typography>
                            </Button>
                            <Button onClick={() => handleClose()} sx={dialogNo}>
                                戻る
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box
                    boxShadow={2}
                    backgroundColor="white"
                    border={1}
                    borderRadius={2}
                    borderColor={grey[400]}
                    p={2}
                    gap={2}
                    width={'60%'}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Box>
                        <Box
                            mb={2}
                            display={'flex'}
                            alignItems={'center'}
                            gap={2}
                        >
                            <Box
                                width={'100%'}
                                display={'flex'}
                                justifyContent={'space-between'}
                            >
                                <Button
                                    sx={BtnOption}
                                    onClick={() =>
                                        SetCalendarYear(calendarYear - 1)
                                    }
                                >
                                    <ArrowBackIosNewIcon
                                        sx={{ fontSize: 36 }}
                                    />
                                </Button>
                                <Box>
                                    <Typography
                                        fontSize={32}
                                        fontWeight={'bold'}
                                    >
                                        {calendarYear}年
                                    </Typography>
                                </Box>
                                <Button
                                    sx={BtnOption}
                                    onClick={() =>
                                        SetCalendarYear(calendarYear + 1)
                                    }
                                >
                                    <ArrowForwardIosIcon
                                        sx={{ fontSize: 36 }}
                                    />
                                </Button>
                            </Box>
                        </Box>
                        <Grid
                            borderTop={1}
                            borderLeft={1}
                            // borderColor={grey[500]}
                            container
                        >
                            <Calendar />
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
});
export default MasterMonthDialog;
