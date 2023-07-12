import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SuperMarket from './pages/SuperMarket';
import Beauty from './Beauty/Beauty';
import BeautyImport from './Beauty/BeautyImport';
import SPChecking from './pages/SPChecking';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`home`} element={<Home />} />
                <Route exact path={`/supermarket`} element={<SuperMarket />} />
                <Route
                    exact
                    path={`/supermarket/checking/:selectDate`}
                    element={<SPChecking />}
                />
                <Route exact path={`/beauty`} element={<Beauty />}>
                    <Route index element={<BeautyImport />} />
                    <Route path={`import`} element={<BeautyImport />} />
                </Route>
                <Route path={`/`} element={<Home />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: '1rem' }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
