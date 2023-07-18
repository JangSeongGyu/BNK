import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import Theme from './Theme';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

// axios.defaults.baseURL = 'http://192.168.150.196:8080';
// axios.defaults.withCredentials = true;

root.render(
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
);
