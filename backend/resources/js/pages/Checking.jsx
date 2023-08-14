import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box, Button, Divider, TextField } from '@mui/material';
import {
    BtnOption,
    CheckingListInputOption,
    CheckingListBoxOption,
    CheckingOutputBoxOption,
    CheckingListResultOption,
    CheckingListResultTextOption,
} from '../Design/DesignOption';
import ForwardIcon from '@mui/icons-material/Forward';
import { green, grey, pink, red } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import barcode from '../images/barcode.png';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/HeaderCompnent/Header';

const Checking = (props) => {
    const pageType = props.pageType;
    const [MsgBox, SetMsgBox] = useState({
        0: '未完了',
        1: '未完了',
        2: '未完了',
    });
    const [inputData, SetInputData] = useState({});
    const [taskCnt, SetTaskCnt] = useState(0);
    const [maxWorkCount, SetMaxWorkCount] = useState(0);
    const [WorkCount, SetWorkCount] = useState(0);
    const boxRef = useRef(new Array());
    const inputRef = useRef(new Array());
    const btnRef = useRef();
    const { selectDate } = useParams();
    const [searchData, SetSearchData] = useState([]);
    const [completeText, SetCompleteText] = useState('');
    const maxTask = 3;

    const dataClear = () => {
        console.log('clear');
        for (let i = 0; i < maxTask; i++) {
            boxRef.current[i].style.backgroundColor = grey[300];
            inputRef.current[i].disabled = true;
        }
        SetTaskCnt(0);
        SetInputData({ 0: '', 1: '', 2: '' });
        SetMsgBox({ 0: '未完了', 1: '未完了', 2: '未完了' });
        focusing(0);
        SetSearchData([]);
    };

    useEffect(() => {
        getWorkCount();
        inputLock();
        focusing(0);
    }, []);

    const inputLock = () => {
        for (let i = 0; i < maxTask; i++) {
            inputRef.current[i].disabled = true;
        }
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
                    if (data.一次梱包フラグ == 1 || data.二次梱包フラグ == 1) {
                        cnt++;
                    }
                });
                SetWorkCount(cnt);
                // 全部処理したら実行
                if (cnt == res.data.length) {
                    inputLock();
                    SetTaskCnt(5);
                    console.log(btnRef);
                    SetCompleteText('完了');
                    btnRef.current.hidden = 'true';
                }
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = '作業進捗サーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    };

    const focusing = (nuer) => {
        console.log(inputRef);
        inputRef.current[nuer].disabled = false;
        inputRef.current[nuer].focus();
    };

    const GetNumberData = () => {
        axios
            .get(
                `/api/${pageType}/checkingdata/${selectDate}/${inputData['0']}?type=1`
            )
            .then((res) => {
                SetSearchData(res.data[0]);
                ResultOK();
            })
            .catch((e) => {
                let errMsg = ErrorCheck(e);
                ResultError(`入力番号:${inputData['0']}
                ${errMsg}`);
            });
    };

    const is_number = (text) => {
        const regex = /^[0-9]+$/;
        if (regex.test(text)) {
            return true;
        }
        return false;
    };

    const handleKeyPress = (e) => {
        const event = e;
        if (event.key === 'Enter') {
            SetMsgBox((prevState) => ({
                ...prevState,
                [taskCnt]: 'サーバ接続中…',
            }));

            // 入力データがない時
            if (inputData[taskCnt] == '' || inputData[taskCnt] == null) {
                ResultError('内容を入力してください');
                return;
            }

            if (taskCnt == 0) {
                GetNumberData();
            } else if (taskCnt == 1) {
                if (inputData['0'] == inputData['1']) {
                    ResultOK();
                } else {
                    ResultError(`入力番号:${inputData['1']}
                    問い合わせ番号が違います。`);
                }
            } else if (taskCnt == 2) {
                // 数量なのかチェック
                if (!is_number(inputData['2'])) {
                    ResultError('数量を入力してください');
                    return;
                }

                // 数量がデータベースと同じだったら実行
                if (searchData.数量 == inputData['2']) {
                    axios
                        .put(
                            `/api/${pageType}/firstpacking/${selectDate}/${inputData['0']}`
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
                    ResultError(
                        `入力数量:${inputData['2']} 
                        入力数量が違います。`
                    );
                }
            }
        }
    };

    const ResultOK = () => {
        inputRef.current[taskCnt].disabled = true;
        SetMsgBox((prevState) => ({ ...prevState, [taskCnt]: '完了' }));
        boxRef.current[taskCnt].style.backgroundColor = green[200];
        focusing(taskCnt + 1);
        SetTaskCnt(taskCnt + 1);
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
        <>
            <Header pageType={pageType} disableList={true} />
            <Box height={'90%'}>
                <Box
                    width={'100%'}
                    px={4}
                    height={'10%'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <Typography fontSize={24} fontWeight={'bold'}>
                        検品
                    </Typography>
                    <Box
                        display={'flex'}
                        width={'90%'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Typography fontSize={24} ml={4} fontWeight={'bold'}>
                            出荷日 : {selectDate}
                        </Typography>
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
                <Box
                    height={'10%'}
                    gap={2}
                    mx={4}
                    mt={1}
                    mb={2}
                    display={'flex'}
                >
                    <Box minWidth={200} width={'15%'}>
                        <Typography>注文明細No</Typography>
                        <Box sx={CheckingOutputBoxOption}>
                            {searchData.注文No}
                        </Box>
                    </Box>
                    <Box minWidth={250} width={'25%'}>
                        <Typography>宛名</Typography>
                        <Box sx={CheckingOutputBoxOption}>
                            {searchData.シーン名}
                        </Box>
                    </Box>
                    <Box minWidth={500} width={'45%'}>
                        <Typography>納品先住所</Typography>
                        <Box sx={CheckingOutputBoxOption}>
                            {searchData.納品先住所}
                        </Box>
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

                <Divider variant="middle" />
                <Box
                    height={'80%'}
                    minWidth={1200}
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    backgroundColor={grey[100]}
                >
                    <Box
                        height={'80%'}
                        width={'100%'}
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
                                バーコード
                            </Typography>
                            <TextField
                                value={inputData['0']}
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
                                    {MsgBox['0']}
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
                                バーコード２
                            </Typography>
                            <TextField
                                value={inputData['1']}
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
                                    {MsgBox['1']}
                                </Typography>
                            </Box>
                        </Box>
                        <ForwardIcon sx={{ fontSize: 100, height: '100%' }} />
                        {/* 数量入力 */}
                        <Box sx={CheckingListBoxOption(taskCnt, 2)}>
                            <Typography
                                my={2}
                                fontSize={20}
                                textAlign={'center'}
                                fontWeight={'bold'}
                            >
                                数量入力
                            </Typography>

                            <TextField
                                label="数量入力"
                                onChange={TextFieldHandler}
                                inputProps={{ onKeyPress: handleKeyPress }}
                                inputRef={(ref) => inputRef.current.push(ref)}
                                value={inputData['2']}
                                id="2"
                                sx={CheckingListInputOption}
                            />
                            <Box
                                ref={(ref) => boxRef.current.push(ref)}
                                sx={CheckingListResultOption}
                            >
                                <Typography
                                    whiteSpace={'pre-line'}
                                    sx={CheckingListResultTextOption}
                                >
                                    {MsgBox['2']}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default Checking;

function ErrorCheck(e) {
    let errMsg = '';
    if (e.response == null) errMsg = 'サーバー接続失敗';
    else if (e.response.status == 409) errMsg = '出荷済みの問い合わせ番号です';
    else errMsg = e.response.data.message;
    return errMsg;
}
