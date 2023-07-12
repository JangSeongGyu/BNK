import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import SelectDateCard from './SelectDateCard';
import PrintOutBtnList from './PrintOutBtnList';
import BizlogiBtnList from './BizlogiBtnList';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import InspectionList from './InspectionList';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');

const MarketSideList = (props) => {
    const selectDate = props.selectDate;

    const [dailyData, SetDailyData] = useState([]);
    const [logDatas, SetLogDatas] = useState(props.logDatas);

    useEffect(() => {
        SetDailyData(props.dailyData);
    }, [props.dailyData]);

    const SideList = () => {
        if (dailyData.length > 0)
            return (
                <>
                    <SelectDateCard selectDate={selectDate} />
                    <BizlogiBtnList selectDate={selectDate} />
                    <PrintOutBtnList selectDate={selectDate} />
                    <InspectionList selectDate={selectDate} />
                </>
            );
        else
            return (
                <Box
                    sx={BorderOption}
                    height={100}
                    fontSize={30}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <>出荷データがありません。</>
                </Box>
            );
    };

    return (
        <Box sx={{ px: 2 }}>
            <SideList></SideList>
        </Box>
    );
};
export default MarketSideList;
