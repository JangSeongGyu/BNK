import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import Theme from './SPTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <CssBaseline />
        <App />
    </>
);
