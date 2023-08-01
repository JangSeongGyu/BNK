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
import axios from 'axios';

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
    const [ticketData, SetTicketData] = useState([]);
    const [basicData, SetBasicData] = useState({});
    const [count, SetCount] = useState(0);

    useEffect(() => {
        let cnt = 0;
        if (pageType == 'supermarket') {
            SetBasicData({
                name: 'スーパー' + [selectDate] + '発注分',
                contentId: 'DD109842-01-003',
            });
        }

        axios.get(`/api/${pageType}/jobticket/` + selectDate).then((res) => {
            SetTicketData(res.data);

            res.data.forEach((data) => {
                cnt += parseInt(data.数量);
            });
            SetCount(cnt + res.data.length);
        });
    }, []);

    const TopLayout = () => {
        return (
            <>
                <Grid sx={MainBoxOption} width={'100%'} container>
                    <Grid sx={ListHeaderOption} item xs={6}>
                        品名
                    </Grid>
                    <Grid sx={ListHeaderOption} item xs={2}>
                        数量
                    </Grid>{' '}
                    <Grid sx={ListHeaderOption} item xs={2}>
                        頭紙
                    </Grid>
                    <Grid sx={ListHeaderOption} item xs={2}>
                        サイズ
                    </Grid>
                    {/* BODY ----------------------------------------------- */}
                    <Grid sx={ListBodyOption} fontSize={28} item xs={6}>
                        {basicData.name}
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={2}>
                        {count}
                    </Grid>{' '}
                    <Grid sx={ListBodyOption} item xs={2}>
                        {ticketData.length}
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={2}>
                        210×297
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
                            {ticketData.length > 0 && ticketData[0].受注番号}
                        </Grid>
                    </Grid>
                </Grid>
                {/* Bottom */}
            </>
        );
    };

    const BottomLayout = () => {
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
                    4c/0c
                </Grid>

                <Grid sx={ListBodyOption} item xs={4}>
                    1
                </Grid>
                <Grid container>
                    <Grid sx={ListHeaderOption} item xs={6}>
                        加工機
                    </Grid>
                    <Grid sx={ListHeaderOption} item xs={6}>
                        用紙
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={6}></Grid>
                    <Grid sx={ListBodyOption} item xs={6}>
                        アートRt-K　A4　POD保管B22025174
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    const ScheduleLayout = () => {
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
                <Grid sx={ListBodyOption} item xs={2}></Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    月曜日
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    月曜日
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    月曜日
                </Grid>
            </Grid>
        );
    };

    return (
        <>
            <Box
                // gap={3}
                p={4}
                width={MainWidth}
                height={MainHeight}
                ref={ref}
            >
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
                    <TopLayout />
                    <Box sx={DividerOption}>生産</Box>
                    <BottomLayout />

                    <Box display={'flex'}>
                        <Box sx={DividerOption}>基本スケジュール</Box>{' '}
                        <Box ml={2} color={red[500]} fontSize={16} mt={'auto'}>
                            基本毎週水曜入稿、金曜13時下版、月出荷　祝日、長期休みの変動あり
                        </Box>
                    </Box>
                    <ScheduleLayout />
                </Box>
            </Box>
        </>
    );
});
export default JobTicketLayout;
