import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MainGame1Answer = () => {
    const [testData, setTestData] = useState([]);
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        axios.get('api/main/answer/1').then((res) => {});
        let array = [];
        const al = ['A', 'B', 'C'];
        for (let i = 1; i <= 40; i++) {
            array.push({ id: i, answer: al[i % 3] });
        }
        setTestData(array);
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
                {testData.map((data) => {
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
                                        <Typography sx={{ fontSize: 25 }}>
                                            {data.id}番テーブル
                                        </Typography>
                                        <Typography sx={{ fontSize: 25 }}>
                                            答え：{data.answer}
                                        </Typography>
                                    </>
                                )}
                                {timer == 0 && data.answer == 'A' && (
                                    <>
                                        <Typography sx={{ fontSize: 25 }}>
                                            {data.id}番テーブル
                                        </Typography>
                                        <Typography sx={{ fontSize: 25 }}>
                                            答え：{data.answer}
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
