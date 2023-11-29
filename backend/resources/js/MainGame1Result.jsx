import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const MainGame2Result = (props) => {
    const src = props.src;

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
export default MainGame2Result;
