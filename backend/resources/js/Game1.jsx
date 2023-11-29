import {
    Box,
    Button,
    Grid,
    Icon,
    Slide,
    Typography,
    colors,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import logo from '../image/white_logo.png';
import axios from 'axios';
import GameData from './GameData';
import LoadingBar from './LoadingBar';
import { toast } from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Game1 = (props) => {
    const [quizSelected, SetQuizSelected] = useState(5);
    const [loading, setLoading] = useState(false);
    const pageTask = props.pageTask;

    // useEffect(() => {
    //     axios
    //         .get(`/api/game1/result/${props.table_id}`)
    //         .then((res) => {});
    // }, [CurrentGame]);

    const SendResult = () => {
        setLoading(true);
        axios
            .post('/api/game1/save', {
                table_id: props.table_id,
                answer: quizSelected,
            })
            .then((res) => {
                toast.success('提出完了');
                setLoading(false);
            })
            .catch((err) => {
                toast.error('提出失敗');
                setLoading(false);
            });
    };

    const quizBoxOption = (count) => {
        let boxShadow = `10px 10px 10px #c1c1c1, -10px -10px 10px #ffffff;`;
        if (count == quizSelected) {
            boxShadow = `inset 10px 10px 10px #c1c1c1,inset -10px -10px 10px #ffffff;`;
        }

        return {
            width: '100%',
            height: '100%',
            textAlign: 'center',
            backgroundColor: grey[200],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 100,
            borderColor: red[500],
            borderRadius: 9,
            boxShadow: boxShadow,
        };
    };

    return (
        <Slide direction={'right'} in={pageTask == 1} timeout={1000}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: grey[200],
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
                <Box sx={{ width: '100%', height: '75%' }}>
                    <Grid container sx={{ width: '100%', height: '100%' }}>
                        <Grid xs={6} px={1} py={2}>
                            <Box
                                // component={'img'}
                                // src={gameData.image}
                                sx={quizBoxOption('A')}
                                onClick={() => {
                                    SetQuizSelected('A');
                                }}
                            >
                                A
                            </Box>
                        </Grid>
                        <Grid xs={6} px={1} py={2}>
                            <Box
                                sx={quizBoxOption('B')}
                                onClick={() => {
                                    SetQuizSelected('B');
                                }}
                            >
                                B
                            </Box>
                        </Grid>
                        <Grid xs={6} px={1} py={2}>
                            <Box
                                sx={quizBoxOption('C')}
                                onClick={() => {
                                    SetQuizSelected('C');
                                }}
                            >
                                C
                            </Box>
                        </Grid>
                        <Grid xs={6} px={1} py={2}>
                            <Box
                                sx={quizBoxOption('D')}
                                onClick={() => {
                                    SetQuizSelected('D');
                                }}
                            >
                                D
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ width: '100%', height: '20%', p: 1 }}>
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
                </Box>
            </Box>
        </Slide>
    );
};
export default Game1;
