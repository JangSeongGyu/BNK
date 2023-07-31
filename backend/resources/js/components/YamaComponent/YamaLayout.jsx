import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
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

    const Cards = () => {
        let html = [];
        let heightCnt = 340;
        let insertHeight = 0;

        // Header ======================
        html.push(<CardHeader data={groupData} selectDate={selectDate} />);

        let keys = Object.keys(groupData);
        let cnt = 0;
        keys.forEach((key, index) => {
            let length = groupData[key].length;

            insertHeight = 86 + length * 40;
            if (heightCnt + insertHeight > MainHeight - 100) {
                // ページ　余白処理
                html.push(
                    <Box
                        key={cnt++}
                        borderBottom={1}
                        pb={4}
                        borderColor={grey[400]}
                        height={MainHeight - heightCnt}
                    />
                );
                heightCnt = 0;
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
                else if (pageType == 'eagles' || pageType == 'taxi')
                    html.push(
                        <TXSceneCard key={cnt++} data={groupData[key][i]} />
                    );
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
