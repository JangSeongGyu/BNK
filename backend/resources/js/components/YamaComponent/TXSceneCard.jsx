import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';

const SceneCardOption = () => {
    return {
        fontSize: 18,
        px: 2,
        borderRight: 1,
        borderColor: grey[400],
    };
};

const TXSceneCard = (props) => {
    const data = props.data;
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

            <Grid sx={SceneCardOption} item xs={1}>
                10x10
            </Grid>
            <Grid sx={SceneCardOption} item xs={6.5}>
                {data.シーン名}
            </Grid>
            <Grid fontSize={20} textAlign={'center'} item xs={1.5}>
                {data.数量}枚
            </Grid>
        </Grid>
    );
};
export default TXSceneCard;
