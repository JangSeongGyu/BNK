import React from 'react';
import Router from './route';
import ToasterComp from './components/ToasterComp';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';

axios.defaults.baseURL = import.meta.env.VITE_DOMAIN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] =
    '192.168.154.137:8080';
axios.defaults.withCredentials = true;

const App = () => {
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
