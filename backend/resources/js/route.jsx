import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Beauty from './Beauty/Beauty';
import BeautyImport from './Beauty/BeautyImport';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={`home`} element={<Home />} />
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
