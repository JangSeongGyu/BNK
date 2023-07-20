import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box, Button, Divider, TextField } from '@mui/material';
import Header from '../components/Header';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import ForwardIcon from '@mui/icons-material/Forward';
import { green, grey, pink, red } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import barcode from '../images/barcode.png';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BorderOption = SuperMarketDesign('BorderOption');
const insListOption = SuperMarketDesign('insListOption');
const insOutputOption = SuperMarketDesign('insOutputOption');
const insListResultOption = SuperMarketDesign('insListResultOption');
const BtnOption = SuperMarketDesign('BtnOption');

const SPChecking = (props) => {
    const insListResultTypoOption = SuperMarketDesign(
        'insListResultTypoOption'
    );
    const insTFOption = SuperMarketDesign('insTFOption');

    const pageType = props.pageType;
    const [MsgBox, SetMsgBox] = useState({
        MB0: '未完了',
        MB1: '未完了',
        MB2: '未完了',
    });
    const [inputData, SetInputData] = useState({});
    const [taskCnt, SetTaskCnt] = useState(0);
    const [maxWorkCount, SetMaxWorkCount] = useState(0);
    const [WorkCount, SetWorkCount] = useState(0);
    const boxRef = useRef(new Array());
    const inputRef = useRef(new Array());
    const btnRef = useRef();
    const { selectDate, type } = useParams();
    const [searchData, SetSearchData] = useState([]);
    const maxTask = 3;

    const dataClear = () => {
        console.log('clear');
        for (let i = 0; i < maxTask; i++) {
            boxRef.current[i].style.backgroundColor = grey[300];
            inputRef.current[i].disabled = true;
        }
        SetTaskCnt(0);
        SetInputData({ TF0: '', TF1: '', TF2: '' });
        SetMsgBox({ MB0: '未完了', MB1: '未完了', MB2: '未完了' });
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

    const focusing = (number) => {
        console.log(inputRef);
        inputRef.current[number].disabled = false;
        inputRef.current[number].focus();
    };

    const GetNumberData = () => {
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    `/api/${pageType}/dailydata/${selectDate}/${inputData['TF0']}`
            )
            .then((res) => {
                console.log(res.data.length);
                if (res.data.length == 0) {
                    let str = `入力番号:${inputData['TF0']}
                        データがありません。`;

                    ResultError(str);
                    inputData['TF0'] = '';
                } else {
                    if (res.data[0].一次梱包フラグ == 1)
                        ResultError('梱包した問い合わせ番号です。');
                    else {
                        console.log(res.data[0]);
                        SetSearchData(res.data[0]);
                        ResultOK();
                    }
                }
            })
            .catch((e) => {
                ResultError(`入力番号:${inputData['TF0']}
                データの形式が違います。`);
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
        const str = 'TF' + taskCnt;
        const str2 = 'MB' + taskCnt;
        if (event.key === 'Enter') {
            if (inputData[str] == '' || inputData[str] == null) {
                ResultError('入力してください');
                return;
            }
            SetMsgBox((prevState) => ({
                ...prevState,
                [str2]: 'サーバ接続中…',
            }));

            if (taskCnt == 2) {
                if (!is_number(inputData['TF2'])) {
                    ResultError('数量を入力してください');
                    return;
                }
                if (searchData.数量 == inputData['TF2']) {
                    const toastid = toast.loading('出荷処理中...');
                    axios
                        .put(
                            import.meta.env.VITE_DOMAIN +
                                `/api/${pageType}/firstpacking/${selectDate}/${inputData['TF0']}`
                        )
                        .then((res) => {
                            toast.success('検品処理完了しました。', {
                                id: toastid,
                            });
                            getWorkCount();
                            dataClear();
                        })
                        .catch((e) => {
                            ResultError();
                            toast.error('error', { id: toastid });
                        });
                } else {
                    ResultError(
                        `入力数量:${inputData['TF2']} 数量が違います。`
                    );
                }
            } else if (taskCnt == 1) {
                if (inputData['TF0'] == inputData['TF1']) {
                    ResultOK();
                } else {
                    ResultError(`入力番号:${inputData['TF1']}
                    問い合わせ番号が違います。`);
                    inputData['TF1'] = '';
                }
            } else if (taskCnt == 0) {
                GetNumberData();
            }
        }
    };

    const ResultOK = () => {
        var str = 'MB' + taskCnt;
        inputRef.current[taskCnt].disabled = true;
        SetMsgBox((prevState) => ({ ...prevState, [str]: '完了' }));
        boxRef.current[taskCnt].style.backgroundColor = green[200];
        focusing(taskCnt + 1);
        SetTaskCnt(taskCnt + 1);
    };

    const ResultError = (text) => {
        var str = 'MB' + taskCnt;
        SetMsgBox((prevState) => ({ ...prevState, [str]: [text] }));
        boxRef.current[taskCnt].style.backgroundColor = red[200];
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
            <Header title="スーパーマーケット" disableList="false" />
            <Box height={'90%'}>
                <Box
                    width={'100%'}
                    px={4}
                    height={'8%'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <Typography
                        onClick={() => SetTaskCnt(taskCnt + 1)}
                        fontSize={24}
                    >
                        検品
                    </Typography>
                    <Box
                        display={'flex'}
                        width={'90%'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Typography fontSize={24} ml={4}>
                            出荷日 : {selectDate}
                        </Typography>

                        <Box ref={btnRef} width={'30%'} mt={-1}>
                            <Button onClick={() => dataClear()} sx={BtnOption}>
                                クリア
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
                            <Box my={2} fontSize={20} textAlign={'center'}>
                                バーコード
                            </Box>
                            <TextField
                                value={inputData['TF0']}
                                onChange={TextFieldHandler}
                                inputProps={{ onKeyPress: handleKeyPress }}
                                inputRef={(ref) => inputRef.current.push(ref)}
                                id="TF0"
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
                                    {MsgBox['MB0']}
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
                            <Box my={2} fontSize={20} textAlign={'center'}>
                                バーコード２
                            </Box>
                            <TextField
                                value={inputData['TF1']}
                                onChange={TextFieldHandler}
                                inputProps={{ onKeyPress: handleKeyPress }}
                                inputRef={(ref) => inputRef.current.push(ref)}
                                id="TF1"
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
                                    {MsgBox['MB1']}
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
                            <Box my={2} fontSize={20} textAlign={'center'}>
                                数量入力
                            </Box>

                            <TextField
                                label="数量入力"
                                onChange={TextFieldHandler}
                                inputProps={{ onKeyPress: handleKeyPress }}
                                inputRef={(ref) => inputRef.current.push(ref)}
                                value={inputData['TF2']}
                                id="TF2"
                                sx={insTFOption}
                            />
                            <Box
                                ref={(ref) => boxRef.current.push(ref)}
                                sx={insListResultOption}
                            >
                                <Typography sx={insListResultTypoOption}>
                                    {MsgBox['MB2']}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default SPChecking;
