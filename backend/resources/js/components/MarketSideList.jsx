import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import SelectDateCard from './SelectDateCard';
import PrintOutBtnList from './PrintOutBtnList';
import BizlogiBtnList from './BizlogiComponent/BizlogiBtnList';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import CheckingList from './CheckingList';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');

const MarketSideList = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;
    const isData = props.isData;
    // const [dailyData, SetDailyData] = useState([]);
    // useEffect(() => {
    //     SetDailyData(props.dailyData);
    // }, [props.dailyData]);

    const SideList = () => {
        if (isData)
            return (
                <>
                    <SelectDateCard
                        pageType={pageType}
                        selectDate={selectDate}
                    />
                    <BizlogiBtnList
                        pageType={pageType}
                        selectDate={selectDate}
                    />
                    <PrintOutBtnList
                        pageType={pageType}
                        selectDate={selectDate}
                    />
                    <CheckingList pageType={pageType} selectDate={selectDate} />
                </>
            );
    };

    return (
        <Box sx={{ px: 2 }}>
            <SideList></SideList>
        </Box>
    );
};
export default MarketSideList;
