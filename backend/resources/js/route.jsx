import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SuperMarket from './pages/SuperMarket';
import Beauty from './Beauty/Beauty';
import BeautyImport from './Beauty/BeautyImport';
import SPChecking from './pages/SPChecking';
import QRLayout from './components/LabelLayout';
import YamaLayout from './components/YamaLayout';
import JobTicketLayout from './components/JobTicketLayout';
import LabelLayout from './components/LabelLayout';
import SPChecking2 from './pages/SPChecking2';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`home`} element={<Home />} />
                <Route exact path={`/supermarket`} element={<SuperMarket />} />
                <Route
                    exact
                    path={`/supermarket/checking/:selectDate/`}
                    element={<SPChecking pageType="supermarket" />}
                />
                <Route
                    exact
                    path={`/supermarket/checking2/:selectDate/`}
                    element={<SPChecking2 pageType="supermarket" />}
                />
                <Route
                    exact
                    path={`/test`}
                    element={<JobTicketLayout />}
                ></Route>

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
