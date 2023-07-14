import React, { useEffect, useState, useRef } from 'react';
import SelectDateCard from './SelectDateCard';
import { Box, Button, Dialog, Typography } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import axios from 'axios';
import { green, red } from '@mui/material/colors';

const MarketOutSideList = (props) => {
    const selectDate = props.selectDate;
    const logDatas = props.logDatas;
    const BorderOption = SuperMarketDesign('BorderOption');

    const ShipmentClick = () => {
        axios
            .put(
                import.meta.env.VITE_DOMAIN +
                    '/api/supermarket/shipment/' +
                    selectDate
            )
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <Box width={500} height={150} p={2}>
            <Box
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
            >
                <Typography sx={{ fontSize: 20 }}>
                    {' '}
                    出荷日：{selectDate}
                    <br />
                    未処理案件：{logDatas}件
                </Typography>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    gap={1}
                    mt={1}
                >
                    <Button
                        onClick={() => ShipmentClick()}
                        // border={1}
                        sx={{
                            width: '50%',
                            border: 1,
                            color: green[700],
                            backgroundColor: 'white',
                        }}
                    >
                        出荷処理
                    </Button>
                    <Button
                        sx={{
                            width: '50%',
                            border: 1,
                            color: red[700],
                            backgroundColor: 'white',
                        }}
                        onClick={() => props.handleClose()}
                    >
                        戻る
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
export default MarketOutSideList;
