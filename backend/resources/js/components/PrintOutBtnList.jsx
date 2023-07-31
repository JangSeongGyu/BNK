import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import DesignOption from '../Design/DesignOption';
import { red } from '@mui/material/colors';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import LabelLayout from './LabelLayout';
import YamaLayout from './YamaComponent/YamaLayout';
import JobTicketLayout from './JobTicketLayout';
import axios from 'axios';
import QRBtn from './QRBtn';

const BorderOption = DesignOption('BorderOption');
const BtnOption = DesignOption('BtnOption');
const calendarBoxTypo = DesignOption('calendarBoxTypo');

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
                documentTitle={`梱包ラベル_${selectDate}`}
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
                            <Button
                                onClick={() => console.log('dd')}
                                sx={BtnOption}
                            >
                                JOBチケット
                            </Button>
                        )}
                        pageStyle="
                        @media print {
                                body {-webkit-print-color-adjust: exact;}
                                }
                        @page { size: A4 landscape; margin: 0; }"
                        content={() => JobRef.current}
                        documentTitle={`Jobチケット_${selectDate}`}
                    />
                    <CheckLabelBtn />
                    <ReactToPrint
                        trigger={() => (
                            <Button sx={BtnOption}>山出しリスト</Button>
                        )}
                        content={() => YamaRef.current}
                        documentTitle={`山出リスト_${selectDate}`}
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
