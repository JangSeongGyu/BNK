import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import {
    BorderOption,
    ListTitleOption,
    BtnOption,
} from '../Design/DesignOption';
import { red } from '@mui/material/colors';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import LabelLayout from './LabelLayout';
import YamaLayout from './YamaComponent/YamaLayout';
import JobTicketLayout from './JobTicketLayout';
import axios from 'axios';
import QRBtn from './QRBtn';
import { toast } from 'react-hot-toast';
import TeamsDialog from './TeamsDialog';

const PrintOutBtnList = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;
    const teamsRef = useRef();

    const LabelRef = useRef();
    const YamaRef = useRef();
    const JobRef = useRef();
    const promiseLabelRef = useRef();
    const promiseJobRef = useRef();
    const promiseYamaRef = useRef();
    const [labelData, SetLabelData] = useState([]);
    const [yamaData, SetYamaData] = useState([]);
    const [jobData, SetJobData] = useState([]);

    const fileDate = () => {
        const year = String(selectDate).slice(0, 4);
        const month = String(selectDate).slice(5, 7);
        const date = String(selectDate).slice(8, 10);
        return year + month + date;
    };

    const LabelBtn = () => {
        return (
            <ReactToPrint
                trigger={() => <Button sx={BtnOption}>梱包ラベル</Button>}
                content={() => LabelRef.current}
                onBeforeGetContent={() => {
                    return new Promise((resolve) => {
                        if (labelData.length == 0) {
                            promiseLabelRef.current = resolve;
                            LabelPrinting();
                        } else return resolve();
                    });
                }}
                documentTitle={`梱包ラベル_${fileDate()}`}
            />
        );
    };

    const LabelPrinting = () => {
        const toastId = toast.loading('梱包ラベル出力中...');
        axios
            .get(`/api/${pageType}/label/` + selectDate)
            .then((res) => {
                SetLabelData(res.data);

                toast.success('梱包ラベル出力完了。', { id: toastId });
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = 'サーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    };
    const YamaPrinting = () => {
        const toastId = toast.loading('山出しリスト出力中...');
        axios
            .get(`/api/${pageType}/totalpick/` + selectDate)
            .then((res) => {
                if (pageType == 'supermarket')
                    SetYamaData({ supermarket: res.data });
                else SetYamaData(res.data);

                toast.success('山出しリスト出力完了。', { id: toastId });
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = 'サーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    };
    const JobPrinting = () => {
        const toastId = toast.loading('Jobチケット出力中...');
        let cnt = 0;
        axios
            .get(`/api/${pageType}/jobticket/` + selectDate)
            .then((res) => {
                SetJobData(res.data);
                toast.success('Jobチケット出力完了。', { id: toastId });
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = 'サーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    };

    // Print After - Promise
    useEffect(() => {
        if (labelData && promiseLabelRef.current) {
            promiseLabelRef.current();
        }
    }, [labelData]);

    useEffect(() => {
        if (yamaData && promiseYamaRef.current) {
            promiseYamaRef.current();
        }
    }, [yamaData]);

    useEffect(() => {
        if (jobData && promiseJobRef.current) {
            promiseJobRef.current();
        }
    }, [jobData]);

    const CheckLabelBtn = () => {
        if (pageType == 'supermarket') return <LabelBtn />;
    };

    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Box display={'flex'} mb={1} justifyContent={'space-between'}>
                <Typography sx={ListTitleOption}>帳票出力</Typography>
                <TeamsDialog pageType={pageType} selectDate={selectDate} />
            </Box>
            <Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <QRBtn selectDate={selectDate} pageType={pageType} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                    }}
                >
                    <ReactToPrint
                        trigger={() => (
                            <Button sx={BtnOption}>JOBチケット</Button>
                        )}
                        pageStyle="
                        @media print {
                                body {-webkit-print-color-adjust: exact;}
                                }
                        @page { size: A4 landscape; margin: 0; }"
                        content={() => JobRef.current}
                        documentTitle={`Jobチケット_${fileDate()}`}
                        onBeforeGetContent={() => {
                            return new Promise((resolve) => {
                                if (jobData.length == 0) {
                                    promiseJobRef.current = resolve;
                                    JobPrinting();
                                } else return resolve();
                            });
                        }}
                    />
                    <CheckLabelBtn />
                    <ReactToPrint
                        trigger={() => (
                            <Button sx={BtnOption}>山出しリスト</Button>
                        )}
                        content={() => YamaRef.current}
                        documentTitle={`山出リスト_${fileDate()}`}
                        onBeforeGetContent={() => {
                            return new Promise((resolve) => {
                                if (yamaData.length == 0) {
                                    promiseYamaRef.current = resolve;
                                    YamaPrinting();
                                } else return resolve();
                            });
                        }}
                    />
                </Box>
            </Box>

            {/* Printing Page  */}
            <Box display={'none'}>
                <LabelLayout
                    labelData={labelData}
                    pageType={pageType}
                    selectDate={selectDate}
                    ref={LabelRef}
                />
                <YamaLayout
                    yamaData={yamaData}
                    pageType={pageType}
                    selectDate={selectDate}
                    ref={YamaRef}
                />
                <JobTicketLayout
                    jobData={jobData}
                    pageType={pageType}
                    selectDate={selectDate}
                    ref={JobRef}
                />
            </Box>
        </Box>
    );
};
export default PrintOutBtnList;
