import React from 'react';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import Game from './components/game/game';
import Welcome from './components/welcome/welcome';
import GameOver from './components/game-over/gameOver';

function App() {
    return <HashRouter>
        <Route path="/" exact component={Welcome}/>
        <Route path="/game" exact component={Game}/>
        <Route path="/over" component={GameOver}/>
    </HashRouter>
}

export default App;
