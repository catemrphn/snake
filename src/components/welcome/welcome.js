import React from 'react';
import { Link } from 'react-router-dom';
import './welcome-style.css';

function Welcome() {
    return <div className="welcome-page">
        <h1>Welcome</h1>
        <div className="button-wrapper">
            <Link to={{
                pathname: '/game',
            }}>Start</Link>
        </div>
    </div>
}


export default Welcome;
