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

const Header = (props) => {
    let navigate = useNavigate();
    const pageType = props.pageType;
    const page = props.page;
    const [title, SetTitle] = useState('');
    const disableList = props.disableList;
    const [open, setOpen] = useState(false);

    const menuItemOption = (menuType) => {
        let selectMenu;
        if (pageType == menuType) selectMenu = grey[200];
        else selectMenu = 'white';
        return {
            borderBottom: 1,
            borderColor: grey[400],
            display: 'flex',
            alignItems: 'center',
            px: 2,
            height: 60,
            backgroundColor: selectMenu,
            ':hover': { backgroundColor: grey[200] },
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
                <Box width={300}>
                    <Typography
                        backgroundColor={pink[500]}
                        color={'white'}
                        textAlign={'center'}
                        py={2}
                        fontSize={28}
                        fontWeight={'bold'}
                    >
                        楽天業務システム
                    </Typography>
                    <Box
                        onClick={() => navigate('/supermarket')}
                        sx={menuItemOption('supermarket')}
                    >
                        <ShoppingCartIcon
                            sx={{ color: pink[500], fontSize: 30, mr: 1 }}
                        />
                        <Typography textAlign={'center'} my={2} fontSize={24}>
                            スーパーマーケット
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => navigate('/taxi')}
                        sx={menuItemOption('taxi')}
                    >
                        <LocalTaxiIcon
                            sx={{ color: orange[600], fontSize: 30, mr: 1 }}
                        />
                        <Typography textAlign={'center'} my={2} fontSize={24}>
                            タクシー
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Header;
