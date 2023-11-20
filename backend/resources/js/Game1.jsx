import { Box, Button, Grid, Slide, Typography, colors } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import logo from '../image/white_logo.png';
import axios from 'axios';
import GameData from './GameData';

const Game1 = (props) => {
    const [quizSelected, SetQuizSelected] = useState(5);
    const pageTask = props.pageTask;

    // useEffect(() => {
    //     axios
    //         .get(`/api/game1/result/${props.table_id}`)
    //         .then((res) => {});
    // }, [CurrentGame]);

    const SendResult = () => {
        axios.post('/api/game1/save', {
            table_id: props.table_id,
            answer: quizSelected,
        });
    };

    const quizBoxOption = (count) => {
        let border = 0;
        if (count == quizSelected) {
            border = 2;
        }

        return {
            width: '100%',
            height: '100%',
            backgroundColor: 'primary.glass',
            boxShadow: 2,
            border: [border],
            borderColor: red[500],
        };
    };

    return (
        <Slide direction={'right'} in={pageTask == 1} timeout={1000}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}
            >
                <Box sx={{ width: '100%', height: '80%' }}>
                    <Grid container sx={{ width: '100%', height: '100%' }}>
                        <Grid xs={6} p={1}>
                            <Box
                                // component={'img'}
                                // src={gameData.image}
                                sx={quizBoxOption(0)}
                                onClick={() => {
                                    SetQuizSelected(0);
                                }}
                            >
                                A
                            </Box>
                        </Grid>
                        <Grid xs={6} p={1}>
                            <Box
                                sx={quizBoxOption(1)}
                                onClick={() => {
                                    SetQuizSelected(1);
                                }}
                            >
                                B
                            </Box>
                        </Grid>
                        <Grid xs={6} p={1}>
                            <Box
                                sx={quizBoxOption(2)}
                                onClick={() => {
                                    SetQuizSelected(2);
                                }}
                            >
                                C
                            </Box>
                        </Grid>
                        <Grid xs={6} p={1}>
                            <Box
                                sx={quizBoxOption(3)}
                                onClick={() => {
                                    SetQuizSelected(3);
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
