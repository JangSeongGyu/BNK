import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../image/white_logo.png';
import game1Introduce from '../image/game1Introduce.jpg';

import game1_1 from '../image/game1_1.jpg';
import game1_2 from '../image/game1_2.jpg';
import game1_3 from '../image/game1_3.jpg';
import game1_4 from '../image/game1_4.jpg';
import game1_5 from '../image/game1_5.jpg';
import game1_1_result from '../image/game1_1_result.jpg';
import game1_2_result from '../image/game1_2_result.jpg';
import game1_3_result from '../image/game1_3_result.jpg';
import game1_4_result from '../image/game1_4_result.jpg';
import game1_5_result from '../image/game1_5_result.jpg';

import MainGame1 from './MainGame1';
import MainGame1Answer from './MainGame1Answer';
import MainGame1Result from './MainGame1Result';
import MainGame2Result from './MainGame1Result';
import MainGame2Answer from './MainGame2Answer';

const Main = () => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('currentPage = ', params.task);
    }, [params]);

    const ClickMain = () => {
        navigate('/main/' + Number(parseInt(params.task) + 1));
    };

    const Pages = () => {
        if (params.task == 1) {
            return (
                <Box
                    sx={{
                        width: '70%',
                        height: '80%',
                        border: 20,
                        borderColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            minWidth: 300,
                            maxWidth: 400,
                        }}
                        component={'img'}
                        src={logo}
                    />
                    <Typography
                        sx={{
                            mt: -5,
                            fontSize: 100,
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        2023 忘年会
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        お疲れ様でした！
                    </Typography>
                </Box>
            );
        } else if (params.task == 2) {
            return <MainGame1 currentGame={1} src={game1_1} />;
        } else if (params.task == 3) {
            return <MainGame1Result src={game1_1_result} />;
        } else if (params.task == 4) {
            return <MainGame1Answer currentGame={1} />;
        } else if (params.task == 5) {
            return <MainGame1 currentGame={2} src={game1_2} />;
        } else if (params.task == 6) {
            return <MainGame1Result src={game1_2_result} />;
        } else if (params.task == 7) {
            return <MainGame1Answer currentGame={2} />;
        } else if (params.task == 8) {
            return <MainGame1 currentGame={3} src={game1_3} />;
        } else if (params.task == 9) {
            return <MainGame1Result src={game1_3_result} />;
        } else if (params.task == 10) {
            return <MainGame1Answer currentGame={3} />;
        } else if (params.task == 11) {
            return <MainGame1 currentGame={4} src={game1_4} />;
        } else if (params.task == 12) {
            return <MainGame1Result src={game1_4_result} />;
        } else if (params.task == 13) {
            return <MainGame1Answer currentGame={4} />;
        } else if (params.task == 14) {
            return <MainGame1 currentGame={5} src={game1_5} />;
        } else if (params.task == 15) {
            return <MainGame1Result src={game1_5_result} />;
        } else if (params.task == 16) {
            return <MainGame1Answer currentGame={5} />;
        }
        //       Game 2
        else if (params.task == 17) {
            return <MainGame1 currentGame={6} src={game1_5} />;
        } else if (params.task == 18) {
            return <MainGame2Result src={game1_5_result} />;
        } else if (params.task == 19) {
            return <MainGame2Answer currentGame={6} />;
        }
    };

    return (
        <Box
            onClick={() => {
                ClickMain();
            }}
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
            <Pages />
        </Box>
    );
};
export default Main;
