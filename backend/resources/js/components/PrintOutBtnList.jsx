import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import { red } from '@mui/material/colors';
import ReactToPrint from 'react-to-print';
import LabelLayout from './LabelLayout';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');
const calendarBoxTypo = SuperMarketDesign('calendarBoxTypo');

const PrintOutBtnList = (props) => {
    const selectDate = props.selectDate;
    const componentRef = useRef();

    const ButtonClick = (e) => {};
    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Typography sx={calendarBoxTypo}>帳票出力</Typography>
            <Box>
                {/* <Typography>出荷数量:{dailyData.length}</Typography> */}
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Button onClick={(e) => ButtonClick(e)} sx={BtnOption}>
                        QRエクスポート
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button sx={BtnOption}>JOBチケット</Button>

                    <ReactToPrint
                        trigger={() => (
                            <Button sx={BtnOption}>梱包ラベル</Button>
                        )}
                        content={() => componentRef.current}
                    />

                    <Button sx={BtnOption}>山出しリスト</Button>
                </Box>
            </Box>

            {/* Printing Page  */}
            <Box position={'absolute'} sx={{ visibility: 'hidden' }}>
                <LabelLayout ref={componentRef} />
            </Box>
        </Box>
    );
};
export default PrintOutBtnList;
