import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FunctionList from '../components/FunctionList';
import { blue, grey, orange, pink } from '@mui/material/colors';
import { Divider, Drawer } from '@mui/material';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const Header = (props) => {
    let navigate = useNavigate();
    const pageType = props.pageType;
    const page = props.page;
    const [title, SetTitle] = useState('');
    const disableList = props.disableList;
    const [open, setOpen] = useState(false);

    const menuItemOption = () => {
        return {
            borderBottom: 1,
            borderColor: grey[400],
            display: 'flex',
            alignItems: 'center',
            px: 2,
            height: 60,
            ':hover': { backgroundColor: grey[200] },
        };
    };

    const menuItemTextOption = (menuType) => {
        let selectMenu;
        if (pageType == menuType) selectMenu = blue[500];
        else selectMenu = 'black';

        return {
            color: selectMenu,
        };
    };

    const close = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (pageType == 'supermarket') SetTitle('スーパーマーケット');
        else if (pageType == 'taxi') SetTitle('タクシー');
        else if (pageType == 'eagles') SetTitle('イーグルス');
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
                        onClick={() => setOpen(true)}
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
                {disableList != 'false' && (
                    <FunctionList pageType={pageType} page={page} />
                )}
            </AppBar>

            <Drawer open={open} onClose={() => close()}>
                <Box height={'100%'} width={300}>
                    <Box
                        onClick={() => close()}
                        backgroundColor={pink[500]}
                        py={2}
                        boxShadow={2}
                        fontWeight={'bold'}
                        color={'white'}
                        display={'flex'}
                        alignItems={'center'}
                        sx={{
                            ':hover': { background: pink[400] },
                        }}
                    >
                        <ArrowBackIosNewIcon sx={{ fontSize: 30 }} />
                        <Typography
                            width={'88%'}
                            textAlign={'center'}
                            fontSize={24}
                        >
                            {/* 楽天業務システム */}
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => navigate('/supermarket')}
                        sx={menuItemOption()}
                    >
                        <ShoppingCartIcon
                            sx={{ color: pink[500], fontSize: 30, mr: 1 }}
                        />
                        <Typography
                            sx={menuItemTextOption('supermarket')}
                            textAlign={'center'}
                            my={2}
                            fontSize={24}
                        >
                            スーパーマーケット
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => navigate('/taxi')}
                        sx={menuItemOption()}
                    >
                        <LocalTaxiIcon
                            sx={{ color: orange[600], fontSize: 30, mr: 1 }}
                        />
                        <Typography
                            textAlign={menuItemTextOption('taxi')}
                            my={2}
                            fontSize={24}
                        >
                            タクシー
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Header;
