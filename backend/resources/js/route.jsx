import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SuperMarket from './pages/SuperMarket';
import Beauty from './Beauty/Beauty';
import BeautyImport from './Beauty/BeautyImport';
import Checking from './pages/Checking';
import QRLayout from './components/LabelLayout';
import YamaLayout from './components/YamaComponent/YamaLayout';
import JobTicketLayout from './components/JobTicketLayout';
import LabelLayout from './components/LabelLayout';
import Checking2 from './pages/Checking2';
import Taxi from './pages/Taxi';
import SPTheme from './SPTheme';
import { ThemeProvider } from '@mui/material';
import TXTheme from './TXTheme';
import EGTheme from './EGTheme';
import DetailView from './pages/DetailView';
import Master from './pages/Master';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`home`} element={<Home />} />
                {/*============ SuperMarket ======================================================*/}
                <Route
                    exact
                    path={`/supermarket`}
                    element={
                        <ThemeProvider theme={SPTheme}>
                            <SuperMarket pageType="supermarket" />
                        </ThemeProvider>
                    }
                />
                <Route
                    exact
                    path={`/supermarket/checking/:selectDate/`}
                    element={
                        <ThemeProvider theme={SPTheme}>
                            <Checking pageType="supermarket" />
                        </ThemeProvider>
                    }
                />
                <Route
                    exact
                    path={`/supermarket/checking2/:selectDate/`}
                    element={
                        <ThemeProvider theme={SPTheme}>
                            <Checking2 pageType="supermarket" />
                        </ThemeProvider>
                    }
                />
                <Route
                    exact
                    path={`/supermarket/detail/:selectDate/`}
                    element={
                        <ThemeProvider theme={SPTheme}>
                            <DetailView pageType="supermarket" />
                        </ThemeProvider>
                    }
                />

                <Route
                    exact
                    path={`/supermarket/master`}
                    element={
                        <ThemeProvider theme={SPTheme}>
                            <Master pageType="supermarket" />
                        </ThemeProvider>
                    }
                />

                {/*============ Taxi ======================================================*/}
                <Route
                    exact
                    path={`/taxi`}
                    element={
                        <ThemeProvider theme={TXTheme}>
                            <Taxi pageType="taxi" />
                        </ThemeProvider>
                    }
                />

                <Route
                    exact
                    path={`/taxi/master`}
                    element={
                        <ThemeProvider theme={TXTheme}>
                            <Master pageType="taxi" />
                        </ThemeProvider>
                    }
                />
                <Route
                    exact
                    path={`/taxi/checking/:selectDate/`}
                    element={
                        <ThemeProvider theme={TXTheme}>
                            <Checking pageType="taxi" />
                        </ThemeProvider>
                    }
                />

                <Route exact path="/test" element={<YamaLayout />}></Route>
                <Route exact path={`/beauty`} element={<Beauty />}>
                    <Route index element={<BeautyImport />} />
                    <Route path={`import`} element={<BeautyImport />} />
                </Route>
                <Route path={`/`} element={<Home />} />
                {/* <Route
                    path="*"
                    element={
                        <main style={{ padding: '1rem' }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
