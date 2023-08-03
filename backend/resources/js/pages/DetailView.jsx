import React, { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Box,
    Button,
    Divider,
    TextField,
    ButtonBase,
    Collapse,
} from '@mui/material';
import Header from '../components/Header';
import { blue, green, grey, pink, red } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// const rowWidth = [200, 400, 500, 260, 100, 226, 200];
const rowWidth = [140, 300, 300, 100, 50, 150, 120];
let maxWidth = 0;
const rowHeaderOption = (index) => {
    return {
        minWidth: rowWidth[index],
        width: `${rowWidth[index]}%`,
        // maxWidth: rowWidth[index],
        fontSize: 20,
        py: 0.5,
        backgroundColor: grey[700],
        color: 'white',
    };
};
const rowBodyOption = (index) => {
    return {
        minWidth: rowWidth[index],
        width: `${rowWidth[index]}%`,
        display: 'flex',
        alignItems: 'center',
        colorOption: 'black',
        borderBottom: 1,
        borderColor: grey[400],
        py: 2,
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
        maxWidth = 0;
        rowWidth.forEach((w) => {
            maxWidth += w;
        });
        const toastId = toast.loading('明細データ取得中...');
        axios
            .get(`/api/${pageType}/dailydata/${selectDate}`)
            .then((res) => {
                console.log(res.data);
                SetTableDatas(res.data);

                toast.success('明細データ取得完了。', { id: toastId });
            })
            .catch((e) => {
                errMsg = e.response.data.message;
                if (!e) toast.error('サーバ接続失敗', { id: toastId });
                else toast.error(errMsg, { id: toastId });
            });
    }, []);

    const openRow = (index) => {
        // if (isOpen[index] != null)
        if (isOpen[index])
            SetIsOpen((prevState) => ({ ...prevState, [index]: false }));
        else SetIsOpen((prevState) => ({ ...prevState, [index]: true }));

        console.log(isOpen);
    };

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

    const Row = (data, index) => {
        let rowCnt = 0;
        return (
            <Box onClick={() => openRow(index)} key={data.id}>
                <Box
                    sx={{
                        display: 'flex',
                        width: { xs: maxWidth, lg: '100%' },
                        backgroundColor: grey[100],
                        ':hover': { backgroundColor: grey[300] },
                    }}
                >
                    <Typography pl={1} sx={rowBodyOption(rowCnt++)}>
                        {data.ショップコード}
                    </Typography>
                    <Typography sx={rowBodyOption(rowCnt++)}>
                        {data.シーン名}
                        <br />
                        {data.店舗名}
                    </Typography>
                    <Typography sx={rowBodyOption(rowCnt++)}>
                        {data.納品先会社名}
                        <br />
                        {data.納品先住所}
                    </Typography>
                    <Typography sx={rowBodyOption(rowCnt++)}>
                        {data.納品先宛名}
                    </Typography>

                    <Typography sx={rowBodyOption(rowCnt++)}>
                        {data.数量}
                    </Typography>
                    <Typography sx={rowBodyOption(rowCnt++)}>
                        {data.出荷番号}
                    </Typography>
                    <Typography sx={rowBodyOption(rowCnt++)}>
                        {data.問い合わせ番号}
                    </Typography>
                </Box>
            </Box>
        );
    };

    const MRowBoxOption = {
        width: 400,
        display: 'flex',
        justifyContent: 'center',
        borderBottom: 1,
        py: 0.5,
        borderColor: grey[400],
    };

    const LeftContentOption = {
        width: '45%',
    };
    const RightContentOption = {
        width: '45%',
    };

    const MoreRow = (data, index) => {
        return (
            <Box borderColor={grey[400]}>
                <Box display={'flex'}>
                    <Box my={3} px={2}>
                        <Typography fontSize={20} fontWeight={'bold'}>
                            Sub Infomation
                        </Typography>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                問い合わせ番号
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.問い合わせ番号}
                            </Typography>
                        </Box>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                店舗コード
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.店舗コード}
                            </Typography>
                        </Box>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                シーンコード
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.シーンコード}
                            </Typography>
                        </Box>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                シーン名
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.シーン名}
                            </Typography>
                        </Box>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                注文明細No
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.注文明細No}
                            </Typography>
                        </Box>
                    </Box>

                    {/* 2番ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
                    <Box my={3} px={2}>
                        <Typography
                            height={30}
                            fontSize={20}
                            fontWeight={'bold'}
                        ></Typography>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                納品予定日
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.納品予定日}
                            </Typography>
                        </Box>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                出荷指示フラグ
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.出荷指示フラグ}
                            </Typography>
                        </Box>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                一次梱包フラグ
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.一次梱包フラグ}
                            </Typography>
                        </Box>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                二次梱包フラグ
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.二次梱包フラグ}
                            </Typography>
                        </Box>
                        <Box sx={MRowBoxOption}>
                            <Typography sx={LeftContentOption}>
                                SFフラグ
                            </Typography>
                            <Typography sx={RightContentOption}>
                                {data.SFフラグ}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    };

    const Rows = () => {
        let html = [];

        html.push(RowHeader());
        tableDatas.forEach((data, index) => {
            html.push(Row(data, index));
            if (isOpen[index]) html.push(MoreRow(data, index));
        });

        return html;
    };

    return (
        <Box width={'100%'} height={'100%'}>
            {/* HEADER ======================================== */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    color: 'primary.dark',
                    backgroundColor: 'primary.main',
                    borderBottom: 1,
                    py: 1,
                    px: 1,
                }}
            >
                <ButtonBase
                    color="black"
                    onClick={() => {
                        navigate('/supermarket');
                    }}
                >
                    <Box
                        sx={{ ':hover': { color: grey[300] } }}
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <ArrowBackIcon sx={{ fontSize: 32 }} />
                        <Typography fontWeight={'bold'} fontSize={24}>
                            戻る
                        </Typography>
                    </Box>
                </ButtonBase>
            </Box>

            <Typography fontSize={40} ml={4} my={1}>
                出荷日：{selectDate}
            </Typography>

            <Box
                border={1}
                backgroundColor={'white'}
                mx={2}
                height={'80%'}
                overflow={'auto'}
            >
                <Rows />
            </Box>
        </Box>
    );
};
export default DetailView;
