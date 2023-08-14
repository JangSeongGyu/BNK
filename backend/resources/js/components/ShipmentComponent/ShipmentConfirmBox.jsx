import { Box, Button, Dialog, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
    dialogNo,
    dialogYes,
    UpdateBorderOption,
} from '../../Design/DesignOption';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ShipmentConfirmBox = (props) => {
    const selectDate = props.selectDate;
    const logDatas = props.logDatas;
    const pageType = props.pageType;

    const ShipmentClick = () => {
        const toastId = toast.loading('サーバ接続中...');
        axios
            .put(
                `http://192.168.150.196:8081/api/${pageType}/shipment/` +
                    selectDate
            )
            .then((res) => {
                toast.success('出荷処理しました。', { id: toastId });
                props.handleClose(true);
            })
            .catch((e) => {
                let errMsg = '';
                if (e.respone == null) {
                    errMsg = '出荷処理サーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    };

    return (
        <Box width={500} height={250} p={2}>
            <Box
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
            >
                {/* Content */}
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
                            {logDatas.件数}件
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
                <Box display={'flex'} gap={2} mt={1}>
                    <Button onClick={() => ShipmentClick()} sx={dialogYes}>
                        <SaveRoundedIcon />
                        <Typography fontWeight={'bold'}>出荷処理</Typography>
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
export default ShipmentConfirmBox;
