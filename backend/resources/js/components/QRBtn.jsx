import { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import DesignOption from '../Design/DesignOption';
import { red } from '@mui/material/colors';
import axios from 'axios';
import ExcelJS from 'exceljs';
import { toast } from 'react-hot-toast';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import * as zip from '@zip.js/zip.js';
import ZipDownload from './ZipDownload';

const BtnOption = DesignOption('BtnOption');

const QRBtn = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;
    const [qrData, SetQrData] = useState([]);

    const ButtonClick = async () => {
        const toastId = toast.loading('QRエクスポート中...');
        axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    `/api/${pageType}/qrdata/${selectDate}`
            )
            .then((res) => {
                console.log(res.data);
                const sorted = [...res.data].sort((a, b) => {
                    return b.問い合わせ番号 - a.問い合わせ番号;
                });

                SetQrData(sorted);
                toast.success('エクスポート完了。', { id: toastId });
            })
            .catch((e) => {
                toast.error(e.response.message, { id: toastId });
            });
    };

    useEffect(() => {
        console.log('qrData', qrData);
        if (qrData.length > 0) {
            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('DTF連携', {});
            let cnt = 2;
            console.log(qrData);
            console.log(qrData.sort(qrData.問い合わせ番号));

            // HEADER
            let headerData = [
                '印字コード',
                '印字名称',
                '画像データ名',
                '間紙フラグ',
                '納品数量',
                '間紙バーコード',
                'つぶし',
                '連番',
            ];

            let headerRow = worksheet.getRow(1);
            headerData.forEach((data, index) => {
                headerRow.getCell(index + 1).value = data;
            });

            // BODY
            for (let i = 0; i < qrData.length; i++) {
                let sheetRow = worksheet.getRow(cnt++);

                // CONTENT　HEADER
                sheetRow.getCell(2).value = qrData[i].ショップ名;
                sheetRow.getCell(4).value = 1;
                sheetRow.getCell(5).value = qrData[i].数量;
                sheetRow.getCell(6).value =
                    'a' +
                    qrData[i].問い合わせ番号 +
                    paddingNum(qrData[i].同梱連番, 3) +
                    'a';

                sheetRow.getCell(7).value = qrData[i].つぶし;

                sheetRow.getCell(8).value =
                    paddingNum(qrData[i].数量, 4) +
                    '/' +
                    paddingNum(qrData[i].数量, 4);

                // CONTENT　BODY
                for (let j = 1; j <= qrData[i].数量; j++) {
                    let secondRow = worksheet.getRow(cnt++);
                    secondRow.getCell(1).value =
                        qrData[i].ショップコード + qrData[i].シーンコード;
                    secondRow.getCell(2).value = qrData[i].シーン名;
                    secondRow.getCell(3).value = qrData[i].URL;
                    secondRow.getCell(7).value = qrData[i].つぶし;
                    secondRow.getCell(8).value =
                        paddingNum(j, 4) + '/' + paddingNum(qrData[i].数量, 4);
                }
            }

            download(workbook);
        }
    }, [qrData]);

    const download = async (workbook) => {
        // console.log('download');

        // // // Xlsx
        let excelFile = await workbook.xlsx.writeBuffer(); //xlsxの場合
        console.log('Original', [excelFile]);
        ZipDownload([excelFile], `QR`);

        // var zip = new JSZip();
        // let blob = new Blob([excelFile], {
        //     type: 'application/octet-binary',
        // });
        // console.log(excelFile);

        // zip.file(`QR_${selectDate}.xlsx`, excelFile);

        // zip.generateAsync({ type: 'blob' }).then(function (content) {
        //     saveAs(content, `QR_${selectDate}.zip`);
        // });
    };

    const paddingNum = (data, index) => {
        return data.toString().padStart(index, '0');
    };

    return (
        <Button sx={BtnOption} onClick={() => ButtonClick()}>
            QRエクスポート
        </Button>
    );
};
export default QRBtn;
