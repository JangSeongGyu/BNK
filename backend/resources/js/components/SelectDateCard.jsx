import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');

const SelectDateCard = (props) => {
    const selectDate = props.selectDate;
    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Typography sx={{ fontSize: 20 }}>
                出荷日 <br />
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    mt: 1,
                    alignItems: 'center',
                }}
            >
                <Typography sx={{ fontWeight: 'bold', fontSize: 32, mr: 2 }}>
                    {selectDate}
                </Typography>
                <Button sx={{ border: 1, height: 40 }}>明細</Button>
            </Box>
        </Box>
    );
};
export default SelectDateCard;
