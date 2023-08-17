import { Box, ButtonBase, Drawer, Typography } from '@mui/material';
import { blue, grey, lightGreen, orange, pink } from '@mui/material/colors';

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
            width: 300,
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
                <ButtonBase>
                    <Box
                        onClick={() => setOpen(false)}
                        width={300}
                        backgroundColor={pink[500]}
                        py={1}
                        boxShadow={2}
                        fontWeight={'bold'}
                        color={'white'}
                        alignItems={'center'}
                        sx={{
                            ':hover': { background: pink[400] },
                        }}
                    >
                        <Box display={'flex'} gap={2}>
                            <ArrowBackIosNewIcon sx={{ fontSize: 30 }} />
                            <Typography fontSize={20}>
                                Rakuten業務SYS
                            </Typography>
                        </Box>
                    </Box>
                </ButtonBase>
                <ButtonBase>
                    <Box
                        onClick={() => navigate('/supermarket')}
                        sx={menuItemOption()}
                    >
                        <ShoppingCartIcon
                            sx={{ color: lightGreen[700], fontSize: 30, mr: 1 }}
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
                </ButtonBase>
                <ButtonBase>
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
                </ButtonBase>
            </Box>
        </Drawer>
    );
});
export default HeaderDrawer;
