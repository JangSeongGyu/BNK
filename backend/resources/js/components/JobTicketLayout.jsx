import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Grid, Modal, Typography, Box, Button, CardMedia } from '@mui/material';
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
        textalignt: 'center',
        borderBottom: 1,
        borderRight: 1,
    };
};

const JobTicketLayout = forwardRef((props, ref) => {
    const TopLayout = () => {
        return (
            <Grid sx={MainBoxOption} width={'50%'} container>
                <Grid sx={ListHeaderOption} item xs={8}>
                    品名
                </Grid>
                <Grid sx={ListHeaderOption} item xs={2}>
                    数量
                </Grid>
                <Grid sx={ListHeaderOption} item xs={2}>
                    サイズ
                </Grid>
                <Grid sx={ListBodyOption} item xs={8}>
                    スーパー yyyymmdd発注分
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    204
                </Grid>
                <Grid sx={ListBodyOption} item xs={2}>
                    210×297
                </Grid>
                <Grid sx={ListHeaderOption} item xs={8}>
                    コンテンツID
                </Grid>
                <Grid sx={ListHeaderOption} item xs={4}>
                    受注番号
                </Grid>
                <Grid sx={ListBodyOption} item xs={8}>
                    DD109842-01-003
                </Grid>
                <Grid sx={ListBodyOption} item xs={4}>
                    B99999999
                </Grid>
            </Grid>
        );
    };

    const PaperLayout = () => {
        return (
            <Box sx={MainBoxOption} textAlign={'center'} width={'50%'}>
                <Box sx={ListHeaderOption}>用紙</Box>
                <Box sx={ListBodyOption}> アート90</Box>
            </Box>
        );
    };
    const BottomLayout = () => {
        return (
            <Grid sx={MainBoxOption} width={'50%'} container>
                <Grid sx={ListHeaderOption} item xs={4}>
                    印刷機
                </Grid>
                <Grid sx={ListHeaderOption} item xs={4}>
                    色数
                </Grid>
                <Grid sx={ListHeaderOption} item xs={4}>
                    加工機
                </Grid>
                <Grid sx={ListBodyOption} item xs={4}>
                    PC1120
                </Grid>
                <Grid sx={ListBodyOption} item xs={4}>
                    4c/0c
                </Grid>
                <Grid sx={ListBodyOption} item xs={4}>
                    ?
                </Grid>
            </Grid>
        );
    };

    const ScheduleLayout = () => {
        return (
            <Box sx={MainBoxOption} width={901} display={'flex'}>
                <Box>
                    <Box width={150} sx={ListHeaderOption}>
                        下阪
                    </Box>
                    <Box width={150} sx={ListBodyOption}>
                        0
                    </Box>
                </Box>
                <Box>
                    <Box width={150} sx={ListHeaderOption}>
                        印刷
                    </Box>
                    <Box width={150} sx={ListBodyOption}>
                        0
                    </Box>
                </Box>
                <Box>
                    <Box width={150} sx={ListHeaderOption}>
                        断裁
                    </Box>
                    <Box width={150} sx={ListBodyOption}>
                        0
                    </Box>
                </Box>
                <Box>
                    <Box width={150} sx={ListHeaderOption}>
                        移動
                    </Box>
                    <Box width={150} sx={ListBodyOption}>
                        0
                    </Box>
                </Box>
                <Box>
                    <Box width={150} sx={ListHeaderOption}>
                        アセンブリ
                    </Box>
                    <Box width={150} sx={ListBodyOption}>
                        0
                    </Box>
                </Box>
                <Box>
                    <Box width={150} sx={ListHeaderOption}>
                        出荷
                    </Box>
                    <Box width={150} sx={ListBodyOption}>
                        0
                    </Box>
                </Box>
            </Box>
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
                gap={3}
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
