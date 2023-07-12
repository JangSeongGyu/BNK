import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';

import SelectDateCard from './SelectDateCard';
import SuperMarketDesign from '../Design/SuperMarketDesign';

const MarketSideDateList = (props) => {
    const selectDate = props.selectDate;
    const BorderOption = SuperMarketDesign('BorderOption');

    return (
        <>
            <SelectDateCard selectDate={selectDate} />
            <Box height={200} sx={BorderOption} />
        </>
    );
};
export default MarketSideDateList;
