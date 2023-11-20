import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Login = () => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('table_id') == null)
            localStorage.setItem('table_id', params.table_id);
        axios.post('/api/login/score', {
            table_id: params.table_id,
        });
        navigate('/game');
    }, [params]);

    return (
        <Box>
            <Typography></Typography>
        </Box>
    );
};
export default Login;
