import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useImperativeHandle,
    forwardRef,
    useRef,
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
import { blue, green, grey, red } from '@mui/material/colors';
import DesignOption from '../../Design/DesignOption';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const BtnOption = DesignOption('BtnOption');
const dialogYes = DesignOption('dialogYes');
const dialogNo = DesignOption('dialogNo');

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
    // border: '1px dashed  #00f',
    // ':hover': { border: '2px solid  #f0f' },
};
const borderDragStyle = {
    width: 400,
    height: 400,
    border: '1px outset  #00f',
};

const ImportDialog = forwardRef((props, ref) => {
    // ダイアログの開閉
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            handleClickOpen() {
                setOpen(true);
            },
        };
    });
    const handleClose = () => {
        inputRef.current.value = '';
        setFile('');
        setOpen(false);
    };

    // Config
    const [file, setFile] = useState('');
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
    }, []);

    const arrayPush = (array, value) => {
        array.push(value);
        return array;
    };

    const InputChange = (event) => {
        const { files } = event.target;
        console.log(files[0]);
        if (files.length > 0) {
            setFile(files[0]);
        }
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
                <Box px={3} py={2}>
                    <Box>
                        <Typography mb={1} fontWeight={'bold'} fontSize={30}>
                            インポートファイル
                        </Typography>
                        {/* <Typography>(.csv)をドラッグ＆ドロップ</Typography>
                        <Typography>
                            またはクリックして選択してください。
                        </Typography> */}
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                border: 1,
                                backgroundColor: grey[100],
                                borderColor: grey[500],
                                borderStyle: 'dashed',
                                ':hover': {
                                    borderColor: blue[700],
                                    borderStyle: 'solid',
                                    backgroundColor: grey[300],
                                },
                            }}
                        >
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
                                        {/* {file != null ? (
                                        <> 選択したファイル名：{file.name}</>
                                    ) : (
                                        ''
                                    )} */}
                                        <FileDownloadIcon
                                            sx={{
                                                fontSize: 80,
                                                color: grey[500],
                                            }}
                                        />

                                        <Typography
                                            fontSize={14}
                                            textAlign={'center'}
                                            fontWeight={'bold'}
                                        >
                                            {file == '' || file == null ? (
                                                <>
                                                    ファイルをドラッグ&ドロップしてください。
                                                    <br />
                                                    または、ここをクリックするとダイアログが開きます。
                                                </>
                                            ) : (
                                                <>{file.name}</>
                                            )}
                                        </Typography>
                                    </Box>
                                </div>
                            </label>
                        </Box>
                        <input
                            id={'inputId'}
                            ref={inputRef}
                            style={{ display: 'none' }}
                            type="file"
                            accept="text/csv"
                            onChange={(event) => InputChange(event)}
                        />

                        <Box display={'flex'} gap={1} mt={2}>
                            <Button sx={dialogNo} onClick={handleClose}>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    キャンセル
                                </Typography>
                            </Button>
                            <Button
                                sx={dialogYes}
                                onClick={() => {
                                    handleClose();
                                    setParent();
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    適用
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
});

export default ImportDialog;
