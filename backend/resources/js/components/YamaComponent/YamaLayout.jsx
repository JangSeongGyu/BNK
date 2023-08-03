import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import axios from 'axios';
// import ListHeader from './YamaComponent/ListHeader';
import CardHeader from './CardHeader';
import ListHeader from './ListHeader';
import SPSceneCard from './SPSceneCard';
import TXSceneCard from './TXSceneCard';

const MainWidth = 1058;
const MainHeight = 1497;

const YamaLayout = forwardRef((props, ref) => {
    const pageType = props.pageType;
    const selectDate = props.selectDate;
    const groupData = props.yamaData;

    const Cards = (title, data) => {
        let html = [];
        let heightCnt = 342;
        let insertHeight = 0;
        let cnt = 0;
        let keys = Object.keys(groupData);

        // Header ======================
        html.push(
            <CardHeader
                key={cnt++}
                title={title}
                data={groupData}
                selectDate={selectDate}
            />
        );

        keys.forEach((key, index) => {
            let length = groupData[key].length;

            insertHeight = 86 + length * 40;
            if (heightCnt + insertHeight > MainHeight - 80) {
                // ページ　余白処理
                html.push(
                    <Box
                        key={cnt++}
                        borderBottom={1}
                        // mb={5}
                        borderColor={grey[400]}
                        height={MainHeight - heightCnt + 32}
                    />
                );
                heightCnt = 32;
            }

            // 送り先　Header
            html.push(
                <ListHeader
                    key={cnt++}
                    data={groupData[key]}
                    selectDate={selectDate}
                />
            );

            // 送り先　Data
            for (let i = 0; i < length; i++)
                if (pageType == 'supermarket')
                    html.push(
                        <SPSceneCard key={cnt++} data={groupData[key][i]} />
                    );
                else if (pageType == 'taxi')
                    html.push(
                        <TXSceneCard key={cnt++} data={groupData[key][i]} />
                    );
            heightCnt += insertHeight;
            console.log(heightCnt);
            insertHeight = 0;
        });

        // 2枚のために最後に余白追加
        console.log(MainHeight, heightCnt);
        html.push(
            <Box
                key={cnt++}
                borderColor={grey[400]}
                height={MainHeight - heightCnt - 1}
            />
        );

        return html;
    };

    const Pages = () => {
        if (pageType == 'supermarket')
            return (
                <Box px={4} pt={4}>
                    {Cards('楽天スーパーマーケットQR', [])}
                </Box>
            );
        if (pageType == 'taxi')
            return (
                <>
                    <Box px={4} pt={4}>
                        {Cards('楽天タクシーQR', [])}
                    </Box>
                    <Box px={4} pt={4}>
                        {Cards('楽天イーグルスQR', [])}
                    </Box>
                </>
            );
    };

    return (
        <Box width={MainWidth} height={MainHeight} ref={ref}>
            <Pages />
        </Box>
    );
});
export default YamaLayout;
