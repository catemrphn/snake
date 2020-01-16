import React from 'react';
// import { Link } from 'react-router-dom';
import './gameOver-style.css';


function GameOver(props) {
    return <div className='game-over-page'>
        <h1 className='game-over-page__header'>
            You died :(
        </h1>
        <p>Score: {props.score}</p>
        <div className='button-wrapper'>
            <button className='button-game-again' onClick={props.OnPlayAgain}>Play again</button>
        </div>

    </div>
}

export default GameOver;
