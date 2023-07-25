import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FunctionList from '../components/FunctionList';
import { blue } from '@mui/material/colors';

const Header = (props) => {
    const pageType = props.pageType;
    const [title, SetTitle] = useState('');
    const disableList = props.disableList;

    useEffect(() => {
        if (pageType == 'supermarket') SetTitle('スーパーマーケット');
        else if (pageType == 'taxi') SetTitle('タクシー');
        else if (pageType == 'eagles') SetTitle('イーグルス');
        console.log(pageType);
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
                {disableList != 'false' && <FunctionList />}
            </AppBar>
        </Box>
    );
};

export default Header;
