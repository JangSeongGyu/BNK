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

const MainBoxOption = (props) => {
    return {
        borderTop: 1,
        borderLeft: 1,
        textAlign: 'center',
        fontSize: 20,
    };
};

const ListHeaderOption = () => {
    return {
        textalign: 'center',
        backgroundColor: grey[300],
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
    const [ticketData, SetTicketData] = useState([]);

    useEffect(() => {
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    '/api/supermarket/jobticket/' +
                    selectDate
            )
            .then((res) => {
                console.log(res.data);
                SetTicketData(res.data);
            });
    }, []);

    const TopLayout = () => {
        return (
            <>
                <Grid sx={MainBoxOption} width={'100%'} container>
                    <Grid sx={ListHeaderOption} item xs={8}>
                        品名
                    </Grid>
                    <Grid sx={ListHeaderOption} item xs={2}>
                        数量
                    </Grid>
                    <Grid sx={ListHeaderOption} item xs={2}>
                        サイズ
                    </Grid>
                    {/* BODY */}
                    <Grid sx={ListBodyOption} fontSize={28} item xs={8}>
                        スーパー {selectDate}発注分
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={2}>
                        204
                    </Grid>
                    <Grid sx={ListBodyOption} item xs={2}>
                        210×297
                    </Grid>
                    {/* ---------------------- */}
                    <Grid container>
                        <Grid sx={ListHeaderOption} item xs={4}>
                            コンテンツID
                        </Grid>
                        <Grid sx={ListHeaderOption} item xs={4}>
                            受注番号
                        </Grid>
                        <Grid sx={ListHeaderOption} item xs={4}>
                            問い合わせ番号
                        </Grid>
                        {/* BODY */}
                        <Grid sx={ListBodyOption} item xs={4}>
                            DD109842-01-003
                        </Grid>
                        <Grid sx={ListBodyOption} item xs={4}>
                            123123213121
                        </Grid>

                        <Grid sx={ListBodyOption} item xs={4}>
                            B99999999
                        </Grid>
                    </Grid>
                </Grid>
                {/* Bottom */}
            </>
        );
    };

    const PaperLayout = () => {
        return (
            <Box sx={MainBoxOption} textAlign={'center'} width={'100%'}>
                <Box sx={ListHeaderOption}>用紙</Box>
                <Box sx={ListBodyOption}> アート90</Box>
            </Box>
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
                    加工機
                </Grid>
                {/* BODY */}
                <Grid sx={ListBodyOption} item xs={4}>
                    PC1120
                </Grid>
                <Grid sx={ListBodyOption} item xs={4}>
                    4c/0c
                </Grid>
                <Grid sx={ListBodyOption} item xs={4}></Grid>
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
                    0
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    0
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    0
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    0
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    0
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    0
                </Grid>
            </Grid>
        );
    };
    return (
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
                gap={2}
                p={4}
                width={'100%'}
                height={'100%'}
                border={3}
            >
                <TopLayout />
                <PaperLayout />
                <BottomLayout />
                <ScheduleLayout />
            </Box>
        </Box>
    );
});
export default JobTicketLayout;
