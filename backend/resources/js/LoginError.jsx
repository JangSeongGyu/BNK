import { Box, Typography } from '@mui/material';

const LoginError = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography>Login情報がありません。</Typography>
            <Typography> QRコードを読み込んでください。</Typography>
        </Box>
    );
};
export default LoginError;
