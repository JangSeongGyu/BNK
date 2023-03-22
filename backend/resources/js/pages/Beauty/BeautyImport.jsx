import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import ImportDialog from '../../components/Import/ImportDialog';
import ImportTable from '../../components/Import/ImportTable';

const BeautyImport = () => {
    const importDialogRef = useRef();
    const [json, setJson] = useState(null);
    const [row, setRow] = useState(null);

    useEffect(() => {
        if (json != null) {
            const jsonP = JSON.parse(json);
            console.log(jsonP);
            jsonP.forEach((obj) => {
                Object.keys(obj).forEach((key) => {
                    console.log('key=' + key + ', value=' + obj[key]);
                });
            });
        }
        setRow(json);
    }, [json]);
    return (
        <>
            <Button
                variant="outlined"
                onClick={() => importDialogRef.current.handleClickOpen()}
            >
                入稿CSVをインポート
            </Button>
            <ImportDialog ref={importDialogRef} setJson={setJson} />
            <ImportTable />
        </>
    );
};

export default BeautyImport;
