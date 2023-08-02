import React, { useEffect, useState, useRef } from 'react';
import SelectDateCard from './SelectDateCard';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { dialogYes, dialogNo } from '../Design/DesignOption';
import axios from 'axios';
import { green, red } from '@mui/material/colors';
import toast, { Toaster } from 'react-hot-toast';

const MarketOutSideList = (props) => {
    const selectDate = props.selectDate;
    const logDatas = props.logDatas;
    const pageType = props.pageType;
    const normalCnt = props.normalCnt;
    const pouchCnt = props.pouchCnt;

    const [boxCount, SetBoxCount] = useState(0);
    const [selectOption, SetSelectOption] = useState('');

    const ShipmentClick = () => {
        if (pageType == 'supermarket') SPAxios();
        else if (pageType == 'taxi') TXAxios();
    };

    const SPAxios = () => {
        const toastid = toast.loading('サーバ接続中...');
        axios
            .put(`/api/${pageType}/shipment/` + selectDate)
            .then((res) => {
                toast.success('出荷処理しました。', { id: toastid });
                props.handleClose(false);
            })
            .catch((e) => {
                toast.error('出荷処理に失敗しました。', { id: toastid });
            });
    };

    const TXAxios = () => {
        const toastid = toast.loading('サーバ接続中...');
        axios
            .put(`/api/${pageType}/shipment/` + selectDate)
            .then((res) => {
                toast.success('出荷処理しました。', { id: toastid });
                props.handleClose(false);
            })
            .catch((e) => {
                toast.error('出荷処理に失敗しました。', { id: toastid });
            });
    };

    const ConfirmBox = () => {
        return (
            <Box width={500} height={200} p={2}>
                <Box
                    height={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                >
                    <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                        {' '}
                        出荷日：{selectDate}
                        <br />
                        未処理案件：{logDatas}件
                        <br />
                        {/* 情報: {pageType}{' '} */}
                        {selectOption != '' && <>{selectOption}</>}
                    </Typography>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        gap={1}
                        mt={1}
                    >
                        <Button
                            onClick={() => ShipmentClick()}
                            // border={1}
                            sx={{
                                width: '100%',
                                border: 1,
                                color: green[700],
                                backgroundColor: 'white',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: green[700],
                                    color: 'white',
                                },
                            }}
                        >
                            出荷処理
                        </Button>
                        <Button
                            sx={dialogNo}
                            onClick={() => props.handleClose(true)}
                        >
                            戻る
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    };
    const CheckingBox = () => {
        return (
            <Box width={500} height={170} p={2}>
                <Box
                    height={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                >
                    <Typography
                        textAlign={'center'}
                        sx={{ fontWeight: 'bold', fontSize: 20 }}
                    >
                        出荷するデータを選んでください。
                    </Typography>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        gap={1}
                        mt={1}
                    >
                        <Button
                            onClick={() => ClickPouch()}
                            disabled={pouchCnt == 0 ? true : false}
                            sx={dialogYes}
                        >
                            パウチ
                        </Button>
                        <Button
                            disabled={normalCnt == 0 ? true : false}
                            sx={dialogYes}
                            onClick={ClickNotPouch}
                        >
                            通常
                        </Button>
                    </Box>
                    <Button
                        mt={1}
                        sx={dialogNo}
                        onClick={() => props.handleClose(true)}
                    >
                        戻る
                    </Button>
                </Box>
            </Box>
        );
    };

    const ClickPouch = () => {
        SetSelectOption('パウチ');
        SetBoxCount(boxCount + 1);
    };

    const ClickNotPouch = () => {
        SetSelectOption('通常');
        SetBoxCount(boxCount + 1);
    };

    useEffect(() => {
        if (pageType == 'supermarket') {
            SetBoxCount(boxCount + 1);
        }
    }, []);

    const TypeBox = () => {
        if (pageType == 'supermarket') return <ConfirmBox />;
        return <>{boxCount == 0 ? <CheckingBox /> : <ConfirmBox />}</>;
    };

    return <TypeBox />;
};
export default MarketOutSideList;
