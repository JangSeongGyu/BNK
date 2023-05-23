import React, { useState, useRef, useEffect, createContext } from 'react';
import Button from '@mui/material/Button';
import WaitCircle from '../components/WaitCircle';
import ImportDialog from './Import/ImportDialog';
import ImportTable from './Import/ImportTable';
import axios from 'axios';

const BeautyImport = () => {
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
        waitCircleRef.current.handleOpen();
        await axios
            .put('http://192.168.150.196:8080/api/wkorders', json)
            .then((response) => getWKOrder())
            .catch((e) => {
                if (e.response == null) {
                    return alert('接続がタイムアウトしました。');
                }
                if (e.response.status == 422) {
                    const errors = e.response.data.errors;
                    return alert(errors);
                }
                if (e.response.status >= 500) {
                    const errors = e.response.data;
                    return alert(errors.message);
                }
            })
            .finally(() => waitCircleRef.current.handleClose());
        setJson(null);
    };

    const getWKOrder = async () => {
        await axios
            .get('http://192.168.150.196:8080/api/wkorders', json)
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

    useEffect(() => {
        getWKOrder();
    }, []);

    return (
        <>
            <WaitCircle ref={waitCircleRef} />
            <Button
                variant="outlined"
                onClick={() => importDialogRef.current.handleClickOpen()}
                sx={{ my: 3 }}
            >
                入稿CSVをインポート
            </Button>
            <ImportDialog ref={importDialogRef} setJson={setJson} />
            <ImportTable
                header={header}
                rows={data}
                setUpdateData={setUpdateData}
            />
        </>
    );
};

export default BeautyImport;
