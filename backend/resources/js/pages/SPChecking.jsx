import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box, Button, Divider, TextField } from '@mui/material';
import Header from '../components/Header';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import ForwardIcon from '@mui/icons-material/Forward';
import { green, grey, pink, red } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import barcode from '../images/barcode.png';
import axios from 'axios';
import ToasterComp from '../components/ToasterComp';
import toast, { Toaster } from 'react-hot-toast';

const BorderOption = SuperMarketDesign('BorderOption');
const insListOption = SuperMarketDesign('insListOption');
const insOutputOption = SuperMarketDesign('insOutputOption');
const insListResultOption = SuperMarketDesign('insListResultOption');
const BtnOption = SuperMarketDesign('BtnOption');

const SPChecking = () => {
    const insListResultTypoOption = SuperMarketDesign(
        'insListResultTypoOption'
    );
    const insTFOption = SuperMarketDesign('insTFOption');

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
    const { selectDate } = useParams();
    const [sceneName, SetSceneName] = useState('');
    const [detailNo, SetDetailNo] = useState('');
    const [address, SetAddress] = useState('');

    const maxTask = 3;
    const dataClear = () => {
        for (let i = 0; i < maxTask; i++) {
            boxRef.current[i].style.backgroundColor = grey[300];
            inputRef.current[i].disabled = true;
        }
        SetTaskCnt(0);
        SetInputData({ TF0: '', TF1: '', TF2: '' });
        SetMsgBox({ MB0: '未完了', MB1: '未完了', MB2: '未完了' });
        focusing(0);
        SetSceneName('');
        SetDetailNo('');
        SetAddress('');
    };

    useEffect(() => {
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    '/api/supermarket/dailydata/' +
                    selectDate
            )
            .then((res) => {
                SetMaxWorkCount(res.data.length);
                res.data.forEach((data) => {
                    console.log(data);
                    if (data.一次梱包フラグ == 1 || data.二次梱包フラグ == 1)
                        SetWorkCount(WorkCount + 1);
                });
            });
        for (let i = 0; i < maxTask; i++) {
            inputRef.current[i].disabled = true;
        }
        focusing(0);
    }, []);

    const focusing = (number) => {
        console.log(inputRef);
        inputRef.current[number].disabled = false;
        inputRef.current[number].focus();
    };
    const UpdateData = () => {
        axios.put(import.meta.env.VITE_DOMAIN + '/api/supermarket/?');
    };

    const GetNumberData = () => {
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    '/api/supermarket/dailydata/' +
                    selectDate +
                    '/' +
                    inputData['TF0']
            )
            .then((res) => {
                console.log(res.data.length);
                if (res.data.length == 0) {
                    ResultError('データがありません。');
                } else {
                    SetSceneName(res.data[0].シーン名);
                    SetDetailNo(res.data[0].注文明細No);
                    SetAddress(res.data[0].納品先住所);
                    ResultOK();
                }
            })
            .catch((e) => {
                ResultError('??');
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
        if (event.key === 'Enter') {
            if (inputData[str] == '' || inputData[str] == null) {
                ResultError('入力してください');
                return;
            }

            if (taskCnt == 2) {
                if (is_number(inputData['TF2'])) {
                    SetWorkCount(WorkCount + 1);
                    callToaster('検品処理完了しました。');
                    dataClear();
                } else ResultError('数量を入力してください');
            } else if (taskCnt == 1) {
                if (inputData['TF0'] == inputData['TF1']) {
                    ResultOK();
                } else {
                    ResultError('問い合わせ番号が違います。');
                }
            } else {
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

    const callToaster = (text) => {
        toast.success(text);
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
            <ToasterComp />
            <Header title="スーパーマーケット" disableList="false" />
            <Box>
                <Box
                    width={'100%'}
                    py={1}
                    px={4}
                    display={'flex'}
                    alignItems={'baseline'}
                >
                    <Typography onClick={callToaster} fontSize={30} mr={5}>
                        検品
                    </Typography>
                    <Box
                        display={'flex'}
                        width={'90%'}
                        height={30}
                        justifyContent={'space-between'}
                    >
                        <>
                            <Typography fontSize={24}>
                                出荷日 : {selectDate}
                            </Typography>
                        </>
                        <Box width={'30%'} mt={-1}>
                            <Button onClick={() => dataClear()} sx={BtnOption}>
                                クリア
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Divider variant="middle" />
                {/* MIDDLE LIST */}
                <Box gap={2} mx={4} my={2} display={'flex'}>
                    <Box minWidth={200} width={'15%'}>
                        <Typography>注文明細No</Typography>
                        <Box sx={insOutputOption}>{detailNo}</Box>
                    </Box>
                    <Box minWidth={200} width={'20%'}>
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

                <Box mx={4} mt={2} display={'flex'}>
                    {/* バーコードリスト 1 */}
                    <Box sx={insListOption} border={taskCnt == 0 ? 3 : 0}>
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
                        >
                            <Typography sx={insListResultTypoOption}>
                                {MsgBox['MB0']}
                            </Typography>
                        </Box>
                    </Box>
                    <ForwardIcon sx={{ fontSize: 100, mt: 20 }} />
                    {/* バーコードリスト 2 */}
                    <Box sx={insListOption} border={taskCnt == 1 ? 3 : 0}>
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
                            <Typography sx={insListResultTypoOption}>
                                {MsgBox['MB1']}
                            </Typography>
                        </Box>
                    </Box>
                    <ForwardIcon sx={{ fontSize: 100, mt: 20 }} />

                    {/* 数量入力 */}
                    <Box sx={insListOption} border={taskCnt == 2 ? 3 : 0}>
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
        </>
    );
};
export default SPChecking;
