import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import {
    BorderOption,
    BtnOption,
    ListTitleOption,
} from '../Design/DesignOption';
import { Navigate, useNavigate } from 'react-router-dom';

const SelectDateCard = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;
    const navigate = useNavigate();

    const DetailClick = () => {
        localStorage.setItem('LastSelectDate', selectDate);
        navigate(`/${pageType}/detail/${selectDate}`);
    };
    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Typography sx={ListTitleOption}>
                出荷日 <br />
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography sx={{ fontWeight: 'bold', fontSize: 32 }}>
                    {selectDate}
                </Typography>
                <Box ml={2}>
                    <Button onClick={() => DetailClick()} sx={BtnOption}>
                        明細
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
export default SelectDateCard;
