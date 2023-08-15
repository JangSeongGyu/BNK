import { useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FunctionList from './FunctionList';
import HeaderDrawer from './HeaderDrawer';

const Header = (props) => {
    const pageType = props.pageType;
    const page = props.page;
    const [title, SetTitle] = useState('');
    const disableList = props.disableList;
    const drawerRef = useRef('');

    useEffect(() => {
        if (pageType == 'supermarket') SetTitle('スーパーマーケット');
        else if (pageType == 'taxi') SetTitle('タクシー');
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ color: 'primary.dark' }} position="static">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() =>
                            drawerRef.current.handleClickOpen(pageType)
                        }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        fontWeight={'bold'}
                        color="inherit"
                        component="div"
                    >
                        Rakuten業務SYS {title}
                    </Typography>
                </Toolbar>
                {disableList == true ? (
                    <></>
                ) : (
                    <FunctionList pageType={pageType} page={page} />
                )}
            </AppBar>

            <HeaderDrawer ref={drawerRef} />
        </Box>
    );
};

export default Header;
