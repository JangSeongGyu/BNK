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
import { Box, Input, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
};
const borderNormalStyle = {
    width: 400,
    height: 400,
    border: '1px dotted #888',
};
const borderDragStyle = {
    width: '100%',
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
                    encoding: 'SHIFT-JIS',
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
        console.log(acceptedFiles);
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

    const arrayPush = (array, value) => {
        array.push(value);
        return array;
    };

    const InputChange = (event) => {
        const { files } = event.target;
        setFile(files[0]);
    };

    const setParent = () => {
        const jsonP = JSON.parse(json);
        const dict = {};
        jsonP.forEach((obj) => {
            Object.keys(obj).forEach((key) => {
                var array = dict[key]
                    ? arrayPush(dict[key], obj[key])
                    : arrayPush([], obj[key]);
                dict[key] = array;
            });
        });
        setFile('');
        setJson('');
        props.setJson(dict);
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
            >
                <Box p={3}>
                    <Box>
                        <Typography fontWeight={'bold'} fontSize={30}>
                            インポートファイル
                        </Typography>
                        <Typography>(.csv)をドラッグ＆ドロップ</Typography>
                        <Typography>
                            またはダイアログから選択してください。
                        </Typography>
                    </Box>
                    <Box>
                        <label htmlFor="inputId">
                            <div {...getRootProps({ style })}>
                                {/* <Input{...getInputProps()} /> */}
                                <Box
                                    height={'100%'}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    flexDirection={'column'}
                                >
                                    <Typography fontWeight={'bold'}>
                                        ファイルをどドラッグ&ドロップしてください。
                                    </Typography>
                                </Box>
                            </div>
                        </label>
                        {/* {file != null ? (
                                        <> 選択したファイル名：{file.name}</>
                                    ) : (
                                        ''
                                    )} */}

                        <Box width={'100%'}>
                            <Button width={'100%'} onClick={handleClose}>
                                キャンセル
                            </Button>
                            <Button
                                width={'100%'}
                                onClick={() => {
                                    handleClose();
                                    setParent();
                                }}
                            >
                                適用
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
});

export default ImportDialog;
