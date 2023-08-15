import React, { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Box,
    Button,
    Divider,
    TextField,
    ButtonBase,
} from '@mui/material';
import {
    BtnOption,
    CheckingListInputOption,
    CheckingListBoxOption,
    CheckingOutputBoxOption,
    CheckingListResultOption,
    CheckingListResultTextOption,
} from '../Design/DesignOption';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ForwardIcon from '@mui/icons-material/Forward';
import { green, grey, pink, red } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/HeaderCompnent/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Checking2 = (props) => {
    const [MsgBox, SetMsgBox] = useState({
        0: '未完了',
        1: '未完了',
        2: '未完了',
    });

    const navigate = useNavigate();
    const pageType = props.pageType;
    const [inputData, SetInputData] = useState({});
    const [taskCnt, SetTaskCnt] = useState(10);
    const [maxWorkCount, SetMaxWorkCount] = useState(0);
    const [WorkCount, SetWorkCount] = useState(0);
    const boxRef = useRef(new Array());
    const inputRef = useRef(new Array());
    const btnRef = useRef();
    const { selectDate } = useParams();
    const [sceneName, SetSceneName] = useState('');
    const [detailNo, SetDetailNo] = useState('');
    const [address, SetAddress] = useState('');
    const [completeText, SetCompleteText] = useState('');

    const maxTask = 2;
    const dataClear = () => {
        for (let i = 0; i < maxTask; i++) {
            boxRef.current[i].style.backgroundColor = grey[300];
            inputRef.current[i].disabled = true;
        }
        SetInputData({ 0: '', 1: '' });
        SetMsgBox({ 0: '未完了', 1: '未完了', 2: '未完了' });
        focusing(0);
        SetSceneName('');
        SetDetailNo('');
        SetAddress('');
    };

    useEffect(() => {
        getWorkCount();
        inputLock();
    }, []);

    const inputLock = () => {
        for (let i = 0; i < maxTask; i++) {
            inputRef.current[i].disabled = true;
        }
    };

    const printComplete = () => {
        SetCompleteText('完了');
        inputLock();
        SetTaskCnt(maxTask + 1);
        btnRef.current.hidden = 'true';
    };

    const getWorkCount = () => {
        let cnt = 0;
        const toastId = toast.loading('作業進捗更新中...');
        SetWorkCount(0);
        axios
            .get(`/api/${pageType}/dailydata/${selectDate}`)
            .then((res) => {
                toast.success('作業進捗更新できました。', { id: toastId });
                SetMaxWorkCount(res.data.length);
                res.data.forEach((data) => {
                    if (data.二次梱包フラグ == 1) cnt++;
                });

                SetWorkCount(cnt);
                if (cnt == res.data.length) {
                    printComplete();
                } else {
                    focusing(0);
                }
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = 'サーバー接続失敗。';
                } else if (e.response.status == 410) {
                    errMsg = '進捗情報がありません。';
                } else {
                    errMsg = e.response.data.message;
                }
                printComplete();
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    };

    const focusing = (number) => {
        SetTaskCnt(number);
        inputRef.current[number].disabled = false;
        inputRef.current[number].focus();
    };

    const GetNumberData = () => {
        axios
            .get(
                `/api/${pageType}/checkingdata/${selectDate}/${inputData[0]}?type=2`
            )
            .then((res) => {
                SetSceneName(res.data[0].シーン名);
                SetDetailNo(res.data[0].注文明細No);
                SetAddress(res.data[0].納品先住所);
                ResultOK();
            })
            .catch((e) => {
                let errMsg = ErrorCheck(e);
                ResultError(`入力番号:${inputData[0]}
                ${errMsg}`);
            });
    };

    const is_number = (text) => {
        const regex = /^[0-9]+$/;
        return regex.test(text);
    };

    const handleKeyPress = (e) => {
        const event = e;
        if (event.key === 'Enter') {
            // InputData なし
            if (inputData[taskCnt] == '' || inputData[taskCnt] == null) {
                ResultError('入力してください');
                return;
            }

            SetMsgBox((prevState) => ({
                ...prevState,
                [taskCnt]: 'サーバ接続中…',
            }));

            if (taskCnt == 0) GetNumberData();
            else if (taskCnt == 1) {
                if (inputData[0].slice(0, -3) == inputData[1]) {
                    axios
                        .put(
                            `/api/${pageType}/secondpacking/${selectDate}/${inputData[0]}?type=2`
                        )
                        .then((res) => {
                            toast.success('検品処理完了しました。');
                            getWorkCount();
                            dataClear();
                        })
                        .catch((e) => {
                            let errMsg = ErrorCheck(e);
                            ResultError(errMsg);
                        });
                } else {
                    ResultError(`入力番号:${inputData[1]}
                    問い合わせ番号が違います。`);
                }
            }
        }
    };

    const ResultOK = () => {
        inputRef.current[taskCnt].disabled = true;
        boxRef.current[taskCnt].style.backgroundColor = green[200];
        SetMsgBox((prevState) => ({ ...prevState, [taskCnt]: '完了' }));
        focusing(taskCnt + 1);
    };

    const ResultError = (text) => {
        SetMsgBox((prevState) => ({ ...prevState, [taskCnt]: [text] }));
        boxRef.current[taskCnt].style.backgroundColor = red[200];
        inputData[taskCnt] = '';
    };

    const TextFieldHandler = (e) => {
        var name = e.target.id;
        SetInputData((prevState) => ({
            ...prevState,
            ...{ [name]: e.target.value },
        }));
    };

    return (
        <Box
            height={'100%'}
            minWidth={1200}
            display={'flex'}
            flexDirection={'column'}
        >
            <Box
                sx={{
                    height: 50,
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    color: 'primary.dark',
                    backgroundColor: 'primary.main',
                    py: 1,
                    px: 1,
                    zIndex: 2,
                    boxShadow: 2,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <ButtonBase
                    color="black"
                    onClick={() => {
                        navigate(`/${pageType}`);
                    }}
                >
                    <Box
                        sx={{ ':hover': { color: grey[300] } }}
                        display={'flex'}
                    >
                        <ArrowBackIcon sx={{ fontSize: 32 }} />
                        <Typography fontWeight={'bold'} fontSize={24}>
                            戻る
                        </Typography>
                    </Box>
                </ButtonBase>
            </Box>
            {/* <Header pageType={pageType} disableList={true} /> */}
            <Box height={'100%'} display={'flex'} flexDirection={'column'}>
                <Box
                    width={'100%'}
                    minWidth={950}
                    px={4}
                    height={80}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <Typography fontSize={24} fontWeight={'bold'}>
                        2次検品
                    </Typography>

                    <Box
                        display={'flex'}
                        width={'90%'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Box display={'flex'} gap={3} alignItems={'center'}>
                            <Typography
                                fontSize={24}
                                ml={4}
                                fontWeight={'bold'}
                            >
                                出荷日 : {selectDate}
                            </Typography>
                            <Box display={'flex'} gap={3} alignItems={'center'}>
                                {pageType == 'supermarket' && (
                                    <ButtonBase
                                        onClick={() => {
                                            navigate(
                                                `/${pageType}/checking/${selectDate}`
                                            );
                                        }}
                                    >
                                        <Box
                                            sx={BtnOption}
                                            borderRadius={1}
                                            px={2}
                                            display={'flex'}
                                            alignItems={'center'}
                                        >
                                            <Typography
                                                fontWeight={'bold'}
                                                fontSize={24}
                                            >
                                                一次検品
                                            </Typography>
                                            <ArrowForwardIcon
                                                sx={{ fontSize: 32 }}
                                            />
                                        </Box>
                                    </ButtonBase>
                                )}
                            </Box>
                        </Box>
                        {completeText != '' && (
                            <Typography
                                border={2}
                                borderRadius={2}
                                px={2}
                                color={red[400]}
                                fontWeight={'bold'}
                                fontSize={32}
                            >
                                {completeText}
                            </Typography>
                        )}
                        <Box ref={btnRef} width={300}>
                            <Button onClick={() => dataClear()} sx={BtnOption}>
                                データクリア
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Divider variant="middle" />
                {/* MIDDLE LIST */}
                <Box height={80} gap={2} mx={4} mt={1} mb={2} display={'flex'}>
                    <Box minWidth={200} width={'15%'}>
                        <Typography>注文明細No</Typography>
                        <Box sx={CheckingOutputBoxOption}>{detailNo}</Box>
                    </Box>
                    <Box minWidth={250} width={'25%'}>
                        <Typography>宛名</Typography>
                        <Box sx={CheckingOutputBoxOption}>{sceneName}</Box>
                    </Box>
                    <Box minWidth={500} width={'45%'}>
                        <Typography>納品先住所</Typography>
                        <Box sx={CheckingOutputBoxOption}>{address}</Box>
                    </Box>
                    <Box minWidth={150} width={'10%'}>
                        <Typography>作業進捗</Typography>
                        <Box
                            justifyContent={'center'}
                            sx={CheckingOutputBoxOption}
                            display={'flex'}
                        >
                            <Typography
                                color="primary"
                                fontWeight={'bold'}
                                fontSize={28}
                            >
                                {WorkCount}
                            </Typography>
                            <Typography fontSize={28}>
                                /{maxWorkCount}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Bottom */}
                {/* <Divider variant="middle" /> */}
                <Box
                    height={'100%'}
                    width={'100%'}
                    minWidth={1200}
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    backgroundColor={grey[100]}
                >
                    <Box
                        height={'70%'}
                        width={'90%'}
                        minWidth={1000}
                        maxWidth={1200}
                        mx={4}
                        mt={2}
                        display={'flex'}
                    >
                        {/* バーコードリスト 1 */}
                        <Box sx={CheckingListBoxOption(taskCnt, 0)}>
                            <Typography
                                my={2}
                                fontSize={20}
                                textAlign={'center'}
                                fontWeight={'bold'}
                            >
                                梱包ラベルバーコード
                            </Typography>
                            <TextField
                                value={inputData[0]}
                                onChange={TextFieldHandler}
                                inputProps={{ onKeyPress: handleKeyPress }}
                                inputRef={(ref) => inputRef.current.push(ref)}
                                id="0"
                                label="問い合わせNo"
                                sx={CheckingListInputOption}
                            />
                            <Box
                                ref={(ref) => boxRef.current.push(ref)}
                                sx={CheckingListResultOption}
                                backgroundColor={grey[400]}
                                height={100}
                            >
                                <Typography
                                    whiteSpace={'pre-line'}
                                    sx={CheckingListResultTextOption}
                                >
                                    {MsgBox[0]}
                                </Typography>
                            </Box>
                        </Box>
                        <ForwardIcon sx={{ fontSize: 100, height: '100%' }} />
                        {/* バーコードリスト 2 */}
                        <Box sx={CheckingListBoxOption(taskCnt, 1)}>
                            <Typography
                                my={2}
                                fontSize={20}
                                textAlign={'center'}
                                fontWeight={'bold'}
                            >
                                送り状バーコード
                            </Typography>
                            <TextField
                                value={inputData[1]}
                                onChange={TextFieldHandler}
                                inputProps={{ onKeyPress: handleKeyPress }}
                                inputRef={(ref) => inputRef.current.push(ref)}
                                id="1"
                                label="問い合わせNo"
                                sx={CheckingListInputOption}
                            />
                            <Box
                                ref={(ref) => boxRef.current.push(ref)}
                                sx={CheckingListResultOption}
                                backgroundColor={grey[400]}
                            >
                                <Typography
                                    whiteSpace={'pre-line'}
                                    sx={CheckingListResultTextOption}
                                >
                                    {MsgBox[1]}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default Checking2;

function ErrorCheck(e) {
    let errMsg = '';
    if (e.response == null) errMsg = 'サーバー接続失敗';
    else if (e.response.status == 409) errMsg = '出荷済みの問い合わせ番号です';
    else errMsg = e.response.data.message;
    return errMsg;
}
