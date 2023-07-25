import { Button } from '@mui/material';
import SuperMarketDesign from '../../Design/SuperMarketDesign';
import React, { useEffect, useState, useRef } from 'react';
import WaitCircle from '../WaitCircle';
import ImportDialog from '../../Beauty/Import/ImportDialog';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BtnOption = SuperMarketDesign('BtnOption');

const BizlogiImportBtn = (props) => {
    const selectDate = props.selectDate;
    const pageType = props.pageType;

    const importDialogRef = useRef();
    const waitCircleRef = useRef();
    const [json, setJson] = useState(null);
    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(null);

    const shapeData = (getData) => {
        try {
            let subData = getData.map((rows) => {
                let shapeRows = Object.assign({}, rows); // イミュータブルにする
                for (let key in shapeRows) {
                    if (key.indexOf('【RB】') === -1) {
                        delete shapeRows[key];
                    }
                }
                return Object.entries(shapeRows);
            });

            let mainData = getData.map((rows, index) => {
                let shapeRows = Object.assign({}, rows); // イミュータブルにする
                for (let key in shapeRows) {
                    if (key.indexOf('【RB】') !== -1) {
                        delete shapeRows[key];
                    }
                }
                shapeRows['sub'] = subData[index];
                return shapeRows;
            });
            setHeader(Object.keys(mainData[0]));
            setData(mainData);
        } catch (e) {
            alert(e);
        }
    };

    const putWKOrder = async (json) => {
        // waitCircleRef.current.handleOpen();
        let errCnt = '';
        const toastId = toast.loading('インポート中...');
        for (let i = 0; i < json['クール区分'].length; i++) {
            let inquiry_no = json['問合せNo'][i];
            let shipment_no = json['注文番号'][i];
            await axios
                .put(
                    import.meta.env.VITE_DOMAIN +
                        `/api/${pageType}/inquiryno/${selectDate}`,
                    {
                        inquiry_no: inquiry_no,
                        shipment_no: shipment_no,
                    }
                )
                .then((response) => {})
                .catch((e) => {
                    if (e.response == null) {
                        return (errCnt = '接続がタイムアウトしました。');
                    }
                    const errors = e.response.data;
                    return (errCnt = errors.message);
                })
                .finally(() => {});
        }

        if (errCnt == '') toast.success('インポート完了。', { id: toastId });
        else toast.error(errCnt, { id: toastId });
        tsubushi();
        setJson(null);
    };
    const tsubushi = async () => {
        await axios
            .get(
                import.meta.env.VITE_DOMAIN +
                    `/api/${pageType}/tsubushi/${selectDate}`
            )
            .then((response) => {
                shapeData(response.data.return);
            })
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
