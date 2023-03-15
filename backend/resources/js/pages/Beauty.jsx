import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const Beauty = () => {
    return (
        <>
            <div className="container">
                <Button color="primary" variant="contained" href={`/`}>
                    Home に遷移
                </Button>
            </div>
        </>
    );
};

export default Beauty;
