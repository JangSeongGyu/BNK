import React from 'react';
import ReactDOM from "react-dom/client";

const App = () => {
    return <h1>Hell World</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);