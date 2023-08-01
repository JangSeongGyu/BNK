import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { useEffect, useState, useRef } from 'react';

const ZipDownload = (files, title) => {
    const today = new Date();
    const year = String(today.getFullYear()).slice(-2);
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');

    const nowTime = year + month + day + hours + minute;

    console.log('nowTime', nowTime);

    var zip = new JSZip();

    files.forEach((file, index) => {
        zip.file(`DTF連携用_${nowTime}.xlsx`, file);
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, title + '_' + nowTime);
    });

    return 'check';
};

export default ZipDownload;
