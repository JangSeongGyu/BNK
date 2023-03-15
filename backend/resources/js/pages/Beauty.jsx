import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const Beauty = () => {
    return (
        <div className="container">
            <Card>
                <Button color="primary" variant="contained" href={`/`}>Homeに遷移</Button>
            </Card>
            Beauty
        </div>
    );
}

export default Beauty;