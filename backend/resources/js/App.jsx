import React from 'react';
import Router from './route';
import ToasterComp from './components/ToasterComp';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.150.196:8080/';
// axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

const App = () => {
    // const http = axios.create({
    //     baseURL: 'http://192.168.150.196:8080/',
    //     withCredentials: true,
    // });

    // axios.get('/sanctum/csrf-cookie').then((res) => {
    //     console.log(res);
    // });

    return (
        <>
            <ToasterComp />
            <Router />
        </>
    );
};

export default App;
