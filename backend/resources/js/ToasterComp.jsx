import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { Grid, Modal, Button, Typography, Box } from '@mui/material';
import { amber, blue, grey, red } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';

const ToasterComp = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 40000,
                style: {
                    fontFamily: `游ゴシック`,
                    fontWeight: 'bold',
                },
                success: {
                    duration: 5000,
                },
                error: { duration: 3000 },
                closeError: {
                    duration: 120000,
                    icon: <CancelIcon sx={{ color: red[500] }} />,
                },
            }}
        >
            {(t) => (
                <ToastBar
                    toast={t}
                    style={{
                        ...t.style,
                        display: 'flex',
                        backgroundColor: 'white',
                        boxShadow: 3,
                        border: 10,
                        padding: 0,
                        borderColor: 'black',
                    }}
                >
                    {({ icon, message }) => (
                        <Box zIndex={2} height={'100%'} width={'100%'}>
                            <Box
                                alignItems={'center'}
                                width={'100%'}
                                height={'100%'}
                                display={'flex'}
                            >
                                <Box
                                    sx={{
                                        m: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {icon}
                                </Box>
                                <Box
                                    sx={{
                                        my: 1,
                                        whiteSpace: 'pre-line',
                                        pr: 2,
                                        minWidth: 100,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 20,
                                            wordBreak: 'break-all',
                                        }}
                                    >
                                        {String(message.props.children).replace(
                                            /<br>/g,
                                            '\n'
                                        )}
                                    </Typography>
                                </Box>
                                {t.type == 'closeError' && (
                                    <Box
                                        onClick={() => toast.dismiss(t.id)}
                                        sx={{
                                            width: 80,
                                            borderTopRightRadius: 5,
                                            borderBottomRightRadius: 5,
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: amber[400],
                                            color: 'black',
                                            ':hover': {
                                                backgroundColor: amber[300],
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <Typography
                                            width={'100%'}
                                            textAlign={'center'}
                                            fontSize={14}
                                        >
                                            Close
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
};
export default ToasterComp;
