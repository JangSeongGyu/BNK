import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../image/white_logo.png';

import prizeIntro1 from '../image/prizeIntro1.jpg';
import prizeIntro2 from '../image/prizeIntro2.jpg';
import rule from '../image/rule.jpg';
import rule2 from '../image/rule2.jpg';
import qrcode from '../image/qrcode.jpg';
import gamecorner from '../image/gamecorner.jpg';
import toreca from '../image/toreca.jpg';
import atuatu from '../image/atuatu.jpg';
import calc from '../image/calc.jpg';

import game1 from '../image/game1.jpg';
import game2 from '../image/game2.jpg';
import game3 from '../image/game3.jpg';
import game4 from '../image/game4.jpg';
import game5 from '../image/game5.jpg';

import game6_0 from '../image/game6_0.jpg';
import game6_1 from '../image/game6_1.jpg';
import game6_2 from '../image/game6_2.jpg';
import game7_0 from '../image/game7_0.jpg';
import game7_1 from '../image/game7_1.jpg';
import game7_2 from '../image/game7_2.jpg';
import game8_0 from '../image/game8_0.jpg';
import game8_1 from '../image/game8_1.jpg';
import game8_2 from '../image/game8_2.jpg';

import game1_result from '../image/game1_result.jpg';
import game2_result from '../image/game2_result.jpg';
import game3_result from '../image/game3_result.jpg';
import game4_0_result from '../image/game4_0_result.jpg';
import game4_1_result from '../image/game4_1_result.jpg';
import game5_0_result from '../image/game5_0_result.jpg';
import game5_1_result from '../image/game5_1_result.jpg';
import game5_2_result from '../image/game5_2_result.jpg';
import game6_result from '../image/game6_result.jpg';
import game7_result from '../image/game7_result.jpg';
import game8_result from '../image/game8_result.jpg';
import prizeResult1 from '../image/prizeResult1.jpg';
import prizeResult2 from '../image/prizeResult2.jpg';
import prizeResult3 from '../image/prizeResult3.jpg';
import prizeResult4 from '../image/prizeResult4.jpg';
import prizeResult5 from '../image/prizeResult5.jpg';

import MainGame1 from './MainGame1';
import MainGame1Answer from './MainGame1Answer';
import ShowPicture from './ShowPicture';
import MainGame2Answer from './MainGame2Answer';
import Game2Start from './Game2Start';
import movie_start from '../image/movie_start.jpg';
import MainGame2Result from './MainGame2Result';

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
                        game5
                    >
                        お疲れ様でした！
                    </Typography>
                </Box>
            );
        } else if (params.task == 2) {
            return <ShowPicture src={gamecorner} />;
        } else if (params.task == 3) {
            return <ShowPicture src={prizeIntro1} />;
        } else if (params.task == 4) {
            return <ShowPicture src={prizeIntro2} />;
        } else if (params.task == 5) {
            return <ShowPicture src={qrcode} />;
        } else if (params.task == 6) {
            return <ShowPicture src={atuatu} />;
        } else if (params.task == 7) {
            return <ShowPicture src={rule} />;
        } else if (params.task == 8) {
            return <MainGame1 currentGame={1} src={game1} start={80} />;
        } else if (params.task == 9) {
            return <ShowPicture src={game1_result} />;
        } else if (params.task == 10) {
            return <MainGame1Answer currentGame={1} />;
        } else if (params.task == 11) {
            return <MainGame1 currentGame={2} src={game2} start={80} />;
        } else if (params.task == 12) {
            return <ShowPicture src={game2_result} />;
        } else if (params.task == 13) {
            return <MainGame1Answer currentGame={2} />;
        } else if (params.task == 14) {
            return <MainGame1 currentGame={3} src={game3} start={80} />;
        } else if (params.task == 15) {
            return <ShowPicture src={game3_result} />;
        } else if (params.task == 16) {
            return <MainGame1Answer currentGame={3} />;
        } else if (params.task == 17) {
            return <MainGame1 currentGame={4} src={game4} start={80} />;
        } else if (params.task == 18) {
            return <ShowPicture src={game4_0_result} />;
        } else if (params.task == 19) {
            return <ShowPicture src={game4_1_result} />;
        } else if (params.task == 20) {
            return <MainGame1Answer currentGame={4} />;
        } else if (params.task == 21) {
            return <MainGame1 currentGame={5} src={game5} start={80} />;
        } else if (params.task == 22) {
            return <ShowPicture src={game5_0_result} />;
        } else if (params.task == 23) {
            return <ShowPicture src={game5_1_result} />;
        } else if (params.task == 24) {
            return <ShowPicture src={game5_2_result} />;
        } else if (params.task == 25) {
            return <MainGame1Answer currentGame={5} />;
        }
        //       Game 2
        else if (params.task == 26) {
            return <ShowPicture src={rule2} />;
        } else if (params.task == 27) {
            return <Game2Start currentGame={6} src={movie_start} />;
        } else if (params.task == 28) {
            return (
                <MainGame1
                    currentGame={6}
                    src={game6_0}
                    nowPage={0}
                    start={-1}
                />
            );
        } else if (params.task == 29) {
            return (
                <MainGame1
                    currentGame={6}
                    src={game6_1}
                    nowPage={1}
                    start={-1}
                />
            );
        } else if (params.task == 30) {
            return (
                <MainGame1
                    currentGame={6}
                    src={game6_2}
                    nowPage={2}
                    start={30}
                />
            );
        } else if (params.task == 31) {
            return <MainGame2Result src={game6_result} />;
        } else if (params.task == 32) {
            return <MainGame2Answer currentGame={6} />;
        } else if (params.task == 33) {
            return <Game2Start currentGame={7} src={movie_start} />;
        } else if (params.task == 34) {
            return (
                <MainGame1
                    currentGame={7}
                    src={game7_0}
                    nowPage={0}
                    start={-1}
                />
            );
        } else if (params.task == 35) {
            return (
                <MainGame1
                    currentGame={7}
                    src={game7_1}
                    nowPage={1}
                    start={-1}
                />
            );
        } else if (params.task == 36) {
            return (
                <MainGame1
                    currentGame={7}
                    src={game7_2}
                    nowPage={2}
                    start={30}
                />
            );
        } else if (params.task == 37) {
            return <MainGame2Result src={game7_result} />;
        } else if (params.task == 38) {
            return <MainGame2Answer currentGame={7} />;
        } else if (params.task == 39) {
            return <Game2Start currentGame={8} src={movie_start} />;
        } else if (params.task == 40) {
            return (
                <MainGame1
                    currentGame={8}
                    src={game8_0}
                    nowPage={0}
                    start={-1}
                />
            );
        } else if (params.task == 41) {
            return (
                <MainGame1
                    currentGame={8}
                    src={game8_1}
                    nowPage={1}
                    start={-1}
                />
            );
        } else if (params.task == 42) {
            return (
                <MainGame1
                    currentGame={8}
                    src={game8_2}
                    nowPage={2}
                    start={30}
                />
            );
        } else if (params.task == 43) {
            return <MainGame2Result src={game8_result} />;
        } else if (params.task == 44) {
            return <MainGame2Answer currentGame={8} />;
        }

        // 景品紹介
        else if (params.task == 45) {
            return <ShowPicture src={calc} />;
        
        } else if (params.task == 46) {
            return <ShowPicture src={toreca} />;
        } else if (params.task >= 47) {
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
                        game5
                    >
                        お疲れ様でした！
                    </Typography>
                </Box>
            );
        }
        // } else if (params.task == 46) {
        //     return <ShowPicture src={prizeResult2} />;
        // } else if (params.task == 47) {
        //     return <ShowPicture src={prizeResult3} />;
        // } else if (params.task == 48) {
        //     return <ShowPicture src={prizeResult4} />;
        // } else if (params.task == 49) {
        //     return <ShowPicture src={prizeResult5} />;
        // }
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
