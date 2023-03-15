import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const Home = () => {
    return (
        <div className="container">
            <Card>
                <Button color="primary" variant="contained" href={`/beauty`}>Beautyに遷移</Button>
            </Card>
        </div>
    );
}

export default Home;
