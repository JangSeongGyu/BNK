import React from 'react';
import Router from './route';
import ToasterComp from './components/ToasterComp';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';

axios.defaults.baseURL = 'http://192.168.150.196:8080/';
// axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
// axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] =
    '192.168.154.137:8080';
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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                <ToasterComp />
                <Router />
            </LocalizationProvider>
        </>
    );
};

export default App;
