import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MainGame1Answer = () => {
    const [answerData, setAnswerData] = useState([]);
    const [timer, setTimer] = useState(5);
    const currentGame = props.currentGame;

    useEffect(() => {
        axios.get('api/main/answer/' + currentGame).then((res) => {
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

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                p: 1,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
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
                                    width: '33%',
                                    height: '6%',
                                    bgcolor: grey[50],
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 1,
                                    justifyContent: 'space-around',
                                }}
                            >
                                {timer != 0 && (
                                    <>
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
                                    </>
                                )}
                                {timer == 0 &&
                                    data.submit_data.includes('A') && (
                                        <>
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
