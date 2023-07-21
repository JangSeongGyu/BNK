import { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import { red } from '@mui/material/colors';
import axios from 'axios';
import ExcelJS from 'exceljs';

const BtnOption = SuperMarketDesign('BtnOption');

const QRBtn = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;

    const ButtonClick = async () => {
        console.log(selectDate);
        let QRdata = [
            123123123, 22232323, 3225345353, 1231241255, 235235345323,
            32524234236234, 2523523523523,
        ];

        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet('シート名', {});

        for (let i = 1; i <= QRdata.length; i++) {
            let sheet_row = worksheet.getRow(i);
            sheet_row.getCell(1).value = QRdata[i];
        }
        worksheet.getColumn(1).width = 50;

        let uint8Array = await workbook.xlsx.writeBuffer(); //xlsxの場合
        let blob = new Blob([uint8Array], { type: 'application/octet-binary' });

        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `QR_${selectDate}.xlsx`;
        link.click();
        // axios.get(
        //     import.meta.env.VITE_DOMAIN +
        //         `/api/${pageType}/qrcode/${selectDate}`
        // );
    };

    return (
        <Button sx={BtnOption} onClick={() => ButtonClick()}>
            QRエクスポート
        </Button>
    );
};
export default QRBtn;
