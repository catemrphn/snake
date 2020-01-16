import React, {useEffect, useState} from 'react';
import './game-style.css';
import Cell from '../cell/Cell';
// import {Redirect} from 'react-router-dom';
import GameOver from "../game-over/gameOver";

/**
 * 0 - UP
 * 1 - DOWN
 * 2 - LEFT
 * 3 - RIGHT
 */

let direction = 1;
let directionDelta = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
];
let snakeSize = 3;
let intervalId = -1;

function App() {
    const width = 20;
    const height = 20;
    const [field, setField] = useState(createGameField());
    const [over, setOver] = useState(false);


    useEffect(() => {
        window.addEventListener('keyup', e => {
            if (e.code === 'ArrowRight' && direction !== 2) {
                direction = 3;
            } else if (e.code === 'ArrowLeft' && direction !== 3) {
                direction = 2;
            } else if (e.code === 'ArrowUp' && direction !== 1) {
                direction = 0;
            } else if (e.code === 'ArrowDown' && direction !== 0) {
                direction = 1;
            }
        });

            intervalId = setInterval(
                () => {
                    move();
                },
                350
            );

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function move() {
        let table = Array.from(field);

        let headX = 0;
        let headY = 0;
        let curDir = directionDelta[direction];

        // Search head
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (table[i][j] === 1) {
                    headY = i;
                    headX = j;
                }
            }
        }

        let nextCell = table[headY + curDir[0]][headX + curDir[1]];
        let nextCellIsApple = (nextCell === -1);
        let nextCellIsBad = (nextCell === -2 || nextCell > 0);


        // Move snake and search tail
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (table[i][j] === snakeSize) {
                    if (nextCellIsApple) {
                        table[i][j]++;
                    } else {
                        table[i][j] = 0;
                    }
                } else if (table[i][j] > 0) {
                    table[i][j]++;
                }
            }
        }

        table[headY + curDir[0]][headX + curDir[1]] = 1;
        if (nextCellIsApple) {
            createRandomItems(table, 1, -1);
        }
        setField(table);

        if (nextCellIsApple) {
            snakeSize++;
        }

        if (nextCellIsBad) {
            clearInterval(intervalId);
            setOver(true);
            if (getCookie('BestScore') < snakeSize - 3) {
                setCookie('BestScore', snakeSize - 3);
            }
        }
    }

    function createGameField() {
        let table = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push(0);
            }
            table.push(row);
        }


        for (let i = 0; i < height; i++) {
            table[i][0] = -2;
            table[i][width - 1] = -2;
        }

        for (let i = 0; i < width; i++) {
            table[0][i] = -2;
            table[height - 1][i] = -2;
        }

        table[9][9] = 1;
        table[8][9] = 2;
        table[7][9] = 3;
        // snakeSize = 3;


        createRandomItems(table, 1, -1);

        return table;
    }

    function createRandomItems(table, itemsCount, itemKey) {
        for (let i = 0; i < itemsCount; i++) {
            let x = 0;
            let y = 0;
            do {
                x = getRandomIntInclusive(0, width - 1);
                y = getRandomIntInclusive(0, height - 1);
            } while (table[x][y] !== 0);
            table[x][y] = itemKey;
        }
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function genRow(row) {
        let rowsHtml = row.map(function (item) {
            return (
                <Cell field={item}/>
            );
        });
        return (
            <div className='field-row-container'>
                {rowsHtml}
            </div>
        )
    }

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    } 

    function setCookie(name, value) {
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    // }

    }

    function StartNewGame() {
        let newField = createGameField();
        setField(newField);
        console.log(field);
        setOver(false);


    }

    return (
        <div className="App">
            {/*{start ? 'start' : ''}*/}
            {over ? <GameOver OnPlayAgain={StartNewGame} score={snakeSize - 3}/> : ''}
            <div className='snake-header'>
                <h1>Snake</h1>
                <div className='score-container'>
                    <p>Score: {snakeSize - 3} </p>
                    <p>Best score: {getCookie('BestScore')} </p>
                </div>
            </div>
            <div className='field-container'>
                {
                    field.map(function (item) {
                            return (
                                genRow(item)
                            );
                        }
                    )
                }
            </div>
        </div>
    );
}

export default App;
