import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import { red } from '@mui/material/colors';
import axios from 'axios';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');
const calendarBoxTypo = SuperMarketDesign('calendarBoxTypo');

const BizlogiBtnList = (props) => {
    const selectDate = props.selectDate;
    const BtnRef = useRef();

    const exportData = () => {
        console.log(BtnRef);
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    '/api/supermarket/bizlogi/' +
                    selectDate
            )
            .then((res) => {
                let hcsv = '';

                let keys = Object.keys(res.data[0]);
                keys.forEach((key) => {
                    hcsv = hcsv + '"' + key + '",';
                });
                hcsv = hcsv.substring(0, hcsv.length - 1) + '\n';

                res.data.forEach((data) => {
                    let vcsv = '';
                    keys.forEach((key) => {
                        if (data[key] != null)
                            vcsv = vcsv + '"' + data[key] + '",';
                        else vcsv = vcsv + '"",';
                    });
                    vcsv = vcsv.substring(0, vcsv.length - 1) + '\n';
                    hcsv = hcsv + vcsv;
                });

                console.log(hcsv);

                const element = document.createElement('a');
                const file = new Blob([hcsv], {
                    type: 'text/plain;charset=utf-8',
                });
                element.href = URL.createObjectURL(file);
                element.download = 'bizlogi_' + selectDate + '.csv';
                document.body.appendChild(element);
                element.click();
            });
    };

    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Typography sx={calendarBoxTypo}>Bizlogi処理</Typography>
            <Box
                mt={1}
                gap={1}
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Button onClick={() => exportData()} sx={BtnOption}>
                    Bizlogiエクスポート
                </Button>
                <Button sx={BtnOption}>Bizlogiインポート</Button>
            </Box>
        </Box>
    );
};

export default BizlogiBtnList;
