import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FunctionList from '../components/FunctionList';

const Header = (props) => {
    const title = props.title;
    const disableList = props.disableList;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Rakuten業務SYS {title}
                    </Typography>
                </Toolbar>
                {disableList != 'false' && <FunctionList />}
            </AppBar>
        </Box>
    );
};

export default Header;
