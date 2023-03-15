import React from 'react';
import ReactDOM from "react-dom/client";
import Router from './route';

const App = () => {
    return <Router />;
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);