import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MainGame1 = (props) => {
    const src = props.src;
    const currentGame = props.currentGame;
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        axios.post('/api/main/change-game', {
            currentGame: currentGame,
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const getTime = () => {
        if (timer > 0) setTimer(timer - 1);
    };

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    p: 2,
                }}
                component={'img'}
                src={src}
            />
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 30,
                }}
            >
                <Typography sx={{ fontSize: 90 }}>{timer}</Typography>
            </Box>
        </Box>
    );
};
export default MainGame1;
