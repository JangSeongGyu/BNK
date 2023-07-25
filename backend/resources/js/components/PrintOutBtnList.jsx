import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import { red } from '@mui/material/colors';
import ReactToPrint from 'react-to-print';
import LabelLayout from './LabelLayout';
import YamaLayout from './YamaComponent/YamaLayout';
import JobTicketLayout from './JobTicketLayout';
import axios from 'axios';
import QRBtn from './QRBtn';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');
const calendarBoxTypo = SuperMarketDesign('calendarBoxTypo');

const PrintOutBtnList = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;
    const LabelRef = useRef();
    const YamaRef = useRef();
    const JobRef = useRef();
    const [clickedBtn, SetClickedBtn] = useState('');

    const LabelBtn = () => {
        return (
            <ReactToPrint
                trigger={() => <Button sx={BtnOption}>梱包ラベル</Button>}
                content={() => LabelRef.current}
            />
        );
    };

    const CheckLabelBtn = () => {
        if (pageType == 'supermarket') return <LabelBtn />;
    };

    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Typography sx={calendarBoxTypo}>帳票出力</Typography>
            <Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <QRBtn selectDate={selectDate} pageType={pageType} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        gap: 1,
                    }}
                >
                    <ReactToPrint
                        trigger={() => (
                            <Button onClick={() => {}} sx={BtnOption}>
                                JOBチケット
                            </Button>
                        )}
                        pageStyle="
                        @media print {
                                body {-webkit-print-color-adjust: exact;}
                                }
                        @page { size: A4 landscape; margin: 0; }"
                        content={() => JobRef.current}
                    />
                    <CheckLabelBtn />
                    <ReactToPrint
                        trigger={() => (
                            <Button sx={BtnOption}>山出しリスト</Button>
                        )}
                        content={() => YamaRef.current}
                    />
                </Box>
            </Box>

            {/* Printing Page  */}
            <Box display={'none'}>
                <LabelLayout
                    pageType={pageType}
                    selectDate={selectDate}
                    ref={LabelRef}
                />
                <YamaLayout
                    pageType={pageType}
                    selectDate={selectDate}
                    ref={YamaRef}
                />
                <JobTicketLayout
                    pageType={pageType}
                    selectDate={selectDate}
                    ref={JobRef}
                />
            </Box>
        </Box>
    );
};
export default PrintOutBtnList;
