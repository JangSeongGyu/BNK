import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Beauty from './pages/Beauty/Beauty';
import BeautyImport from './pages/Beauty/BeautyImport';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={`/beauty`} element={<Beauty />}>
                    <Route index element={<BeautyImport />} />
                    <Route path={`import`} element={<BeautyImport />} />
                </Route>
                {/* <Route path={`/`} element={<Home />} /> */}
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
