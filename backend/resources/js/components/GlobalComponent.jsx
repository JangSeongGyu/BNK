import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export const ZipDownload = (files, title) => {
    const today = fileToday();

    var zip = new JSZip();

    files.forEach((file, index) => {
        zip.file(`DTF連携用_${today}.xlsx`, file);
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, title + '_' + today);
    });
    return 'end';
};

export const fileToday = () => {
    const today = new Date();
    const year = String(today.getFullYear()).slice(-2);
    const month = paddingNum(today.getMonth() + 1, 2);
    const day = paddingNum(today.getDate(), 2);
    const hours = paddingNum(today.getHours(), 2);
    const minute = paddingNum(today.getMinutes(), 2);

    const nowTime = year + month + day + hours + minute;

    return nowTime;
};

export const paddingNum = (data, index) => {
    const paddingNum = data.toString().padStart(index, '0');
    return paddingNum;
};
