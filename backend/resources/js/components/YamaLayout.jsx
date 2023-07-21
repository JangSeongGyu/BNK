import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import axios from 'axios';

const MainWidth = 1058;
const MainHeight = 1497;

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
    };
};

const YamaLayout = forwardRef((props, ref) => {
    const pageType = props.pageType;
    const selectDate = props.selectDate;
    const [groupData, SetGroupData] = useState([]);

    useEffect(() => {
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    `/api/${pageType}/totalpick/` +
                    selectDate
            )
            .then((res) => {
                GroupingData(res.data);
            });
    }, []);

    const GroupingData = (datas) => {
        let groupData = {};
        datas.forEach((data) => {
            let key = data.納品先会社名;
            if (!groupData[key]) {
                groupData[key] = [];
            }
            groupData[key].push(data);
        });

        console.log('group', groupData);
        SetGroupData(groupData);
    };
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
                {/* <Grid
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
                </Grid> */}
            </>
        );
    };

    // 送り先　TOP　LAYOUT
    const CardListHeader = () => {
        return (
            <Grid alignItems={'center'} height={40} container width={'100%'}>
                <Grid
                    fontSize={30}
                    fontWeight={'bold'}
                    textAlign={'center'}
                    item
                    xs={1}
                >
                    {}
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
    const Card = (datas) => {
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
                    {CardListHeader()}
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

    // SCENE LAYOUT
    const SceneCard = (data) => {
        return (
            <Grid
                borderBottom={1}
                borderRight={1}
                borderLeft={1}
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
                    {data.ショップコード}
                </Grid>
                <Grid sx={SceneCardOption} item xs={7}>
                    {data.シーン名}
                </Grid>
                <Grid fontSize={20} textAlign={'center'} item xs={2}>
                    {data.数量}枚
                </Grid>
            </Grid>
        );
    };

    // 総計Layout
    const LastCard = (datas) => {
        let taskCount = 0;
        let count = 0;
        let keys = Object.keys(datas);
        console.log('last', keys);
        taskCount = keys.length;

        keys.forEach((key) => {
            for (let i = 0; i < datas[key].length; i++) {
                count += parseInt(datas[key][i].数量);
            }
        });

        return (
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
                        {taskCount}件
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
        );
    };

    const Cards = () => {
        let html = [];

        let heightCnt = 340;
        let insertHeight = 0;
        html.push(CardHeader(selectDate));
        html.push(LastCard(groupData));
        let keys = Object.keys(groupData);

        keys.forEach((key) => {
            let length = groupData[key].length;

            insertHeight = 86 + length * 40;
            if (heightCnt + insertHeight > MainHeight - 100) {
                html.push(
                    <Box
                        borderBottom={1}
                        pb={4}
                        borderColor={grey[400]}
                        height={MainHeight - heightCnt}
                    ></Box>
                );
                heightCnt = 0;
            }

            html.push(Card(groupData[key]));

            for (let i = 0; i < length; i++)
                html.push(SceneCard(groupData[key][i]));

            heightCnt += insertHeight;
            insertHeight = 0;
        });

        return html;
    };

    return (
        <Box p={4} width={MainWidth} height={MainHeight} ref={ref}>
            <Box>
                <Cards />
            </Box>
        </Box>
    );
});
export default YamaLayout;
