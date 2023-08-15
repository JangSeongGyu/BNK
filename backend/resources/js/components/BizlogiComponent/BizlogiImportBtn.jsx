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
                .catch((e) => {
                    let errMsg = '';
                    if (e.response == null) {
                        errMsg = 'サーバー接続失敗。';
                    } else {
                        errMsg = e.response.data.message;
                    }
                    toast.custom(errMsg, { type: 'closeError' });
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
            toast.custom(`${maxCnt - errCnt}件成功、${errCnt}件エラー`, {
                type: 'closeError',
                id: toastId,
            });
        }

        setJson(null);
    };

    const CallTeams = () => {
        const toastId = toast.loading('Teams発信中...');
        axios
            .post(`/api/${pageType}/webhook/${selectDate}`, {
                category: '出荷指示完了',
            })
            .then((res) => {
                toast.success('Teams発信完了', { id: toastId });
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = 'Teamsサーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    };

    CallTeams();

    const tsubushi = async () => {
        const toastId = toast.loading('つぶし実行中...');
        await axios
            .put(`/api/${pageType}/tsubushi/${selectDate}`)
            .then((res) => {
                toast.success('つぶし完了', { id: toastId });
                CallTeams();
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = 'つぶしサーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
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
