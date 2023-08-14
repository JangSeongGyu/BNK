import { forwardRef, useImperativeHandle, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, Modal, Button, Typography, Box, Dialog } from '@mui/material';
import { green, grey, red, yellow } from '@mui/material/colors';
import {
    UpdateBorderOption,
    dialogNo,
    dialogYes,
} from '../Design/DesignOption';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CalendarChangeDialog = forwardRef((props, ref) => {
    const pageType = props.pageType;

    const [open, setOpen] = useState(false);
    const [dropInfo, SetDropInfo] = useState('');
    const [originalDate, SetOriginalDate] = useState('');
    const [changeDate, SetChangeDate] = useState('');
    const [title, SetTitle] = useState('');

    useImperativeHandle(ref, () => {
        return {
            ChangeDate(dropInfo, originalDate, changeDate) {
                SetOriginalDate(originalDate);
                SetChangeDate(changeDate);
                SetDropInfo(dropInfo);
                setOpen(true);
                SetTitle(dropInfo.event.title);
            },
        };
    });
    const ResultNo = () => {
        dropInfo.revert();
        setOpen(false);
    };
    const ResultOK = () => {
        const toastId = toast.loading('出荷日修正中...');
        axios
            .put(
                `http://192.168.150.196:8081/api/${pageType}/dailydata/${originalDate}`,
                {
                    change_date: changeDate,
                }
            )
            .then((res) => {
                toast.success('修正出来ました。', { id: toastId });
            })
            .catch((e) => {
                dropInfo.revert();
                let errMsg = '';
                if (e.respone == null) errMsg = '出荷日修正サーバー接続失敗。';
                else errMsg = e.response.data.message;
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });

        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={() => ResultNo()}>
            <Box p={2} width={600} height={350} backgroundColor="white">
                <Typography fontSize={32} mb={1} fontWeight={'bold'}>
                    出荷日修正
                </Typography>

                {/* Content */}
                <Box height={180} mb={1} sx={UpdateBorderOption}>
                    <Box display={'flex'} mb={1}>
                        <Typography fontSize={20} fontWeight={'bold'}>
                            イベント：
                        </Typography>
                        <Typography fontSize={20}>{title}</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography fontSize={20} fontWeight={'bold'}>
                            修正日付：
                        </Typography>
                        <Typography
                            backgroundColor={red[100]}
                            borderRadius={2}
                            p={1}
                            fontSize={20}
                        >
                            {originalDate}
                        </Typography>
                        <ArrowForwardIosIcon sx={{ fontSize: 32 }} />
                        <Typography
                            backgroundColor={green[200]}
                            borderRadius={2}
                            p={1}
                            fontSize={20}
                        >
                            {changeDate}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    borderColor={grey[400]}
                    fontSize={20}
                    // color={red[500]}
                    mb={1}
                    fontWeight={'bold'}
                    textAlign={'center'}
                >
                    上の情報で出荷日を修正しますか？
                </Typography>
                <Box display={'flex'} gap={2}>
                    <Button sx={dialogNo} onClick={() => ResultNo()}>
                        <ArrowBackRoundedIcon />
                        <Typography fontWeight={'bold'}>戻る</Typography>
                    </Button>
                    <Button sx={dialogYes} onClick={() => ResultOK()}>
                        <SaveAsRoundedIcon />
                        <Typography fontWeight={'bold'}>確定</Typography>
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
});
export default CalendarChangeDialog;
