import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Beauty = () => {
    return (
        <>
            <Box sx={{ display: 'block' }}>
                <Box
                    sx={{
                        // width: {
                        //     xs: 400,
                        //     sm: 700,
                        //     md: 1000,
                        //     lg: 1200,
                        //     xl: 1600,
                        // },
                        // height: (Theme) => Theme.spacing(95),
                        // my: 3,
                        mx: 2,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default Beauty;
