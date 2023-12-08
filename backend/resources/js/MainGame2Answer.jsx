import { Box, Typography } from '@mui/material';
import { brown, grey, orange, yellow } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MainGame2Answer = (props) => {
    const [answerData, setAnswerData] = useState([]);
    const [timer, setTimer] = useState(5);
    const [correctAnswer, setCorrectAnswer] = useState('');
    useEffect(() => {
        let array = [];
        axios.get('/api/main/answer/' + props.currentGame).then((res) => {
            setAnswerData(res.data.data);
            setCorrectAnswer(res.data.correct_answer);
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

    const GradeOption = (grade) => {
        return {
            width: 50,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'black',
            p: 1,
            borderRadius: 2,
        };
    };

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
                <Box
                    width={'100%'}
                    minHeight={'20%'}
                    display={'flex'}
                    mb={2}
                    gap={2}
                >
                    {/* 1 */}
                    <Box
                        width={'33%'}
                        height={'100%'}
                        position={'relative'}
                        boxShadow={2}
                        borderRadius={5}
                        overflow={'hidden'}
                        bgcolor={'white'}
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
                                <Typography sx={{ fontSize: 60 }}>
                                    {answerData[0].table_no}番卓
                                </Typography>
                                <Typography sx={{ fontSize: 60 }}>
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
                        borderRadius={5}
                        overflow={'hidden'}
                        bgcolor={'white'}
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
                                <Typography sx={{ fontSize: 55 }}>
                                    {answerData[1].table_no}番卓
                                </Typography>
                                <Typography sx={{ fontSize: 55 }}>
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
                        borderRadius={5}
                        overflow={'hidden'}
                        bgcolor={'white'}
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
                                <Typography sx={{ fontSize: 50 }}>
                                    {answerData[2].table_no}番卓
                                </Typography>
                                <Typography sx={{ fontSize: 50 }}>
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
                            {index >= 3 && (
                                <>
                                    <Box
                                        sx={{
                                            width: '23%',
                                            height: '9%',
                                            bgcolor: 'white',
                                            borderRadius: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box sx={GradeOption(index + 1)}>
                                            <Typography
                                                sx={{
                                                    fontsize:25,
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                #{index + 1}
                                            </Typography>
                                        </Box>
                                        <Box display={'flex'} width={'100%'}>
                                            <Typography
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 'bold',
                                                    bgcolor: orange[100],
                                                    px: 2,
                                                    borderRadius: 20,
                                                    width: '35%',
                                                    textAlign: 'center',
                                                    // border: 1,
                                                }}
                                            >
                                                {data.table_no}番卓
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    ml: 4,
                                                    fontSize: 35,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {/* 回答:{data.submit_data} */}
                                                {data.submit_data}
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
