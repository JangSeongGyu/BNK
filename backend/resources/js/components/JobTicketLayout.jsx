import React, { useEffect, useState, useRef, forwardRef } from 'react';
import {
    Grid,
    Modal,
    Divider,
    Typography,
    Box,
    Button,
    CardMedia,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';

const MainHeight = 1080;
const MainWidth = MainHeight * 1.42;

const MainBoxOption = () => {
    return {
        borderTop: 1,
        borderLeft: 1,
        textAlign: 'center',
        fontSize: 20,
    };
};

const DividerOption = () => {
    return {
        mt: 2,
        fontWeight: 'bold',
        fontSize: 28,
    };
};

const ListHeaderOption = () => {
    return {
        textalign: 'center',
        backgroundColor: grey[400],
        borderBottom: 1,
        borderRight: 1,
    };
};

const ListBodyOption = () => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textalignt: 'center',
        borderBottom: 1,
        borderRight: 1,
    };
};

const JobTicketLayout = forwardRef((props, ref) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;
    const jobData = props.jobData;
    const dateName = selectDate + '発注分';

    const taxiPaper = 'OKエルカードKY14　4才　POD在庫紙';
    const taxiColor = '4c/1c';
    const taxiDivide = true;

    const BasicData = {
        supermarket: {
            title: 'スーパー_' + dateName,
            contentId: 'DD109842-01-003',
            size: '210×297',
            paper: 'アートRt-K　A4　POD保管B22025174',
            color: '4c/0c',
            divide: false,
            divideCnt: 1,
        },
        normalA6: {
            title: 'パウチなし_タクシーA6_' + dateName,
            contentId: 'DD108564-01-001',
            size: '148×105',
            paper: taxiPaper,
            color: taxiColor,
            divide: taxiDivide,
            divideCnt: 8,
            pouch: false,
        },
        normalA6P: {
            title: 'パウチあり_タクシーA6_' + dateName,
            contentId: 'DD108564-01-001',
            size: '148×105',
            paper: taxiPaper,
            color: taxiColor,
            divide: taxiDivide,
            divideCnt: 8,
            pouch: true,
        },
        normal10: {
            title: 'パウチなし_タクシー10×10_' + dateName,
            contentId: 'DD108460-01-001',
            size: '100×100',
            paper: taxiPaper,
            color: taxiColor,
            divide: taxiDivide,
            divideCnt: 12,
            pouch: false,
        },
        normal10P: {
            title: 'パウチあり_タクシー10×10_' + dateName,
            contentId: 'DD108460-01-001',
            size: '100×100',
            paper: taxiPaper,
            color: taxiColor,
            divide: taxiDivide,
            divideCnt: 12,
            pouch: true,
        },
        eaglesA6: {
            title: 'パウチなし_イーグルスA6_' + dateName,
            contentId: 'DD107768-01-002',
            size: '148×105',
            paper: taxiPaper,
            color: taxiColor,
            divide: taxiDivide,
            divideCnt: 8,
            pouch: false,
        },
        eaglesA6P: {
            title: 'パウチあり_イーグルスA6_' + dateName,
            contentId: 'DD107768-01-002',
            size: '148×105',
            paper: taxiPaper,
            color: taxiColor,
            divide: taxiDivide,
            divideCnt: 8,
            pouch: true,
        },
        eagles10: {
            title: 'パウチなし_イーグルス10x10_' + dateName,
            contentId: 'DD107769-01-002',
            size: '100×100',
            paper: taxiPaper,
            color: taxiColor,
            divide: taxiDivide,
            divideCnt: 12,
            pouch: false,
        },
        eagles10P: {
            title: 'パウチあり_イーグルス10x10_' + dateName,
            contentId: 'DD107769-01-002',
            size: '100×100',
            paper: taxiPaper,
            color: taxiColor,
            divide: taxiDivide,
            divideCnt: 12,
            pouch: true,
        },
    };

    const TopLayout = (basicData, groupData) => {
        return (
            <>
                <Grid sx={MainBoxOption} width={'100%'} container>
                    <Grid sx={ListHeaderOption} item xs={6}>
                        品名
                    </Grid>
                    <Grid sx={ListHeaderOption} item xs={2}>
                        数量
                    </Grid>
                    <Grid sx={ListHeaderOption} item xs={2}>
                        頭紙
                    </Grid>
                    <Grid sx={ListHeaderOption} item xs={2}>
                        サイズ
                    </Grid>
                    {/* BODY ----------------------------------------------- */}
                    <Grid sx={ListBodyOption} fontSize={28} item xs={6}>
                        {basicData.title}
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={2}>
                        {groupData['paperCount'] + groupData['shopCount']}
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={2}>
                        {groupData['shopCount']}
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={2}>
                        {basicData.size}
                    </Grid>
                    {/* ----------------------------------------------------- */}
                    <Grid container>
                        <Grid sx={ListHeaderOption} item xs={6}>
                            コンテンツID
                        </Grid>
                        <Grid sx={ListHeaderOption} item xs={6}>
                            受注番号
                        </Grid>
                        {/* BODY ----------------------------------------------*/}
                        <Grid sx={ListBodyOption} item xs={6}>
                            {basicData.contentId}
                        </Grid>
                        <Grid sx={ListBodyOption} item xs={6}>
                            {groupData.detailNumber}
                        </Grid>
                    </Grid>
                </Grid>
                {/* Bottom */}
            </>
        );
    };

    const BottomLayout = (basicData) => {
        return (
            <Grid sx={MainBoxOption} width={'100%'} container>
                <Grid sx={ListHeaderOption} item xs={4}>
                    印刷機
                </Grid>
                <Grid sx={ListHeaderOption} item xs={4}>
                    色数
                </Grid>

                <Grid sx={ListHeaderOption} item xs={4}>
                    面付
                </Grid>
                {/* BODY */}

                <Grid sx={ListBodyOption} item xs={4}>
                    PC1120
                </Grid>

                <Grid sx={ListBodyOption} item xs={4}>
                    {basicData.color}
                </Grid>

                <Grid sx={ListBodyOption} item xs={4}>
                    {basicData.divideCnt}
                </Grid>
                <Grid container>
                    <Grid sx={ListHeaderOption} item xs={6}>
                        加工機
                    </Grid>
                    <Grid sx={ListHeaderOption} item xs={6}>
                        用紙
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={6}>
                        {basicData.divide && '断裁'}
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={6}>
                        {basicData.paper}
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    const ScheduleLayout = (basicData) => {
        return (
            <Grid sx={MainBoxOption} width={'100%'} container>
                <Grid sx={ListHeaderOption} item xs={2}>
                    下阪
                </Grid>
                <Grid sx={ListHeaderOption} item xs={2}>
                    印刷
                </Grid>
                <Grid sx={ListHeaderOption} item xs={2}>
                    断裁
                </Grid>
                <Grid sx={ListHeaderOption} item xs={2}>
                    移動
                </Grid>
                <Grid sx={ListHeaderOption} item xs={2}>
                    アセンブリ
                </Grid>
                <Grid sx={ListHeaderOption} item xs={2}>
                    出荷
                </Grid>

                {/* ===========================Body===================== */}
                <Grid sx={ListBodyOption} item xs={2}>
                    金曜日 13時
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    金曜日
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    {basicData.divide && '金曜日'}
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    月曜日
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    月曜日
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    {basicData.pouch ? '火曜日' : '月曜日'}
                </Grid>
            </Grid>
        );
    };

    const Cards = (basicData, groupData) => {
        return (
            <Box p={4} width={MainWidth} height={MainHeight}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    p={4}
                    width={'100%'}
                    height={'100%'}
                    border={3}
                >
                    <Box textAlign={'center'} fontSize={40} fontWeight={'bold'}>
                        Jobチケット
                    </Box>
                    <Box sx={DividerOption}>情報</Box>
                    {TopLayout(basicData, groupData)}
                    <Box sx={DividerOption}>生産</Box>
                    {BottomLayout(basicData)}

                    <Box display={'flex'}>
                        <Box sx={DividerOption}>基本スケジュール</Box>{' '}
                        <Box ml={2} color={red[500]} fontSize={16} mt={'auto'}>
                            基本毎週水曜入稿、金曜13時下版、月出荷　祝日、長期休みの変動あり
                        </Box>
                    </Box>
                    {ScheduleLayout(basicData)}
                </Box>
            </Box>
        );
    };

    const Pages = () => {
        //
        if (pageType == 'supermarket') {
            if (jobData.length > 0) {
                let countData = {
                    paperCount: 0,
                    shopCount: 0,
                    detailNumber: jobData[0].受注番号,
                };
                jobData.forEach((data) => {
                    countData['paperCount'] += parseInt(data.数量);
                    countData['shopCount'] += 1;
                });
                return <>{Cards(BasicData['supermarket'], countData)}</>;
            }
        } else if (pageType == 'taxi') {
            let html = [];
            let groupData = {};

            // Grouping
            Object.keys(jobData).forEach((key) => {
                if (jobData[key].length == 0) return;
                jobData[key].forEach((data) => {
                    let basicKey = key;
                    if (data.パウチ == 1) basicKey += 'P';

                    console.log(basicKey, data);
                    if (!groupData[basicKey])
                        groupData[basicKey] = {
                            paperCount: 0,
                            shopCount: 0,
                            detailNumber: data.受注番号,
                        };

                    groupData[basicKey]['paperCount'] += parseInt(data.数量);
                    groupData[basicKey]['shopCount'] += 1;
                });
            });

            console.log('groupData', groupData);

            Object.keys(groupData).forEach((key) => {
                html.push(Cards(BasicData[key], groupData[key]));
            });
            return html;
        }
    };

    return (
        <Box ref={ref}>
            <Pages />
        </Box>
    );
});
export default JobTicketLayout;
