import { Box, Button, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
    dialogNo,
    normalBtn,
    UpdateBorderOption,
} from '../../Design/DesignOption';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';

const TXShipmentConfirmBox = (props) => {
    const selectDate = props.selectDate;
    const logDatas = props.logDatas;
    const pageType = props.pageType;
    const [pouchCnt, setPouchCnt] = useState(0);
    const [normalCnt, setNormalCnt] = useState(0);
    const [selectOption, SetSelectOption] = useState('');
    const [boxCount, SetBoxCount] = useState(0);

    useEffect(() => {
        if (logDatas.通常) {
            setNormalCnt(
                parseInt(logDatas['イーグルス']) + parseInt(logDatas['通常'])
            );
            setPouchCnt(
                parseInt(logDatas['イーグルスP']) + parseInt(logDatas['通常P'])
            );
        }
    }, [logDatas]);

    const ShipmentClick = () => {
        let pouch = 0;
        if (selectOption == 'パウチ') pouch = 1;

        const toastId = toast.loading('サーバ接続中...');
        axios
            .put(`/api/${pageType}/shipment/` + selectDate, {
                pouch: pouch,
            })
            .then((res) => {
                toast.success('出荷処理しました。', { id: toastId });
                props.handleClose(true);
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

    const ClickPouch = () => {
        SetSelectOption('パウチ');
        SetBoxCount(boxCount + 1);
    };

    const ClickNotPouch = () => {
        SetSelectOption('通常');
        SetBoxCount(boxCount + 1);
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
                        fontWeight={'bold'}
                        fontSize={20}
                    >
                        出荷処理する作業を選んでください。
                    </Typography>
                    {/* Pouch Normal Btn */}
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        gap={1}
                        mt={1}
                    >
                        <Button
                            disabled={normalCnt == 0 ? true : false}
                            sx={normalBtn}
                            onClick={ClickNotPouch}
                        >
                            <Typography fontWeight={'bold'}>
                                通常 {normalCnt}件
                            </Typography>
                        </Button>
                        <Button
                            onClick={() => ClickPouch()}
                            disabled={pouchCnt == 0 ? true : false}
                            sx={normalBtn}
                        >
                            <Typography fontWeight={'bold'}>
                                パウチ {pouchCnt}件
                            </Typography>
                        </Button>
                    </Box>

                    {/* Cancle Btn */}
                    <Button
                        mt={1}
                        sx={dialogNo}
                        onClick={() => props.handleClose(false)}
                    >
                        <ArrowBackRoundedIcon />

                        <Typography fontWeight={'bold'}>戻る</Typography>
                    </Button>
                </Box>
            </Box>
        );
    };

    const ConfirmBox = () => {
        return (
            <Box width={500} height={250} p={2}>
                <Box
                    height={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                >
                    <Box height={'100%'} sx={UpdateBorderOption}>
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography fontWeight={'bold'} fontSize={20}>
                                出荷日 :
                            </Typography>
                            <Typography fontSize={20} ml={1}>
                                {selectDate}
                            </Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography fontWeight={'bold'} fontSize={20}>
                                未処理総計：
                            </Typography>
                            <Typography fontSize={20} ml={1}>
                                {selectOption == 'パウチ'
                                    ? pouchCnt
                                    : normalCnt}
                                件
                            </Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography fontWeight={'bold'} fontSize={20}>
                                出荷作業：
                            </Typography>
                            <Typography fontSize={20} ml={1}>
                                <Typography fontSize={20}>
                                    {selectOption}
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>

                    {/* Text */}
                    <Typography
                        fontSize={20}
                        mt={1}
                        fontWeight={'bold'}
                        textAlign={'center'}
                    >
                        上の情報で出荷処理しますか？
                    </Typography>

                    {/* Button */}
                    <Box display={'flex'} gap={1} mt={1}>
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
                            <SaveRoundedIcon />
                            <Typography fontWeight={'bold'}>
                                出荷処理
                            </Typography>
                        </Button>
                        <Button
                            sx={dialogNo}
                            onClick={() => props.handleClose(false)}
                        >
                            <ArrowBackRoundedIcon />
                            <Typography fontWeight={'bold'}>戻る</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    };

    return <>{boxCount == 0 ? <CheckingBox /> : <ConfirmBox />}</>;
};
export default TXShipmentConfirmBox;
