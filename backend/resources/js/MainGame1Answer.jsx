import { Box, Typography } from '@mui/material';
import { blue, grey, orange, red } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MainGame1Answer = (props) => {
    const [answerData, setAnswerData] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [timer, setTimer] = useState(5);
    const currentGame = props.currentGame;

    useEffect(() => {
        axios.get('api/main/answer/' + currentGame).then((res) => {
            setAnswerData(res.data.data);
            setCorrectAnswer(res.data.correct_answer);
        });
        axios.post('/api/main/change-game', {
            currentGame: 0,
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

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '10%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    sx={{
                        fontSize: 40,
                        textAlign: 'center',
                        bgcolor: blue[500],
                        color: 'white',
                        py: 1,
                        px: 10,
                        borderRadius: 100,
                    }}
                >
                    正解者発表!
                </Typography>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    flexWrap: 'wrap',
                }}
            >
                {answerData.map((data) => {
                    return (
                        <>
                            <Box
                                sx={{
                                    width: '24%',
                                    height: '9%',
                                    bgcolor: grey[50],
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 1,
                                }}
                            >
                                {timer != 0 && (
                                    <>
                                        <Typography
                                            sx={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                bgcolor: orange[100],
                                                px: 2,
                                                borderRadius: 20,
                                                width: '50%',
                                                textAlign: 'center',
                                                // border: 1,
                                            }}
                                        >
                                            {data.table_no}番卓
                                        </Typography>
                                        <Typography
                                            sx={{
                                                ml: 4,
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {/* 回答:{data.submit_data} */}
                                            {data.submit_data}
                                        </Typography>
                                    </>
                                )}
                                {timer == 0 &&
                                    data.submit_data.includes(
                                        correctAnswer
                                    ) && (
                                        <>
                                            <Typography
                                                sx={{
                                                    fontSize: 30,
                                                    fontWeight: 'bold',
                                                    bgcolor: orange[100],
                                                    px: 2,
                                                    borderRadius: 20,
                                                    width: '50%',
                                                    textAlign: 'center',
                                                    // border: 1,
                                                }}
                                            >
                                                {data.table_no}番卓
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    ml: 4,
                                                    fontSize: 30,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {/* 回答:{data.submit_data} */}
                                                {data.submit_data}
                                            </Typography>
                                        </>
                                    )}
                            </Box>
                        </>
                    );
                })}
            </Box>
        </Box>
    );
};
export default MainGame1Answer;
