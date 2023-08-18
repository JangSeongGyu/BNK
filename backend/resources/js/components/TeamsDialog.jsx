import { Box, Button, Dialog, Typography, css } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import teams_logo from '../images/teams_logo.png';
import { green, grey, red } from '@mui/material/colors';
import { dialogNo, dialogYes } from '../Design/DesignOption';
import { toast } from 'react-hot-toast';
import { CallTeams } from './GlobalComponent';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const TeamsDialog = (props) => {
    const [open, setOpen] = useState(false);
    const [selectOption, SetSelectOption] = useState({});
    const pageType = props.pageType;
    const selectDate = props.selectDate;
    const handleClose = () => {
        SetSelectOption({});
        setOpen(false);
    };

    const ClickConfirm = () => {
        // console.log(Object.keys(selectOption));
        // Object.keys(selectOption).forEach((key) => {
        //     if (selectOption[key] == true) toast.success(key);
        // });

        CallTeams(pageType, selectDate, '出荷指示完了');
    };

    const btnTextOption = () => {
        return {
            fontWeight: 'bold',
        };
    };

    // useEffect(() => {
    //     let cnt = 0;
    //     Object.keys(selectOption).forEach((key) => {
    //         if (selectOption[key] == true) cnt++;
    //     });

    //     if (cnt == 0) SetDisableConfirm(true);
    //     else SetDisableConfirm(false);
    // }, [selectOption]);

    // const optionHandle = (e) => {
    //     const btnId = e.target.id;
    //     if (selectOption[btnId] == true)
    //         SetSelectOption({ ...selectOption, [btnId]: false });
    //     else SetSelectOption({ ...selectOption, [btnId]: true });
    //     console.log(selectOption);
    // };

    // const selectBtnOption = (id) => {
    //     let cssOption = {};
    //     if (selectOption[id] == true) {
    //         cssOption = {
    //             backgroundColor: 'primary.main',
    //             color: 'white',
    //             border: 1,
    //             ':hover': {
    //                 backgroundColor: 'primary.main',
    //                 color: 'white',
    //             },
    //         };
    //     } else {
    //         cssOption = {
    //             backgroundColor: 'white',
    //             color: 'primary.main',
    //             border: 1,
    //             ':hover': {
    //                 backgroundColor: 'white',
    //                 color: 'primary.main',
    //             },
    //         };
    //     }

    //     const basicCss = {
    //         ...cssOption,
    //         width: '100%',
    //     };

    //     return basicCss;
    // };

    return (
        <Box>
            <Button
                onClick={() => setOpen(true)}
                sx={{
                    mt: -0.5,
                    border: 1,
                    height: 40,
                    color: 'primary.main',
                    ':hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                    },
                }}
            >
                <Box width={24} mr={0.5} component="img" src={teams_logo} />
                <Typography fontSize={20} fontWeight={'bold'}>
                    投稿
                </Typography>
            </Button>
            <Dialog open={open} onClose={() => handleClose()}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    p={2}
                    height={150}
                    width={500}
                >
                    <Box>
                        <Typography fontSize={24} fontWeight={'bold'}>
                            Teams投稿
                            <Box display={'flex'}>
                                <Typography color={red[700]} fontSize={18}>
                                    [VOD/るの]
                                </Typography>
                                <Typography fontSize={18}>
                                    Teamsに出荷指示完了を投稿しますか?
                                </Typography>
                            </Box>
                        </Typography>
                        {/* <Box borderColor={grey[500]}>
                            <Box display={'flex'} gap={1}>
                                <Button
                                    sx={selectBtnOption('るの')}
                                    id="るの"
                                    onClick={(e) => optionHandle(e)}
                                >
                                    <Typography id="るの" sx={btnTextOption}>
                                        るの
                                    </Typography>
                                </Button>
                                <Button
                                    sx={selectBtnOption('VOD')}
                                    id="VOD"
                                    onClick={(e) => optionHandle(e)}
                                >
                                    <Typography id="VOD" sx={btnTextOption}>
                                        VOD
                                    </Typography>
                                </Button>
                            </Box>
                        </Box> */}
                    </Box>
                    <Box height={'100%'}></Box>
                    <Box height={40} display={'flex'} gap={1}>
                        <Button sx={dialogNo} onClick={() => handleClose()}>
                            <ArrowBackRoundedIcon />
                            <Typography sx={btnTextOption}>戻る</Typography>
                        </Button>
                        <Button sx={dialogYes} onClick={() => ClickConfirm()}>
                            <Box
                                width={20}
                                mr={0.5}
                                component="img"
                                src={teams_logo}
                            />
                            <Typography sx={btnTextOption}>投稿</Typography>
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};
export default TeamsDialog;
