import { useEffect, useState, useRef } from 'react';
import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import { BtnOption } from '../Design/DesignOption';
import axios from 'axios';
import ExcelJS from 'exceljs';
import { toast } from 'react-hot-toast';
import { ZipDownload, paddingNum } from './GlobalComponent';

const QRBtn = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;

    const ButtonClick = async () => {
        const toastId = toast.loading('QRエクスポート中...');
        if (pageType == 'supermarket') {
            SMAxios(toastId);
        } else if (pageType == 'taxi') {
            TXAxios(toastId);
        }
    };
    const SMAxios = (toastId) => {
        axios
            .get(`/api/${pageType}/qrdata/${selectDate}`)
            .then((res) => {
                console.log('QR Data', res.data);
                const sorted = [...res.data].sort((a, b) => {
                    return b.問い合わせ番号 - a.問い合わせ番号;
                });
                toast.success('エクスポート完了。', { id: toastId });

                download({ supermarket: SPMakeExcel(sorted) });
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

    const TXAxios = (toastId) => {
        let workbooks = {};
        axios
            .get(`/api/${pageType}/qrdata/${selectDate}`)
            .then((res) => {
                const qrData = res.data;
                console.log(res.data);
                Object.keys(qrData).forEach((key) => {
                    if (qrData[key].length == 0) return;
                    let data = qrData[key];
                    const sorted = data.sort((a, b) => {
                        return b.問い合わせ番号 - a.問い合わせ番号;
                    });
                    workbooks[key] = TXMakeExcel(sorted);
                });
                download(workbooks);

                toast.success('エクスポート完了。', { id: toastId });
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

    const TXMakeExcel = (qrDatas) => {
        console.log('MakeExcel', qrDatas);
        let sheetName = 'DTF連携';
        if (qrDatas[0].商品名 == 'A6') sheetName += '_A6_通常';
        else if (qrDatas[0].商品名 == '10x10') sheetName += '_10×10_通常';

        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet(sheetName, {});
        let cnt = 2;

        // qrData.sort(qrData.問い合わせ番号);

        // HEADER
        let headerData = [
            '印字CODE',
            '納品先宛名',
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
        for (let i = 0; i < qrDatas.length; i++) {
            let sheetRow = worksheet.getRow(cnt++);
            // CONTENT　HEADER

            sheetRow.getCell(2).value = qrDatas[i].納品先宛名;
            sheetRow.getCell(3).value = qrDatas[i].店舗名;
            sheetRow.getCell(4).value = 0;
            sheetRow.getCell(5).value = 1;
            sheetRow.getCell(6).value = qrDatas[i].数量;
            sheetRow.getCell(7).value =
                'a' +
                qrDatas[i].問い合わせ番号 +
                paddingNum(qrDatas[i].同梱連番, 3) +
                'a';

            sheetRow.getCell(8).value = qrDatas[i].つぶし;

            sheetRow.getCell(9).value =
                paddingNum(qrDatas[i].数量, 4) +
                '/' +
                paddingNum(qrDatas[i].数量, 4);

            // CONTENT　BODY
            for (let j = 1; j <= qrDatas[i].数量; j++) {
                let secondRow = worksheet.getRow(cnt++);
                secondRow.getCell(1).value =
                    qrDatas[i].ショップコード + qrDatas[i].シーンコード;
                secondRow.getCell(3).value = qrDatas[i].シーン名;
                secondRow.getCell(4).value = qrDatas[i].URL;
                secondRow.getCell(8).value = qrDatas[i].つぶし;
                secondRow.getCell(9).value =
                    paddingNum(j, 4) + '/' + paddingNum(qrDatas[i].数量, 4);
            }
        }
        return workbook;
    };

    const SPMakeExcel = (qrDatas) => {
        console.log('MakeExcel', qrDatas);
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet('DTF連携', {});
        let cnt = 2;

        // qrData.sort(qrData.問い合わせ番号);

        // HEADER
        let headerData = [
            '印字CODE',
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
        for (let i = 0; i < qrDatas.length; i++) {
            let sheetRow = worksheet.getRow(cnt++);
            // CONTENT　HEADER
            sheetRow.getCell(2).value = qrDatas[i].店舗名;
            sheetRow.getCell(3).value = 0;
            sheetRow.getCell(4).value = 1;
            sheetRow.getCell(5).value = qrDatas[i].数量;
            sheetRow.getCell(6).value =
                'a' +
                qrDatas[i].問い合わせ番号 +
                paddingNum(qrDatas[i].同梱連番, 3) +
                'a';

            sheetRow.getCell(7).value = qrDatas[i].つぶし;

            sheetRow.getCell(8).value =
                paddingNum(qrDatas[i].数量, 4) +
                '/' +
                paddingNum(qrDatas[i].数量, 4);

            // CONTENT　BODY
            for (let j = 1; j <= qrDatas[i].数量; j++) {
                let secondRow = worksheet.getRow(cnt++);
                secondRow.getCell(1).value =
                    qrDatas[i].ショップコード + qrDatas[i].シーンコード;
                secondRow.getCell(2).value = qrDatas[i].シーン名;
                secondRow.getCell(3).value = qrDatas[i].URL;
                secondRow.getCell(7).value = qrDatas[i].つぶし;
                secondRow.getCell(8).value =
                    paddingNum(j, 4) + '/' + paddingNum(qrDatas[i].数量, 4);
            }
        }
        return workbook;
    };

    const download = async (workbooks) => {
        const excelFiles = [];
        Object.keys(workbooks).forEach(async (key) => {
            const workbook = workbooks[key];
            let excelFile = await workbook.xlsx.writeBuffer();
            excelFiles.push({ [key]: excelFile });
            if (excelFiles.length == Object.keys(workbooks).length) {
                console.log('Download', excelFiles);
                ZipDownload(excelFiles, `QR`);
            }
        });
    };

    return (
        <Button sx={BtnOption} onClick={() => ButtonClick()}>
            QRエクスポート
        </Button>
    );
};
export default QRBtn;
