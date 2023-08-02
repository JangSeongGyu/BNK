import { Box, Drawer, Typography } from '@mui/material';
import { blue, grey, orange, pink } from '@mui/material/colors';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { useNavigate } from 'react-router-dom';
import { forwardRef, useImperativeHandle, useState } from 'react';

const HeaderDrawer = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [pageType, SetPageType] = useState('');

    useImperativeHandle(ref, () => {
        return {
            handleClickOpen(pageType) {
                setOpen(true);
                SetPageType(pageType);
            },
        };
    });

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

    let navigate = useNavigate();

    return (
        <Drawer open={open} onClose={() => setOpen(false)}>
            <Box height={'100%'} width={300}>
                <Box
                    onClick={() => setOpen(false)}
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
                <Box onClick={() => navigate('/taxi')} sx={menuItemOption()}>
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
    );
});
export default HeaderDrawer;
