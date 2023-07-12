import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import { red } from '@mui/material/colors';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');

const BizlogiBtnList = (props) => {
    const selectDate = props.selectDate;
    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Typography
                sx={{ fontWeight: 'bold', fontSize: 24, color: red[500] }}
            >
                Bizlogi処理
            </Typography>
            <Box
                mt={1}
                gap={1}
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Button sx={BtnOption}>Bizlogiエクスポート</Button>
                <Button sx={BtnOption}>Bizlogiインポート</Button>
            </Box>
        </Box>
    );
};

export default BizlogiBtnList;
