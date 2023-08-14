import React, { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Box,
    Button,
    Divider,
    TextField,
    ButtonBase,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DetailRow from '../components/DetailComponent/DetailRow';

// const rowWidth = [200, 400, 500, 260, 100, 226, 200];
const rowWidth = [140, 300, 300, 100, 50, 150, 120];
let maxWidth = 0;
const rowHeaderOption = (index) => {
    return {
        minWidth: rowWidth[index],
        width: `${rowWidth[index]}%`,
        // maxWidth: rowWidth[index],
        fontSize: 18,
        py: 1,
        backgroundColor: grey[600],
        color: 'white',
        borderBottom: 1,
        borderColor: grey[500],
    };
};

// ===================================================================================
const DetailView = (props) => {
    const pageType = props.pageType;
    const { selectDate } = useParams();
    const [tableDatas, SetTableDatas] = useState([]);
    const [isOpen, SetIsOpen] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const toastId = toast.loading('明細データ取得中...');
        axios
            .get(`/api/${pageType}/dailydata/${selectDate}`)
            .then((res) => {
                console.log(res.data);
                SetTableDatas(res.data);

                toast.success('明細データ取得完了。', { id: toastId });
            })
            .catch((e) => {
                let errMsg = '';
                if (e.response == null) {
                    errMsg = '明細サーバー接続失敗。';
                } else {
                    errMsg = e.response.data.message;
                }
                toast.custom(errMsg, { type: 'closeError', id: toastId });
            });
    }, []);

    const RowHeader = () => {
        let rowCnt = 0;
        return (
            <Box zIndex={1} position={'sticky'} top={0} display={'flex'}>
                <Typography pl={1} sx={rowHeaderOption(rowCnt++)}>
                    ショップコード
                </Typography>
                <Typography sx={rowHeaderOption(rowCnt++)}>店舗名</Typography>
                <Typography sx={rowHeaderOption(rowCnt++)}>納品先</Typography>
                <Typography sx={rowHeaderOption(rowCnt++)}>宛名</Typography>
                <Typography sx={rowHeaderOption(rowCnt++)}>数量</Typography>
                <Typography sx={rowHeaderOption(rowCnt++)}>出荷番号</Typography>
                <Typography sx={rowHeaderOption(rowCnt++)}>
                    問い合わせ番号
                </Typography>
            </Box>
        );
    };

    const Rows = () => {
        let html = [];

        html.push(RowHeader());
        tableDatas.forEach((data, index) => {
            html.push(
                <DetailRow data={data} pageType={pageType} index={index} />
            );
        });

        return html;
    };

    // const ColorList = () => {
    //     const BoxOption = {
    //         width: 10,
    //         height: 10,
    //         backgroundColor: grey[200],
    //     };
    //     const textOption = {
    //         fontSize: 12,
    //     };
    //     return (
    //         <Box mb={2} display={'flex'} gap={2}>
    //             <Box display={'flex'}>
    //                 <Box sx={BoxOption}></Box>
    //                 <Typography sx={textOption}>タクシー</Typography>
    //             </Box>
    //             <Box display={'flex'}>
    //                 <Box sx={BoxOption}></Box>
    //                 <Typography sx={textOption}></Typography>
    //             </Box>{' '}
    //             <Box display={'flex'}>
    //                 <Box sx={BoxOption}></Box>
    //                 <Typography sx={textOption}></Typography>
    //             </Box>{' '}
    //             <Box display={'flex'}>
    //                 <Box sx={BoxOption}></Box>
    //                 <Typography sx={textOption}></Typography>
    //             </Box>
    //         </Box>
    //     );
    // };

    return (
        <Box width={'100%'} backgroundColor={grey[200]} height={'100%'}>
            {/* HEADER ======================================== */}
            <Box
                sx={{
                    height: '8%',
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    color: 'primary.dark',
                    backgroundColor: 'primary.main',
                    borderBottom: 1,
                    py: 1,
                    px: 1,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <ButtonBase
                    color="black"
                    onClick={() => {
                        navigate(`/${pageType}`);
                    }}
                >
                    <Box
                        sx={{ ':hover': { color: grey[300] } }}
                        display={'flex'}
                    >
                        <ArrowBackIcon sx={{ fontSize: 32 }} />
                        <Typography fontWeight={'bold'} fontSize={24}>
                            戻る
                        </Typography>
                    </Box>
                </ButtonBase>
                <Typography fontWeight={'bold'} fontSize={24} ml={4}>
                    出荷日：{selectDate}
                </Typography>
            </Box>

            {/* Content */}

            <Box
                border={1}
                borderRadius={2}
                mt={2}
                mx={2}
                borderColor={grey[400]}
                boxShadow={2}
                backgroundColor={'white'}
                height={'88%'}
                overflow={'auto'}
            >
                <Rows />
            </Box>
        </Box>
    );
};
export default DetailView;
