import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';

const FunctionList = (props) => {
    const pageType = props.pageType;
    const page = { 0: '/', 1: '/master' };
    const [value, setValue] = React.useState(props.page);

    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`/${pageType}${page[newValue]}`);
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
                    TabIndicatorProps={{ style: { background: 'white' } }}
                    textColor="inherit"
                >
                    <Tab label="カレンダー" />
                    <Tab label="マスタ" />
                </Tabs>
            </Box>
        </Box>
    );
};

export default FunctionList;
