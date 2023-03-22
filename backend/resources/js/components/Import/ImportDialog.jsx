import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useImperativeHandle,
    forwardRef,
} from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { parse } from 'papaparse';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 800,
    height: 600,
};
const borderNormalStyle = {
    border: '1px dotted #888',
};
const borderDragStyle = {
    border: '1px solid #00f',
    transition: 'border .5s ease-in-out',
};

const ImportDialog = forwardRef((props, ref) => {
    // ダイアログの開閉
    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => {
        return {
            handleClickOpen() {
                setOpen(true);
            },
        };
    });
    const handleClose = () => {
        setOpen(false);
    };

    // Config
    const [file, setFile] = useState(null);
    const [json, setJson] = useState('');
    const handleFileChange = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
        }
    };

    useEffect(() => {
        if (file instanceof File) {
            // csv->json
            if (file.type == 'text/csv') {
                parse(file, {
                    header: true,
                    encoding: 'utf-8',
                    skipEmptyLines: true,
                    complete(results) {
                        const csvData = results.data;
                        const jsonTextFromCSV =
                            csvData.join('') !== ''
                                ? JSON.stringify(csvData)
                                : '';
                        setJson(jsonTextFromCSV);
                    },
                    error() {
                        alert('CSVファイルの読み込みに失敗しました。');
                    },
                });
            }
        }
    }, [file]);

    const onDrop = useCallback((acceptedFiles) => {
        handleFileChange(acceptedFiles);

        // if (
        //     acceptedFiles[0].type ==
        //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        // ) {
        //     var data = new Uint8Array(await acceptedFiles[0].arrayBuffer());
        //     const workbook = XLSX.read(data, {
        //         type: 'array',
        //     });
        //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        //     const jsonTextFromExcel = JSON.stringify(
        //         XLSX.utils.sheet_to_json(worksheet)
        //     );
        //     setJson(jsonTextFromExcel);
        // }
    }, []);

    const setParent = () => {
        props.setJson(json);
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        fileDialog,
        acceptedFiles,
    } = useDropzone({
        onDrop,
        noClick: true,
    });
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? borderDragStyle : borderNormalStyle),
        }),
        [isDragActive]
    );
    const files = useMemo(
        () => acceptedFiles.map((file) => <li key={file.path}>{file.path}</li>),
        [acceptedFiles]
    );

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <p>
                            入稿リスト(csv)をドラッグ＆ドロップ<br></br>
                            またはダイアログから選択してください。<br></br>
                            {file != null ? file.name : ''}
                        </p>
                        <button
                            type="button"
                            onClick={fileDialog}
                            className="btn btn-primary align-self-center"
                        >
                            Select files
                        </button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            setParent();
                        }}
                    >
                        適用
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default ImportDialog;
