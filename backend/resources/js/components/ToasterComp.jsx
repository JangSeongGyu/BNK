import { ToastBar, Toaster, toast } from 'react-hot-toast';
import {
    Grid,
    Modal,
    Button,
    Typography,
    Box,
    Dialog,
    duration,
} from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
const CloseBtn = {
    color: blue[500],
    height: '100%',
    width: '20%',
    borderLeft: 2,
    borderColor: grey[300],
    borderRadius: 0,
};

const ToasterComp = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 40000,
                style: {
                    fontFamily: `游ゴシック`,
                    fontWeight: 'bold',
                },
                success: {
                    duration: 3000,
                },
                error: { duration: 3000 },
                closeError: {
                    duration: 900000,
                    icon: <CancelIcon sx={{ color: red[500] }} />,
                },
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <Box m={-1} width={350} display={'flex'}>
                            <Box
                                pl={1}
                                alignItems={'center'}
                                width={'100%'}
                                display={'flex'}
                            >
                                {icon}
                                <Box
                                    px={1}
                                    my={1.5}
                                    whiteSpace={'pre-line'}
                                    width={'100%'}
                                >
                                    {String(message.props.children).replace(
                                        /<br>/g,
                                        '\n'
                                    )}
                                </Box>
                                {t.type == 'closeError' && (
                                    <Button
                                        wud
                                        onClick={() => toast.dismiss(t.id)}
                                        sx={CloseBtn}
                                    >
                                        <Typography fontSize={14}>
                                            Close
                                        </Typography>
                                    </Button>
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
