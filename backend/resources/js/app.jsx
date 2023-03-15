import React from 'react';
import ReactDOM from "react-dom/client";
import Button from '@mui/material/Button';

const App = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">React導入できたわな？？</div>

                        <div className="card-body">I'm an example component!</div>
                        <Button color="primary" variant="contained">Hello World</Button> 
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);