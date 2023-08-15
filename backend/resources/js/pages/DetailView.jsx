import React, { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Box,
    Button,
    Divider,
    TextField,
    ButtonBase,
} from '@mui/material';
import { cyan, grey, pink } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DetailRow from '../components/DetailComponent/DetailRow';

const rowWidth = [140, 300, 300, 100, 50, 150, 150];
let minWidth = 0;

rowWidth.forEach((w) => {
    minWidth += w;
});

const rowHeaderOption = (index) => {
    return {
        minWidth: rowWidth[index],
        width: `${rowWidth[index]}%`,
        fontSize: 20,
        py: 1,
        fontWeight: 'bold',
        // color: 'white',
        // borderBottom: 1,
        borderColor: grey[600],
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
            <Box
                zIndex={1}
                backgroundColor={'black'}
                color={'white'}
                minWidth={minWidth}
                position={'sticky'}
                top={0}
                display={'flex'}
            >
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
            let bgColor = 'white';
            if (index % 2 == 0) bgColor = grey[100];
            html.push(
                <DetailRow
                    data={data}
                    bgColor={bgColor}
                    minWidth={minWidth}
                    rowWidth={rowWidth}
                    pageType={pageType}
                    index={index}
                />
            );
        });

        return html;
    };

    return (
        <Box
            width={'100%'}
            backgroundColor={grey[200]}
            display={'flex'}
            flexDirection={'column'}
            height={'100%'}
        >
            {/* HEADER ======================================== */}
            <Box
                sx={{
                    height: '70',
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
                m={2}
                // px={2}
                borderColor={grey[400]}
                boxShadow={2}
                backgroundColor={'white'}
                height={'100%'}
                overflow={'auto'}
            >
                <Rows />
            </Box>
        </Box>
    );
};
export default DetailView;
