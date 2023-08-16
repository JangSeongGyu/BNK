import React from 'react';
import Button from '@mui/material/Button';
import Header from '../components/HeaderCompnent/Header';
import { grey, orange, pink, yellow } from '@mui/material/colors';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BtnOption = (mainColor) => {
    return {
        width: 250,
        height: 50,
        border: 1,
        borderColor: mainColor,
        color: mainColor,
        backgroundColor: 'white',
        ':hover': { color: 'white', backgroundColor: mainColor },
    };
};

const Home = (props) => {
    let pageType = 'home';
    let navigate = useNavigate();
    return (
        <Box
            backgroundColor={grey[200]}
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            minWidth={1000}
        >
            <Header pageType={pageType} disableList={true} />
            <Box
                m={2}
                p={2}
                border={1}
                borderColor={grey[500]}
                height={'100%'}
                borderRadius={2}
                backgroundColor={'white'}
                boxShadow={2}
            >
                <Box borderBottom={1} borderColor={grey[400]} mb={2}>
                    <Typography fontSize={32} fontWeight={'bold'}>
                        ショートカット
                    </Typography>
                </Box>
                <Box display={'flex'}>
                    <Box
                        backgroundColor="white"
                        border={1}
                        borderColor={grey[600]}
                        boxShadow={2}
                        display={'flex'}
                        flexDirection={'column'}
                        p={1}
                        gap={1}
                        borderRadius={2}
                    >
                        <Typography
                            textAlign={'center'}
                            fontWeight={'bold'}
                            fontSize={24}
                        >
                            QR
                        </Typography>
                        <Button
                            sx={BtnOption(pink[500])}
                            onClick={() => navigate('/supermarket')}
                        >
                            <Typography fontSize={20} fontWeight={'bold'}>
                                楽天SuperMarket
                            </Typography>
                        </Button>

                        <Button
                            sx={BtnOption(orange[500])}
                            onClick={() => navigate('/taxi')}
                        >
                            <Typography fontSize={20} fontWeight={'bold'}>
                                楽天Taxi
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
