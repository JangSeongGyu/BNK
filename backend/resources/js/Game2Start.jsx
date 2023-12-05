import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

const Game2Start = (props) => {
    const src = props.src;
    const currentGame = props.currentGame;
    useEffect(() => {
        console.log('chenge', currentGame);
        axios.post('/api/main/change-game', {
            currentGame: currentGame,
        });
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    p: 2,
                }}
                component={'img'}
                src={src}
            />
        </Box>
    );
};
export default Game2Start;
