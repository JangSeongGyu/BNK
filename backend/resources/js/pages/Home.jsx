import React from 'react';
import Button from '@mui/material/Button';
import Header from '../components/Header';

const Home = (props) => {
    let pageType = 'home';
    return (
        <>
            <Header pageType={pageType} />
            <Button
                sx={{ backgroundColor: 'primary.main', m: 2 }}
                variant="contained"
                href={`/supermarket`}
            >
                楽天SuperMarket
            </Button>
        </>
    );
};

export default Home;
