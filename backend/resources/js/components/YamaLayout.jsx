import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';

const MainWidth = 1080;
const MainHeight = MainWidth * 1.4142;

const MainCardOption = () => {
    return {
        width: '100%',
        display: 'flex',
        borderBottom: 1,
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

const HeaderListOption = () => {
    return { fontSize: 20, borderRight: 1, px: 2, borderColor: grey[400] };
};

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

const SceneCardOption = () => {
    return {
        fontSize: 18,
        px: 2,
        borderRight: 1,
        borderColor: grey[400],
        textAlign: 'center',
    };
};

const YamaLayout = forwardRef((props, ref) => {
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
                <Grid
                    borderBottom={1}
                    borderTop={1}
                    borderColor={grey[400]}
                    alignItems={'center'}
                    height={40}
                    container
                    width={'100%'}
                >
                    <Grid
                        sx={HeaderListOption}
                        textAlign={'center'}
                        item
                        xs={1}
                    >
                        No.
                    </Grid>
                    <Grid
                        textAlign={'center'}
                        sx={HeaderListOption}
                        item
                        xs={2}
                    >
                        店舗コード
                    </Grid>
                    <Grid sx={HeaderListOption} item xs={7}>
                        店舗名
                    </Grid>
                    <Grid
                        sx={HeaderListOption}
                        textAlign={'center'}
                        item
                        xs={2}
                    >
                        数量
                    </Grid>
                </Grid>
            </>
        );
    };

    // 送り先　TOP　LAYOUT
    const CardListHeader = (number) => {
        return (
            <Grid alignItems={'center'} height={40} container width={'100%'}>
                <Grid
                    fontSize={30}
                    fontWeight={'bold'}
                    textAlign={'center'}
                    item
                    xs={1}
                >
                    {number}
                </Grid>
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
    const Card = (number) => {
        return (
            <Box backgroundColor={grey[200]} display={'flex'} width={'100%'}>
                <Grid
                    alignItems={'center'}
                    borderBottom={1}
                    borderColor={grey[400]}
                    container
                    width={'100%'}
                >
                    {CardListHeader(number)}
                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        item
                        xs={1}
                    ></Grid>

                    <Grid sx={CardListOption} item xs={8}>
                        株式会社フォーシーズ ピザーラ 松山枝松店
                    </Grid>
                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        item
                        xs={1.5}
                    >
                        1件
                    </Grid>
                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        item
                        xs={1.5}
                    >
                        20枚
                    </Grid>
                </Grid>
            </Box>
        );
    };

    // SCENE LAYOUT
    const SceneCard = () => {
        return (
            <Grid
                borderBottom={1}
                borderColor={grey[400]}
                height={40}
                alignItems={'center'}
                container
                width={'100%'}
            >
                <Grid sx={SceneCardOption} textAlign={'center'} item xs={1}>
                    →
                </Grid>
                <Grid sx={SceneCardOption} textAlign={'center'} item xs={2}>
                    ショップコード
                </Grid>
                <Grid sx={SceneCardOption} item xs={2}>
                    シーンコード
                </Grid>
                <Grid sx={SceneCardOption} item xs={5}>
                    シーン名
                </Grid>
                <Grid sx={SceneCardOption} textAlign={'center'} item xs={2}>
                    数量
                </Grid>
            </Grid>
        );
    };

    // 総計Layout
    const LastCard = (number) => {
        return (
            <Box p={1} width={'100%'} backgroundColor={blue[100]} height={110}>
                <Grid container>
                    <Grid
                        sx={CardListHeaderOption}
                        textAlign={'center'}
                        item
                        xs={2}
                    >
                        佐川件数 総計
                    </Grid>

                    <Grid item xs={7}></Grid>

                    <Grid
                        sx={CardListHeaderOption}
                        textAlign={'center'}
                        item
                        xs={1.5}
                    >
                        件数総計
                    </Grid>

                    <Grid
                        sx={CardListHeaderOption}
                        textAlign={'center'}
                        item
                        xs={1.5}
                    >
                        枚数総計
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
                        {number}件
                    </Grid>

                    <Grid item xs={7}></Grid>

                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        backgroundColor={'white'}
                        item
                        xs={1.5}
                    >
                        3件
                    </Grid>

                    <Grid
                        sx={CardListOption}
                        textAlign={'center'}
                        backgroundColor={'white'}
                        item
                        xs={1.5}
                    >
                        23枚
                    </Grid>
                </Grid>
            </Box>
        );
    };

    const Cards = () => {
        let html = [];
        let length = 5;
        let selectDate = '2023-07-20';

        html.push(CardHeader(selectDate));
        for (let i = 1; i <= length; i++) {
            html.push(Card(i));
            for (let j = 1; j <= i; j++) html.push(SceneCard());
        }
        html.push(LastCard(length));

        return html;
    };

    return (
        <Box width={MainWidth} height={MainHeight} ref={ref}>
            <Cards />
        </Box>
    );
});
export default YamaLayout;
