import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import WaitCircle from '../../components/WaitCircle';
import ImportDialog from '../../components/Import/ImportDialog';
import ImportTable from '../../components/Import/ImportTable';
import axios from 'axios';

const BeautyImport = () => {
    const importDialogRef = useRef();
    const waitCircleRef = useRef();
    const [json, setJson] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (json != null) {
            waitCircleRef.current.handleOpen();
            axios
                .put('http://192.168.150.196:8080/api/orders', json)
                .then((response) => setData(response.data))
                .catch((e) => {
                    if (e.response == null) {
                        alert('接続がタイムアウトしました。');
                        return;
                    }
                    if (e.response.status == 422) {
                        const errors = e.response.data.errors;
                        alert(errors);
                    }
                    if (e.response.status >= 500) {
                        const errors = e.response.data;
                        console.log(errors);
                        alert(errors.message);
                    }
                })
                .finally(() => waitCircleRef.current.handleClose());
            setJson(null);
        }
    }, [json]);

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
            <ImportTable />
        </>
    );
};

export default BeautyImport;
