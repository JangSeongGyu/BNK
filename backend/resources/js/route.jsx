import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Beauty from "./pages/Beauty";
// import Login from "./pages/Login";

const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/beauty`} element={<Beauty />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Router;