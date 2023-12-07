import { Box, Button, Grid, Slide, Typography, colors } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import logo from '../image/white_logo.png';
import axios from 'axios';
import Game1 from './Game1';
import { useNavigate } from 'react-router-dom';
import Game2 from './Game2';

function Home() {
    const [pageTask, SetPageTask] = useState(0);
    const navigate = useNavigate();
    const table_id = localStorage.getItem('table_id');
    useEffect(() => {
        if (table_id == null) navigate('/LoginError');
    }, [table_id]);

    const Test = () => {
        if (pageTask == 0) SetPageTask(1);
        // console.log('print');
    };

    const EndGame1 = () => {
        console.log('endGame1');
        SetPageTask(0);
    };
    const EndGame2 = () => {
        SetPageTask(0);
    };

    return (
        <Box width={'100%'} height={'100%'}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, rgba(118,159,255,1) 0%, rgba(140,249,255,1) 25%, rgba(255,196,161,1) 60%, rgba(202,131,249,1) 85%, rgba(216,74,255,1) 100%)`,
                    objectFit: 'cover',
                    animation: 'test 20s ease infinite',
                    '@keyframes test': {
                        '0%': {
                            backgroundPosition: '0% 50%',
                        },
                        '50%': {
                            backgroundPosition: '100% 50%',
                        },
                        '100%': {
                            backgroundPosition: '0% 50%',
                        },
                    },
                    MozAnimation: 'test2 20s ease infinite',
                    '@keyframes test2': {
                        '0%': {
                            backgroundPosition: '0% 50%',
                        },
                        '50%': {
                            backgroundPosition: '100% 50%',
                        },
                        '100%': {
                            backgroundPosition: '0% 50%',
                        },
                    },
                    WebkitAnimation: 'test3 20s ease infinite',
                    '@keyframes test3': {
                        '0%': {
                            backgroundPosition: '0% 50%',
                        },
                        '50%': {
                            backgroundPosition: '100% 50%',
                        },
                        '100%': {
                            backgroundPosition: '0% 50%',
                        },
                    },
                }}
                style={{ backgroundSize: '1200%' }}
            >
                <Slide direction="down" in={pageTask == 0} timeout={1000}>
                    <Box width={'60%'} height={'60%'}>
                        <Box
                            width={'100%'}
                            alignItems={'center'}
                            display={'flex'}
                            flexDirection={'column'}

                            // boxShadow={1}
                        >
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    width: '100%',
                                    fontSize: 80,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mb: -2,
                                    fontFamily: 'Anton',
                                }}
                            >
                                {table_id}
                            </Typography>                            
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    width: '100%',
                                    fontSize: 80,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mb: -2,
                                    fontFamily: 'Anton',
                                }}
                            >
                                2023
                            </Typography>

                            <Box
                                sx={{
                                    width: '100%',
                                    minWidth: 200,
                                    maxWidth: 300,
                                }}
                                component={'img'}
                                src={logo}
                            />
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    width: '100%',
                                    fontSize: 50,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontFamily: '游ゴシック',
                                }}
                            >
                                忘年会
                            </Typography>
                            <Button
                                sx={{
                                    border: 3,
                                    width: '100%',
                                    height: 80,
                                    borderColor: 'white',
                                    mb: 2,
                                }}
                                onClick={() => {
                                    SetPageTask(1);
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    ゲーム１
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    width: '100%',
                                    border: 3,
                                    height: 80,
                                    borderColor: 'white',
                                }}
                                onClick={() => {
                                    SetPageTask(2);
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    ゲーム２
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Slide>
                <Game1
                    EndGame1={EndGame1}
                    table_id={table_id}
                    pageTask={pageTask}
                />
                <Game2
                    EndGame1={EndGame2}
                    table_id={table_id}
                    pageTask={pageTask}
                />
            </Box>
        </Box>
    );
}
export default Home;
