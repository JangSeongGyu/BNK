import { Box, Typography } from '@mui/material';
import { brown, grey, orange, yellow } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MainGame2Answer = (props) => {
    const [answerData, setAnswerData] = useState([]);
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        let array = [];
        axios.get('/api/main/answer/' + props.currentGame).then((res) => {
            setAnswerData(res.data);
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const getTime = () => {
        if (timer > 0) {
            setTimer(timer - 1);
        }
    };

    const GradeOption = (grade) => {};

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
            }}
        >
            {answerData.length > 0 && (
                <Box width={'100%'} minHeight={'20%'} display={'flex'} gap={2}>
                    {/* 1 */}
                    <Box
                        width={'33%'}
                        height={'100%'}
                        position={'relative'}
                        boxShadow={2}
                        overflow={'hidden'}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -20,
                                left: 0,
                                width: 250,
                                height: 40,
                                display: 'flex',
                                justifyContent: 'center',
                                transform:
                                    'rotate(-45deg) translateX(-100px)  translateY(-30px)',
                                bgcolor: yellow[500],
                            }}
                        >
                            <Typography
                                sx={{
                                    width: 2,
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                }}
                            >
                                #1
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <>
                                <Typography sx={{ fontSize: 30 }}>
                                    {answerData[0].id}番テーブル
                                </Typography>
                                <Typography sx={{ fontSize: 30 }}>
                                    {answerData[0].submit_data}
                                </Typography>
                            </>
                        </Box>
                    </Box>
                    {/* 2 */}
                    <Box
                        width={'33%'}
                        height={'100%'}
                        position={'relative'}
                        boxShadow={2}
                        overflow={'hidden'}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -20,
                                left: 0,
                                width: 250,
                                height: 40,
                                display: 'flex',
                                justifyContent: 'center',
                                transform:
                                    'rotate(-45deg) translateX(-100px)  translateY(-30px)',
                                bgcolor: grey[300],
                            }}
                        >
                            <Typography
                                sx={{
                                    width: 2,
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                }}
                            >
                                #2
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontSize: 16 }}>
                                    {answerData[1].id}番テーブル
                                </Typography>
                                <Typography sx={{ fontSize: 16 }}>
                                    {answerData[1].submit_data}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    {/* 3 */}
                    <Box
                        width={'33%'}
                        height={'100%'}
                        position={'relative'}
                        boxShadow={2}
                        overflow={'hidden'}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -20,
                                left: 0,
                                width: 250,
                                height: 40,
                                display: 'flex',
                                justifyContent: 'center',
                                transform:
                                    'rotate(-45deg) translateX(-100px)  translateY(-30px)',
                                bgcolor: orange[700],
                            }}
                        >
                            <Typography
                                sx={{
                                    width: 2,
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                }}
                            >
                                #3
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontSize: 16 }}>
                                    {answerData[2].id}番テーブル
                                </Typography>
                                <Typography sx={{ fontSize: 16 }}>
                                    {answerData[2].submit_data}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
            <Box
                sx={{
                    width: '100%',
                    height: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    gap: 1,
                }}
            >
                {answerData.map((data, index) => {
                    return (
                        <>
                            {index >= 39 && (
                                <>
                                    <Box
                                        sx={{
                                            width: '33%',
                                            height: '6%',
                                            bgcolor: grey[200],
                                            borderRadius: 2,
                                            display: 'flex',
                                            alignItems: 'center',

                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Box sx={GradeOption(index + 1)}>
                                            <Typography
                                                sx={{
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    width: 40,
                                                    height: 40,
                                                    textAlign: 'center',
                                                    borderRadius: 3,
                                                    pt: 1,
                                                }}
                                            >
                                                #{index + 1}
                                            </Typography>
                                        </Box>
                                        <Box display={'flex'} width={'100%'}>
                                            <Typography
                                                sx={{
                                                    ml: 10,
                                                    fontSize: 16,
                                                    width: '50%',
                                                }}
                                            >
                                                テーブル：{data.table_no}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: 16,
                                                    width: '50%',
                                                }}
                                            >
                                                回答:{data.submit_data}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </>
                    );
                })}
            </Box>
        </Box>
    );
};
export default MainGame2Answer;
