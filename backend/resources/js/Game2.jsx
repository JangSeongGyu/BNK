import {
    Box,
    Button,
    Grid,
    Input,
    Slide,
    TextField,
    Typography,
    colors,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import logo from '../image/white_logo.png';

import axios from 'axios';

import GameData from './GameData';

const Game2 = (props) => {
    const [inputData, setInputData] = useState('');
    const pageTask = props.pageTask;

    const SendResult = () => {
        axios.post('/api/game1/save', {
            table_id: props.table_id,
            answer: inputData,
        });
    };

    return (
        <Slide direction={'left'} in={pageTask == 2} timeout={1000}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    p: 1,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '80%',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        p: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', mb: 1 }}>
                        <Typography sx={{ fontSize: 20 }}>答えを</Typography>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: red[600],
                            }}
                        >
                            ひらがな
                        </Typography>
                        <Typography sx={{ fontSize: 20 }}>
                            で書いてください
                        </Typography>
                    </Box>

                    <Input
                        sx={{
                            bgcolor: grey[100],
                            borderRadius: 4,
                            width: '100%',
                            height: 50,
                            px: 2,
                        }}
                        placeholder="入力してください。"
                        disableUnderline={true}
                        value={inputData}
                        onChange={(e) => {
                            setInputData(e.target.value);
                        }}
                    />
                </Box>
                <Box sx={{ width: '100%', height: '20%', p: 1 }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 2,
                            backgroundColor: 'black',
                            color: 'white',
                        }}
                        onClick={() => {
                            SendResult();
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 'bold',
                            }}
                        >
                            提出！
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Slide>
    );
};
export default Game2;
