import React from 'react';
import { Link } from 'react-router-dom';
import './gameOver-style.css';


function GameOver() {
    return <div className='game-over-page'>
        <h1>
            Game over!
        </h1>
        <div className='button-wrapper'>
            <Link to={{
                pathname: '/game',
            }}>Start again</Link>
        </div>

    </div>
}

export default GameOver;
