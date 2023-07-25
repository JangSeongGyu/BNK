import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';

const CardListOption = () => {
    return {
        px: 2,
        fontSize: 30,
        fontWeight: 'bold',
    };
};

const CardListHeaderOption = () => {
    return {
        fontSize: 20,
        fontWeight: 'bold',
        Color: grey[500],
        px: 2,
    };
};

const ListHeader = (props) => {
    const data = props.data;
    const selectDate = props.selectDate;
    // 送り先　TOP　LAYOUT
    const HeaderTop = () => {
        return (
            <Grid alignItems={'center'} height={40} container width={'100%'}>
                <Grid
                    fontSize={30}
                    fontWeight={'bold'}
                    textAlign={'center'}
                    item
                    xs={1}
                ></Grid>
                <Grid sx={CardListHeaderOption} item xs={8}>
                    送り先名
                </Grid>
                <Grid
                    sx={CardListHeaderOption}
                    textAlign={'center'}
                    item
                    xs={1.5}
                >
                    件数合計
                </Grid>
                <Grid
                    sx={CardListHeaderOption}
                    textAlign={'center'}
                    item
                    xs={1.5}
                >
                    枚数合計
                </Grid>
            </Grid>
        );
    };

    // 送り先　BOTTOM　Layout
    const HeaderBottom = (datas) => {
        let taskCount = 0;
        let count = 0;

        datas.forEach((data) => {
            count += parseInt(data.数量);
        });

        taskCount = datas.length;

        return (
            <Box
                borderRight={1}
                borderLeft={1}
                borderColor={grey[400]}
                backgroundColor={grey[200]}
                display={'flex'}
                width={'100%'}
            >
                <Grid
                    alignItems={'center'}
                    borderBottom={1}
                    borderColor={grey[400]}
                    container
                    width={'100%'}
                >
                    {HeaderTop()}
                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        item
                        xs={1}
                    ></Grid>

                    <Grid sx={CardListOption} item xs={8}>
                        {datas[0].納品先会社名}
                    </Grid>
                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        item
                        xs={1.5}
                    >
                        {taskCount}件
                    </Grid>
                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        item
                        xs={1.5}
                    >
                        {count}枚
                    </Grid>
                </Grid>
            </Box>
        );
    };

    const CHeader = () => {
        let html = [];
        html.push(HeaderBottom(data));
        return html;
    };

    return <CHeader />;
};
export default ListHeader;
