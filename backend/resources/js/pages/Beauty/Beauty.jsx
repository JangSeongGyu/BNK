import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import FunctionList from '../../components/FunctionList';

const Beauty = () => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'inline-block' }}>
                    <FunctionList />
                </Box>
                <Box
                    sx={{
                        width: {
                            xs: 400,
                            sm: 700,
                            md: 1000,
                            lg: 1200,
                            xl: 1600,
                        },
                        height: (Theme) => Theme.spacing(105),
                        // bgcolor: 'primary.light',
                        // boxShadow: 1,
                        // borderRadius: 2,
                        // border: 1,
                        // borderColor: 'primary.borderColor',
                        my: 3,
                        mx: 2,
                        // display: 'inline-block',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default Beauty;
