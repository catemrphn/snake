import React from 'react';
import './modal-style.css';


function Modal(props) {
    return <div className='game-over-page'>
        <h1 className='game-over-page__header'>
            {props.title}
        </h1>
        <p>{props.desc}</p>
        <div className='button-wrapper'>
            <button className='button-game-again' onClick={props.OnPlayAgain}>{props.textButton}</button>
        </div>

    </div>
}

export default Modal;
