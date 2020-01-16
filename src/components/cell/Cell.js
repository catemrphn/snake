import React from 'react';
import './Cell-style.css';

export default function Cell(props) {

    function getClassName() {
        switch (props.field) {
            case 0: return 'field-cell cell';
            case -1: return 'apple cell';
            case -2: return 'rock cell';
            default: return 'snake cell';
        }
    }

    return (
        <div className={getClassName()}>
        </div>
    );
}
