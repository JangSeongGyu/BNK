import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import { red } from '@mui/material/colors';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');

const PrintOutBtnList = (props) => {
    const selectDate = props.selectDate;
    const ButtonClick = () => {};
    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Typography
                sx={{ fontWeight: 'bold', fontSize: 24, color: red[500] }}
            >
                帳票出力
            </Typography>
            <Box>
                {/* <Typography>出荷数量:{dailyData.length}</Typography> */}
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Button onClick={() => ButtonClick()} sx={BtnOption}>
                        QRエクスポート
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button sx={BtnOption}>JOBチケット</Button>
                    <Button sx={BtnOption}>梱包ラベル</Button>
                    <Button sx={BtnOption}>山出しリスト</Button>
                </Box>
            </Box>
        </Box>
    );
};
export default PrintOutBtnList;
