import { Box, CircularProgress, Typography } from '@mui/material';
import { amber, grey } from '@mui/material/colors';

const LoadingBar = (props) => {
    const isBg = props.isBg;
    const text = props.text;
    return (
        <>
            {props.loading && (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 20,
                        backgroundColor: isBg ? 'primary.glass_dark' : '',
                        backdropFilter: isBg ? 'blur(2px)' : '',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress
                            sx={{ color: isBg ? 'white' : amber[500] }}
                            size={props.size}
                        />
                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: 'white',
                            }}
                        >
                            {text}
                        </Typography>
                    </Box>
                </Box>
            )}
        </>
    );
};
export default LoadingBar;
