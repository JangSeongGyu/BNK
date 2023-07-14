import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Grid, Modal, Typography, Box, Button, CardMedia } from '@mui/material';
import { grey } from '@mui/material/colors';
import barcode from '../images/barcode.png';

const leftwidth = '40%';
const rightwidth = '100%';
const MainWidth = 1080;
const MainHeight = MainWidth * 1.4142;

const MainBoxOption = () => {
    return {
        width: '100%',
        display: 'flex',
        borderBottom: 1,
    };
};

const LeftBoxOption = () => {
    return {
        width: '23%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'MS PGothic',
        borderRight: 1,
    };
};

const RightBoxOption = () => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'MS PGothic',
        width: '77%',
        px: 2,
    };
};

const LeftTypoOption = () => {
    return {
        textAlign: 'center',
        fontFamily: 'MS PGothic',
        fontSize: 18,
        fontWeight: 'bold',
    };
};

const RightTypoOption = () => {
    return {
        width: '100%',
        textAlign: 'center',
        wordBreak: 'break-word',
        fontWeight: 'bold',
        fontFamily: 'MS PGothic',
        backGroundColor: grey[200],
    };
};

const Cards = () => {
    let html = [];
    let cardList = [];
    let i = 0;
    let count = 5;
    for (i = 0; i < count; i++) {
        cardList.push(LabelCard(i));

        if ((i + 1) % 6 == 0 && i != 0) {
            html.push(
                <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    gap={10}
                    width={MainWidth}
                    height={MainHeight}
                    justifyContent={'center'}
                    alignItems={'center'}
                    py={10}
                    px={-1}
                >
                    {cardList}
                </Box>
            );
            cardList = [];
        }
    }
    if (count % 6 != 0)
        for (i = 0; i < 6 - (count % 6); i++) {
            cardList.push(<Box width={420} height={343}></Box>);
        }
    if (cardList.length > 0)
        html.push(
            <Box
                display={'flex'}
                flexWrap={'wrap'}
                gap={10}
                width={MainWidth}
                height={MainHeight}
                justifyContent={'center'}
                alignItems={'center'}
                py={10}
                px={-1}
            >
                {cardList}
            </Box>
        );
    return html;
};

const LabelCard = (number) => {
    return (
        <Box width={420} height={343} border={3}>
            <Box sx={MainBoxOption} height={'21.5%'}>
                <Box sx={LeftBoxOption}>
                    <Typography sx={LeftTypoOption}>店舗名</Typography>
                </Box>
                <Box sx={RightBoxOption}>
                    <Typography
                        fontSize={20}
                        lineHeight={1.1}
                        sx={RightTypoOption}
                    >
                        楽天ペイメント株式会社 <br />
                        楽天ペイ事業本部 アクティマーケットプレイス
                    </Typography>
                </Box>
            </Box>
            <Box sx={MainBoxOption} height={'11.5%'}>
                <Box sx={LeftBoxOption}>
                    <Typography sx={LeftTypoOption}>店舗コード</Typography>
                </Box>
                <Box sx={RightBoxOption}>
                    <Typography fontSize={28} sx={RightTypoOption}>
                        5006803222680
                    </Typography>
                </Box>
            </Box>
            <Box sx={MainBoxOption} height={'20.2%'}>
                <Box sx={LeftBoxOption}>
                    <Typography sx={LeftTypoOption}>品名</Typography>
                </Box>
                <Box sx={RightBoxOption}>
                    <Typography fontSize={24} sx={RightTypoOption}>
                        楽天ペイ　スーパーQR
                    </Typography>
                </Box>
            </Box>
            <Box sx={MainBoxOption} height={'11.5%'}>
                <Box sx={LeftBoxOption}>
                    <Typography sx={LeftTypoOption}>数量</Typography>
                </Box>
                <Box sx={RightBoxOption}>
                    <Typography fontSize={24} sx={RightTypoOption}>
                        7
                    </Typography>
                </Box>
            </Box>
            <Box pl={1} height={'35.3%'}>
                <Box>
                    <Box
                        fontFamily={'CODE39'}
                        pr={1}
                        mt={2}
                        fontSize={32}
                        width={'100%'}
                        backGroundColor={grey[200]}
                        textAlign={'center'}
                    >
                        {' '}
                        *565792577836003*
                    </Box>
                    <Box
                        pr={2}
                        fontSize={27}
                        width={'100%'}
                        backGroundColor={grey[200]}
                        fontWeight={'bold'}
                        textAlign={'center'}
                        fontFamily={'MS PGothic'}
                    >
                        565792577836003
                    </Box>
                </Box>
                <Box
                    mt={-1.2}
                    mr={0.2}
                    fontSize={20}
                    fontWeight={'bold'}
                    textAlign={'right'}
                >
                    {number}
                </Box>
            </Box>
        </Box>
    );
};

const LabelLayout = forwardRef((props, ref) => {
    return (
        <Box ref={ref}>
            <Cards />
        </Box>
    );
});
export default LabelLayout;
