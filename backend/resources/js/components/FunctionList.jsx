import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FunctionList = () => {
    const page = { 0: '/import', 1: '/importa' };
    const [value, setValue] = React.useState(0);

    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`/beauty${page[newValue]}`);
    };
    return (
        <Box
            sx={{
                width: (Theme) => Theme.spacing(30),
            }}
        >
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    orientation="vertical"
                >
                    <Tab label="カレンダー" />
                    <Tab label="マスタ" />
                </Tabs>
            </Box>
        </Box>
    );
};

export default FunctionList;
