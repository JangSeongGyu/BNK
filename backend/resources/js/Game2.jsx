import {
    Box,
    Button,
    ButtonBase,
    Grid,
    Input,
    Slide,
    TextField,
    Typography,
    colors,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import logo from '../image/white_logo.png';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

import GameData from './GameData';
import LoadingBar from './LoadingBar';
import { toast } from 'react-hot-toast';

const Game2 = (props) => {
    const [inputData, setInputData] = useState('');
    const pageTask = props.pageTask;
    const [loading, setLoading] = useState(false);
    const SendResult = () => {
        setLoading(true);
        axios
            .post('/api/game1/save', {
                table_id: props.table_id,
                answer: inputData,
            })
            .then((res) => {
                toast.success('提出完了');
                setInputData('');
                setLoading(false);
            })
            .catch((err) => {
                toast.error('提出失敗');
                setInputData('');
                setLoading(false);
            });
    };

    return (
        <Slide direction={'right'} in={pageTask == 2} timeout={500}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}
            >
                <LoadingBar loading={loading} isBg={true} text={'提出中…'} />
                <Box
                    sx={{
                        width: '100%',
                        height: '5%',
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: 1,
                        borderColor: grey[400],
                    }}
                    onClick={() => {
                        props.EndGame1();
                    }}
                >
                    <ArrowBackIcon sx={{ fontSize: 28 }} />
                    <Typography fontWeight={'bold'} fontSize={20}>
                        ゲーム選択画面に戻る
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '75%',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        p: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', mb: 1 }}>
                        <Typography sx={{ fontSize: 20 }}>答えを</Typography>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: red[600],
                            }}
                        >
                            ひらがな
                        </Typography>
                        <Typography sx={{ fontSize: 20 }}>
                            で書いてください
                        </Typography>
                    </Box>

                    <Input
                        sx={{
                            bgcolor: grey[100],
                            borderRadius: 4,
                            width: '100%',
                            height: 50,
                            px: 2,
                        }}
                        placeholder="入力してください。"
                        disableUnderline={true}
                        value={inputData}
                        onChange={(e) => {
                            setInputData(e.target.value);
                        }}
                    />
                </Box>
                <Box sx={{ width: '100%', height: '20%', p: 1 }}>
                    <ButtonBase sx={{ width: '100%', height: '100%' }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 2,
                                backgroundColor: 'black',
                                color: 'white',
                            }}
                            onClick={() => {
                                SendResult();
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                }}
                            >
                                提出！
                            </Typography>
                        </Box>
                    </ButtonBase>
                </Box>
            </Box>
        </Slide>
    );
};
export default Game2;
