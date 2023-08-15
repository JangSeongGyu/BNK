import React, { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Box,
    Button,
    Divider,
    TextField,
    Input,
    InputAdornment,
    FormControl,
    InputLabel,
} from '@mui/material';
import { green, grey, pink, red } from '@mui/material/colors';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BtnOption } from '../Design/DesignOption';
import MasterMonthDialog from '../components/MasterComponent/MasterMonthDialog';
import Header from '../components/HeaderCompnent/Header';

const InputOption = () => {
    return {
        // backgroundColor: grey[200],
        // border: 1,
        // borderRadius: 2,
        // width: 500,
    };
};

const Master = (props) => {
    const pageType = props.pageType;
    const [textData, SetTextData] = useState({});
    const dialogRef = useRef();

    return (
        <Box
            backgroundColor={grey[200]}
            display={'flex'}
            flexDirection={'column'}
            height={'100%'}
            width={'100%'}
        >
            <Header page={1} pageType={pageType} />
            <Box
                backgroundColor={'white'}
                height={'100%'}
                m={2}
                p={2}
                border={1}
                borderColor={grey[500]}
                boxShadow={1}
                borderRadius={2}
            >
                <Typography
                    borderBottom={1}
                    borderColor={grey[400]}
                    fontSize={40}
                    fontWeight={'bold'}
                    mb={2}
                >
                    マスタ登録
                </Typography>
                <Box width={200}>
                    <Button
                        onClick={() => {
                            dialogRef.current.handleClickOpen(true);
                        }}
                        sx={BtnOption}
                        height={'20%'}
                    >
                        月次登録
                    </Button>
                </Box>
                <MasterMonthDialog ref={dialogRef} pageType={pageType} />
            </Box>
        </Box>
    );
};
export default Master;
