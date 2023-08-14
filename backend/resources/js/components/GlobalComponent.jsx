import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export const ZipDownload = (files, zipTitle) => {
    const today = fileToday();
    let zip = new JSZip();

    files.forEach((file, index) => {
        let fileTitle = Object.keys(files[index]);
        zip.file(`${fileTitle}_${today}.xlsx`, file[fileTitle]);
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, zipTitle + '_' + today);
    });
    return 'end';
};

export const fileToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = paddingNum(today.getMonth() + 1, 2);
    const day = paddingNum(today.getDate(), 2);
    const hours = paddingNum(today.getHours(), 2);
    const minute = paddingNum(today.getMinutes(), 2);
    const nowTime = year + month + day + hours + minute;

    return nowTime;
};

export const Today = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = paddingNum(today.getMonth() + 1, 2);
    const day = paddingNum(today.getDate(), 2);

    const nowTime = `${year}-${month}-${day}`;

    return nowTime;
};

export const paddingNum = (data, index) => {
    const paddingNum = String(data).toString().padStart(index, '0');
    return paddingNum;
};
