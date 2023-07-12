import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import Theme from './Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const ENV_PATH = path.join(__dirname, '.env');
// require('dotenv').config('../../../.env');

root.render(
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
);
