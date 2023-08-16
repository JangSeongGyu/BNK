import axios from 'axios';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { toast } from 'react-hot-toast';

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

export const CallTeams = (pageType, selectDate, category) => {
    const toastId = toast.loading('Teams発信中...');
    axios
        .post(`/api/${pageType}/webhook/${selectDate}`, {
            category: category,
        })
        .then((res) => {
            toast.success('Teams発信完了', { id: toastId });
        })
        .catch((e) => {
            let errMsg = '';
            if (e.response == null) {
                errMsg = 'Teamsサーバー接続失敗';
            } else {
                errMsg = e.response.data.message;
            }
            toast.custom(errMsg, { type: 'closeError', id: toastId });
        });
};
