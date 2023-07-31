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

const HeaderOption = () => {
    return {
        p: 1.5,
        width: '100%',
        height: 200,
        backgroundColor: blue[100],
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

const CardHeader = (props) => {
    let taskCount = 0;
    const selectDate = props.selectDate;
    let count = 0;
    let datas = props.data;
    let keys = Object.keys(datas);
    let deliCount = keys.length;

    keys.forEach((key) => {
        for (let i = 0; i < datas[key].length; i++) {
            count += parseInt(datas[key][i].数量);
        }
        taskCount += datas[key].length;
    });

    const CardHeader = (selectDate) => {
        return (
            <>
                <Box sx={HeaderOption}>
                    <Typography fontSize={40} fontWeight={'bold'}>
                        楽天スーパーマーケットＱＲ
                        <br />
                        山出しリスト
                    </Typography>
                    <Typography
                        textAlign={'right'}
                        fontSize={40}
                        fontWeight={'bold'}
                    >
                        出荷日：{selectDate}
                    </Typography>
                </Box>
            </>
        );
    };

    return (
        <>
            {CardHeader(selectDate)}
            <Box width={'100%'} backgroundColor={blue[100]} height={110}>
                <Grid container>
                    <Grid
                        sx={CardListHeaderOption}
                        textAlign={'center'}
                        item
                        xs={2}
                    >
                        佐川件数 総計
                    </Grid>

                    <Grid item xs={5}></Grid>

                    <Grid
                        sx={CardListHeaderOption}
                        textAlign={'center'}
                        item
                        xs={2.5}
                    >
                        送り先件数総計
                    </Grid>

                    <Grid
                        sx={CardListHeaderOption}
                        textAlign={'center'}
                        item
                        xs={2.5}
                    >
                        送り先枚数総計
                    </Grid>
                </Grid>

                {/* 総計BOTTOM */}
                <Grid p={1} container>
                    <Grid
                        sx={CardListOption}
                        backgroundColor={'white'}
                        textAlign={'center'}
                        item
                        xs={2}
                    >
                        {deliCount}件
                    </Grid>

                    <Grid item xs={5}></Grid>

                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        backgroundColor={'white'}
                        item
                        xs={2.5}
                    >
                        {taskCount}件
                    </Grid>

                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        backgroundColor={'white'}
                        item
                        xs={2.5}
                    >
                        {count}枚
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
export default CardHeader;
