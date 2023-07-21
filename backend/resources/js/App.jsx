import React from 'react';
import Router from './route';
import ToasterComp from './components/ToasterComp';
import axios from 'axios';
import { Await } from 'react-router-dom';

axios.defaults.baseURL = 'http://192.168.154.137:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const App = () => {
    return (
        <>
            <ToasterComp />
            <Router />
        </>
    );
};

export default App;
