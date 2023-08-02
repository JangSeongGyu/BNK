import { forwardRef, useImperativeHandle, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, Modal, Button, Typography, Box, Dialog } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { dialogNo, dialogYes } from '../Design/DesignOption';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const CalendarChangeDialog = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [dropInfo, SetDropInfo] = useState('');
    const [start, SetStart] = useState('');
    const [end, SetEnd] = useState('');
    const [title, SetTitle] = useState('');
    useImperativeHandle(ref, () => {
        return {
            ChangeDate(dropInfo, start, end) {
                SetStart(start);
                SetEnd(end);
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
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={() => ResultNo()}>
            <Box p={2} width={600} height={350} backgroundColor="white">
                <Typography
                    // borderBottom={1}
                    // borderColor={grey[400]}
                    fontSize={40}
                    fontWeight={'bold'}
                >
                    出荷日修正
                </Typography>

                <Box px={2} py={4} mb={1} border={1} borderColor={grey[400]}>
                    <Box display={'flex'} mb={1}>
                        <Typography fontSize={24} fontWeight={'bold'}>
                            イベント：
                        </Typography>
                        <Typography fontSize={24}>{title}</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography fontSize={24} fontWeight={'bold'}>
                            修正日付：
                        </Typography>
                        <Typography
                            backgroundColor={grey[300]}
                            borderRadius={2}
                            p={1}
                            fontSize={24}
                        >
                            {start}
                        </Typography>
                        <ArrowForwardIosIcon sx={{ fontSize: 32 }} />
                        <Typography
                            backgroundColor={green[200]}
                            borderRadius={2}
                            p={1}
                            fontSize={24}
                        >
                            {end}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    borderColor={grey[400]}
                    fontSize={20}
                    // color={red[500]}
                    mb={1}
                    textAlign={'center'}
                >
                    上の情報で出荷日を修正しますか？
                </Typography>
                <Box display={'flex'} gap={2}>
                    <Button sx={dialogNo} onClick={() => ResultNo()}>
                        <ArrowBackRoundedIcon />
                        戻る
                    </Button>
                    <Button sx={dialogYes} onClick={() => ResultOK()}>
                        <SaveAsRoundedIcon />
                        確定
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
});
export default CalendarChangeDialog;
