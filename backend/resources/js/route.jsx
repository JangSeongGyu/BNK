import React from 'react';
import Home from './Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Theme from './Theme';
import Login from './Login';
import LoginError from './LoginError';
import Main from './Main';
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={`/login/:table_id`}
                    element={
                        <ThemeProvider theme={Theme}>
                            <Login />
                        </ThemeProvider>
                    }
                />
                <Route
                    path={`/game`}
                    element={
                        <ThemeProvider theme={Theme}>
                            <Home />
                        </ThemeProvider>
                    }
                />
                <Route
                    path={`/loginerror`}
                    element={
                        <ThemeProvider theme={Theme}>
                            <LoginError />
                        </ThemeProvider>
                    }
                />{' '}
                <Route
                    path={`/main/:task`}
                    element={
                        <ThemeProvider theme={Theme}>
                            <Main />
                        </ThemeProvider>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
