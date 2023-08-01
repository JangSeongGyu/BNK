import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box, Button, Divider, TextField } from '@mui/material';
import Header from '../components/Header';
import DesignOption from '../Design/DesignOption';
import ForwardIcon from '@mui/icons-material/Forward';
import { green, grey, pink, red } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import barcode from '../images/barcode.png';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BorderOption = DesignOption('BorderOption');
const insListOption = DesignOption('insListOption');
const insOutputOption = DesignOption('insOutputOption');
const insListResultOption = DesignOption('insListResultOption');
const BtnOption = DesignOption('BtnOption');

const Checking = (props) => {
    const insListResultTypoOption = DesignOption('insListResultTypoOption');
    const insTFOption = DesignOption('insTFOption');

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
        const toastid = toast.loading('作業進捗更新中...');
        SetWorkCount(0);
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    `/api/${pageType}/dailydata/${selectDate}`
            )
            .then((res) => {
                toast.success('作業進捗更新できました。', { id: toastid });
                SetMaxWorkCount(res.data.length);
                res.data.forEach((data) => {
                    console.log(data);
                    if (data.一次梱包フラグ == 1 || data.二次梱包フラグ == 1) {
                        cnt++;
                    }
                });
                console.log(WorkCount);

                SetWorkCount(cnt);
                if (cnt == res.data.length) {
                    inputLock();
                    SetTaskCnt(5);
                    console.log(btnRef);
                    btnRef.current.hidden = 'true';
                }
            })
            .catch((e) => {
                toast.error('作業進捗更新できました。', { id: toastid });
            });
    };

    const focusing = (nuer) => {
        console.log(inputRef);
        inputRef.current[nuer].disabled = false;
        inputRef.current[nuer].focus();
    };

    const GetNuerData = () => {
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    `/api/${pageType}/checkingdata/${selectDate}/${inputData['0']}`
            )
            .then((res) => {
                console.log(res.data.length);
                if (res.data.length == 0) {
                    ResultError(`入力番号:${inputData['0']}
                    データがありません。`);
                } else {
                    if (res.data[0].一次梱包フラグ == 1)
                        ResultError(`入力番号:${inputData['0']}
                        すでに`);
                    else {
                        console.log(res.data[0]);
                        SetSearchData(res.data[0]);
                        ResultOK();
                    }
                }
            })
            .catch((e) => {
                let errMsg = e.response.data.message;
                ResultError(`入力番号:${inputData['0']}
                ${errMsg}`);
            });
    };

    const is_nuer = (text) => {
        const regex = /^[0-9]+$/;
        if (regex.test(text)) {
            return true;
        }
        return false;
    };

    const handleKeyPress = (e) => {
        const event = e;
        if (event.key === 'Enter') {
            // 入力データがない時
            if (inputData[taskCnt] == '' || inputData[taskCnt] == null) {
                ResultError('入力してください');
                return;
            }
            SetMsgBox((prevState) => ({
                ...prevState,
                [taskCnt]: 'サーバ接続中…',
            }));

            if (taskCnt == 2) {
                // 数量なのかチェック
                if (!is_nuer(inputData['2'])) {
                    ResultError('数量を入力してください');
                    return;
                }

                // 数量がデータベースと同じだったら実行
                if (searchData.数量 == inputData['2']) {
                    const toastid = toast.loading('出荷処理中...');
                    axios
                        .put(
                            import.meta.env.VITE_DOMAIN +
                                `/api/${pageType}/firstpacking/${selectDate}/${inputData['0']}`
                        )
                        .then((res) => {
                            toast.success('検品処理完了しました。', {
                                id: toastid,
                            });
                            getWorkCount();
                            dataClear();
                        })
                        .catch((e) => {
                            ResultError('エラー：' + e.response.data.message);
                            toast.error('error', { id: toastid });
                        });
                } else {
                    ResultError(
                        `入力数量:${inputData['2']} 
                        入力数量数量が違います。`
                    );
                }
            } else if (taskCnt == 1) {
                if (inputData['0'] == inputData['1']) {
                    ResultOK();
                } else {
                    ResultError(`入力番号:${inputData['1']}
                    問い合わせ番号が違います。`);
                }
            } else if (taskCnt == 0) {
                GetNuerData();
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
            <Header pageType={pageType} disableList="false" />
            <Box height={'90%'}>
                <Box
                    width={'100%'}
                    px={4}
                    height={'8%'}
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

                        <Box ref={btnRef} width={'20%'}>
                            <Button onClick={() => dataClear()} sx={BtnOption}>
                                データクリア
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Divider variant="middle" />
                {/* MIDDLE LIST */}
                <Box height={'10%'} gap={2} mx={4} my={2} display={'flex'}>
                    <Box minWidth={200} width={'15%'}>
                        <Typography>注文明細No</Typography>
                        <Box sx={insOutputOption}>{searchData.注文No}</Box>
                    </Box>
                    <Box minWidth={250} width={'25%'}>
                        <Typography>宛名</Typography>
                        <Box sx={insOutputOption}>{searchData.シーン名}</Box>
                    </Box>
                    <Box minWidth={500} width={'45%'}>
                        <Typography>納品先住所</Typography>
                        <Box sx={insOutputOption}>{searchData.納品先住所}</Box>
                    </Box>
                    <Box minWidth={150} width={'10%'}>
                        <Typography>作業進捗</Typography>
                        <Box
                            justifyContent={'center'}
                            sx={insOutputOption}
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
                    width={'100%'}
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    backgroundColor={grey[100]}
                >
                    <Box
                        height={'80%'}
                        width={'90%'}
                        mx={4}
                        mt={2}
                        display={'flex'}
                    >
                        {/* バーコードリスト 1 */}
                        <Box
                            sx={insListOption}
                            border={2}
                            borderColor={taskCnt == 0 ? red[500] : grey[500]}
                        >
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
                                sx={insTFOption}
                            />
                            <Box
                                ref={(ref) => boxRef.current.push(ref)}
                                sx={insListResultOption}
                                backgroundColor={grey[400]}
                                height={100}
                            >
                                <Typography
                                    whiteSpace={'pre-line'}
                                    sx={insListResultTypoOption}
                                >
                                    {MsgBox['0']}
                                </Typography>
                            </Box>
                        </Box>
                        <ForwardIcon sx={{ fontSize: 100, height: '100%' }} />
                        {/* バーコードリスト 2 */}
                        <Box
                            sx={insListOption}
                            border={2}
                            borderColor={taskCnt == 1 ? red[500] : grey[500]}
                        >
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
                                sx={insTFOption}
                            />
                            <Box
                                ref={(ref) => boxRef.current.push(ref)}
                                sx={insListResultOption}
                                backgroundColor={grey[400]}
                            >
                                <Typography
                                    whiteSpace={'pre-line'}
                                    sx={insListResultTypoOption}
                                >
                                    {MsgBox['1']}
                                </Typography>
                            </Box>
                        </Box>
                        <ForwardIcon sx={{ fontSize: 100, height: '100%' }} />
                        {/* 数量入力 */}
                        <Box
                            sx={insListOption}
                            border={2}
                            borderColor={taskCnt == 2 ? red[500] : grey[500]}
                        >
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
                                sx={insTFOption}
                            />
                            <Box
                                ref={(ref) => boxRef.current.push(ref)}
                                sx={insListResultOption}
                            >
                                <Typography
                                    whiteSpace={'pre-line'}
                                    sx={insListResultTypoOption}
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
