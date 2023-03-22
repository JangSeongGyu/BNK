import React from 'react';
import Button from '@mui/material/Button';

const Home = () => {
    return (
        <>
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
