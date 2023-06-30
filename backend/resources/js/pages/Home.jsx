import React from 'react';
import Button from '@mui/material/Button';
import Header from '../components/Header';

const Home = () => {
    return (
        <>
            <Header title="Home" />
            <Button
                sx={{ backgroundColor: 'primary.main', m: 2 }}
                variant="contained"
                href={`/beauty`}
            >
                楽天Beauty
            </Button>
        </>
    );
};

export default Home;
