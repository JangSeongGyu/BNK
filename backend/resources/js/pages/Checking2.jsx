import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box, Button, Divider, TextField } from '@mui/material';
import Header from '../components/Header';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import ForwardIcon from '@mui/icons-material/Forward';
import { green, grey, pink, red } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BorderOption = SuperMarketDesign('BorderOption');
const insListOption = SuperMarketDesign('insListOption');
const insOutputOption = SuperMarketDesign('insOutputOption');
const insListResultOption = SuperMarketDesign('insListResultOption');
const BtnOption = SuperMarketDesign('BtnOption');

const Checking2 = (props) => {
    const insListResultTypoOption = SuperMarketDesign(
        'insListResultTypoOption'
    );
    const insTFOption = SuperMarketDesign('insTFOption');

    const [MsgBox, SetMsgBox] = useState({
        MB0: '未完了',
        MB1: '未完了',
        MB2: '未完了',
    });
    const pageType = props.pageType;
    const [inputData, SetInputData] = useState({});
    const [taskCnt, SetTaskCnt] = useState(0);
    const [maxWorkCount, SetMaxWorkCount] = useState(0);
    const [WorkCount, SetWorkCount] = useState(0);
    const boxRef = useRef(new Array());
    const inputRef = useRef(new Array());
    const btnRef = useRef();
    const { selectDate } = useParams();
    const [sceneName, SetSceneName] = useState('');
    const [detailNo, SetDetailNo] = useState('');
    const [address, SetAddress] = useState('');

    const maxTask = 2;
    const dataClear = () => {
        console.log('clear');
        for (let i = 0; i < maxTask; i++) {
            boxRef.current[i].style.backgroundColor = grey[300];
            inputRef.current[i].disabled = true;
        }
        SetTaskCnt(0);
        SetInputData({ TF0: '', TF1: '' });
        SetMsgBox({ MB0: '未完了', MB1: '未完了', MB2: '未完了' });
        focusing(0);
        SetSceneName('');
        SetDetailNo('');
        SetAddress('');
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
                    `/api/${pageType}/dailydata/` +
                    selectDate
            )
            .then((res) => {
                toast.success('作業進捗更新できました。', { id: toastid });
                SetMaxWorkCount(res.data.length);
                res.data.forEach((data) => {
                    if (data.二次梱包フラグ == 1) cnt++;
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
                console.log(res.data);
                if (res.data.length == 0) {
                    let str = `入力番号:${inputData['TF0']}
                        データがありません。`;

                    ResultError(str);
                } else if (res.data[0].一次梱包フラグ == 0) {
                    ResultError('一次梱包されていない番号です。');
                } else {
                    if (res.data[0].二次梱包フラグ == 1)
                        ResultError('梱包した問い合わせ番号です。');
                    else {
                        SetSceneName(res.data[0].シーン名);
                        SetDetailNo(res.data[0].注文明細No);
                        SetAddress(res.data[0].納品先住所);
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

            if (taskCnt == 0) GetNumberData();
            else if (taskCnt == 1) {
                if (inputData['TF0'] == inputData['TF1']) {
                    const toastid = toast.loading('出荷処理中...');
                    axios
                        .put(
                            import.meta.env.VITE_DOMAIN +
                                `/api/${pageType}/secondpacking/${selectDate}/${inputData['TF0']}`
                        )
                        .then((res) => {
                            toast.success('検品処理完了しました。', {
                                id: toastid,
                            });
                            getWorkCount();
                            dataClear();
                        })
                        .catch((e) => {
                            ResultError('サーバエラー');
                            toast.error('error', { id: toastid });
                        });
                } else {
                    ResultError(`入力番号:${inputData['TF1']}
                    問い合わせ番号が違います。`);
                }
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
        var TF = 'TF' + taskCnt;
        SetMsgBox((prevState) => ({ ...prevState, [str]: [text] }));
        boxRef.current[taskCnt].style.backgroundColor = red[200];

        inputData[TF] = '';
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
                        2次検品
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
                        <Box sx={insOutputOption}>{detailNo}</Box>
                    </Box>
                    <Box minWidth={250} width={'25%'}>
                        <Typography>宛名</Typography>
                        <Box sx={insOutputOption}>{sceneName}</Box>
                    </Box>
                    <Box minWidth={500} width={'45%'}>
                        <Typography>納品先住所</Typography>
                        <Box sx={insOutputOption}>{address}</Box>
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
                            <Typography
                                my={2}
                                fontSize={20}
                                textAlign={'center'}
                                fontWeight={'bold'}
                            >
                                バーコード２
                            </Typography>
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
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default Checking2;
