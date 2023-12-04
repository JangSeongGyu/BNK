import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const MainGame1Result = (props) => {
    const src = props.src;
    useEffect(() => {
        axios.post('/api/main/change-game', {
            currentGame: 0,
        });
    }, []);

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
            ></Box>
        </Box>
    );
};
export default MainGame1Result;
