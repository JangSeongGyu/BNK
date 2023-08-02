import { Button } from '@mui/material';
import { BtnOption } from '../../Design/DesignOption';
import React, { useEffect, useState, useRef } from 'react';
import WaitCircle from '../WaitCircle';
import ImportDialog from '../../Beauty/Import/ImportDialog';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BizlogiImportBtn = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;

    const importDialogRef = useRef();
    const waitCircleRef = useRef();
    const [json, setJson] = useState(null);
    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(null);

    const putWKOrder = async (json) => {
        // waitCircleRef.current.handleOpen();
        let errCnt = 0;
        let maxCnt = json['クール区分'].length;

        const toastId = toast.loading('インポート中...');
        for (let i = 0; i < maxCnt; i++) {
            toast.loading(`(${i}/${maxCnt}) 処理中...`, { id: toastId });
            let inquiry_no = json['問合せNo'][i];
            let shipment_no = json['注文番号'][i];
            await axios
                .put(`/api/${pageType}/inquiryno/${selectDate}`, {
                    inquiry_no: inquiry_no,
                    shipment_no: shipment_no,
                })
                .then((response) => {})
                .catch((e) => {
                    toast.error(e.response.data.message);
                    return (errCnt += 1);
                })
                .finally(() => {});
        }

        if (errCnt == 0) {
            toast.success(`${maxCnt - errCnt}件成功、${errCnt}件エラー`, {
                id: toastId,
            });
            tsubushi();
        } else {
            toast.error(`${maxCnt - errCnt}件成功、${errCnt}件エラー`, {
                id: toastId,
            });
        }

        // toast.error(errCnt, { id: toastId });

        setJson(null);
    };
    const tsubushi = async () => {
        await axios
            .put(`/api/${pageType}/tsubushi/${selectDate}`)
            .then((response) => {})
            .catch((e) => {
                if (e.response == null) {
                    return alert('接続がタイムアウトしました。');
                }
                if (e.response.status >= 500) {
                    const errors = e.response.data;
                    return alert(errors.message);
                }
            });
    };

    useEffect(() => {
        if (json != null) {
            putWKOrder(json);
        }
    }, [json]);
    return (
        <>
            <WaitCircle ref={waitCircleRef} />
            <Button
                width={'100%'}
                variant="outlined"
                onClick={() => importDialogRef.current.handleClickOpen()}
                sx={BtnOption}
            >
                BIZLOGI インポート
            </Button>
            <ImportDialog ref={importDialogRef} setJson={setJson} />
        </>
    );
};

export default BizlogiImportBtn;
