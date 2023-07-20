import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');
const calendarBoxTypo = SuperMarketDesign('calendarBoxTypo');

const SelectDateCard = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;
    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Typography sx={calendarBoxTypo}>
                出荷日 <br />
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    mt: 1,
                    alignItems: 'center',
                }}
            >
                <Typography sx={{ color: '', fontSize: 40 }}>
                    {selectDate}
                </Typography>
                {/* <Button sx={{ border: 1, height: 40 }}>明細</Button> */}
            </Box>
        </Box>
    );
};
export default SelectDateCard;
