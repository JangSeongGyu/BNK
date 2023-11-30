import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MainGame1 = (props) => {
    const src = props.src;
    const nowPage = props.nowPage;
    const currentGame = props.currentGame;
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        axios.post('/api/main/change-game', {
            currentGame: currentGame,
        });
    }, []);

    // useEffect(() => {
    //     const interval = setInterval(() => getTime(), 1000);
    //     return () => clearInterval(interval);
    // }, [timer]);

    // const getTime = () => {
    //     if (timer > 0) setTimer(timer - 1);
    // };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {nowPage == null && (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        p: 4,
                    }}
                    component={'img'}
                    src={src}
                />
            )}
            {nowPage >= 0 && (
                <Box
                    sx={{
                        width: '100%',
                        height: '32%',
                        p: 2,
                    }}
                    component={'img'}
                    src={src}
                />
            )}
            {nowPage >= 1 && (
                <Box
                    sx={{
                        width: '100%',
                        height: '32%',
                        p: 2,
                    }}
                    component={'img'}
                    src={src}
                />
            )}
            {nowPage >= 2 && (
                <Box
                    sx={{
                        width: '100%',
                        height: '32%',
                        p: 2,
                    }}
                    component={'img'}
                    src={src}
                />
            )}
        </Box>
    );
};
export default MainGame1;
