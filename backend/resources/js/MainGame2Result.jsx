import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MainGame2Result = (props) => {
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
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                }}
                component={'img'}
                src={src}
            />
        </Box>
    );
};
export default MainGame2Result;
