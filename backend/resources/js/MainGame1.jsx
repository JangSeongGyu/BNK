import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MainGame1 = (props) => {
    const start = props.start;
    const src = props.src;
    const nowPage = props.nowPage;
    const currentGame = props.currentGame;
    const [timer, setTimer] = useState(start);

    useEffect(() => {
        axios.post('/api/main/change-game', {
            currentGame: currentGame,
        });
    }, []);

    useEffect(() => {
        console.log(start);
        if (start != -1) {
            const interval = setInterval(() => getTime(), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const getTime = () => {
        if (timer > 0) setTimer(timer - 1);
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {timer >= 0 && (
                <Typography
                    sx={{
                        position: 'absolute',
                        top: 1,
                        left: 10,
                        fontSize: 60,
                        fontWeight: 'bold',
                    }}
                >
                    {timer}
                </Typography>
            )}

            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    p: 4,
                }}
                component={'img'}
                src={src}
            />
        </Box>
    );
};
export default MainGame1;
