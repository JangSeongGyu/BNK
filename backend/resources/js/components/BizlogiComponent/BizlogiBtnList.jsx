import React, { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../../Design/SuperMarketDesign';
import { blue, grey, pink, red } from '@mui/material/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import BizlogiImportBtn from './BizlogiImportBtn';
import Encoding, { convert } from 'encoding-japanese';

const BorderOption = SuperMarketDesign('BorderOption');
const BtnOption = SuperMarketDesign('BtnOption');
const calendarBoxTypo = SuperMarketDesign('calendarBoxTypo');

const BizlogiBtnList = (props) => {
    const selectDate = props.selectDate;
    const BtnRef = useRef();
    const pageType = props.pageType;

    const BtnClick = () => {
        CallData();
    };

    const ExportData = (resData, toastid) => {
        let hcsv = '';

        let keys = Object.keys(resData[0]);
        console.log('keys ', keys);
        keys.forEach((key) => {
            hcsv = hcsv + '"' + key + '",';
        });
        hcsv = hcsv.substring(0, hcsv.length - 1) + '\n';

        resData.forEach((data) => {
            let vcsv = '';
            keys.forEach((key) => {
                if (data[key] != null) vcsv = vcsv + '"' + data[key] + '",';
                else vcsv = vcsv + '"",';
            });
            vcsv = vcsv.substring(0, vcsv.length - 1) + '\n';
            hcsv = hcsv + vcsv;
        });

        console.log(hcsv);

        let str = Encoding.stringToCode(hcsv);
        let convert = Encoding.convert(str, 'sjis', 'unicode');
        let u8a = new Uint8Array(convert);
        const element = document.createElement('a');
        const file = new Blob([u8a], {
            type: 'text/csv',
        });
        element.href = URL.createObjectURL(file);
        element.download = 'bizlogi_' + selectDate + '.csv';
        document.body.appendChild(element);
        element.click();
        toast.success('エクスポートします。', { id: toastid });
    };

    const CallData = () => {
        let toastid = toast.loading('エクスポート中です。');
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    `/api/${pageType}/bizlogi/` +
                    selectDate
            )
            .then((res) => {
                console.log(res.data);
                ExportData(res.data, toastid);
            })
            .catch((e) => {
                toast.error('エクスポートデータがありません。', {
                    id: toastid,
                });
            });
    };

    return (
        <Box mt={1} width={'100%'} sx={BorderOption}>
            <Typography sx={calendarBoxTypo}>Bizlogi処理</Typography>
            <Box
                gap={0.5}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
                justifyContent={'space-between'}
            >
                <Button
                    width={'100%'}
                    onClick={() => BtnClick()}
                    sx={BtnOption}
                >
                    Bizlogi エクスポート
                </Button>
                <BizlogiImportBtn selectDate={selectDate} pageType={pageType} />
            </Box>
        </Box>
    );
};

export default BizlogiBtnList;
