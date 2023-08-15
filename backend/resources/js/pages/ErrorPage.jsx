import { Box, Button, Typography } from '@mui/material';
import { grey, pink, red } from '@mui/material/colors';
import ErrorIcon from '@mui/icons-material/Error';
import { Link, useNavigate } from 'react-router-dom';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';

const ErrorPage = () => {
    let navigate = useNavigate();
    return (
        <Box
            height={'100%'}
            display={'flex'}
            flex={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            // backgroundColor={grey[200]}
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                // border={1}
                px={30}
                py={10}
                // borderColor={grey[500]}
                borderRadius={2}
                // boxShadow={2}
                backgroundColor={'white'}
            >
                <ErrorIcon sx={{ color: grey[400], fontSize: 200 }} />
                <Typography fontSize={60} fontWeight={'bold'}>
                    404 Not Found
                </Typography>
                <Typography fontSize={24} color={grey[700]}>
                    存在しないページです
                </Typography>
                <Typography fontSize={24} color={grey[700]}>
                    下のボタンをクリックしてHomeに戻ってください
                </Typography>

                <Button
                    sx={{
                        mt: 4,
                        width: 500,
                        height: 70,
                        border: 1,
                        borderColor: pink[500],
                        color: 'white',
                        backgroundColor: pink[500],
                        ':hover': {
                            color: pink[500],
                            backgroundColor: 'white',
                        },
                    }}
                    onClick={() => {
                        navigate('/home');
                    }}
                >
                    <Typography fontSize={24} fontWeight={'bold'}>
                        Homeに戻る
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};
export default ErrorPage;
