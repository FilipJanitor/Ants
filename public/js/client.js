import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login.js';
import Lobby from './Lobby.js';
import Game from './Game.js';
import Register from './Register.js';
import NotFound from './NotFound.js';
import reducer from './reducers/combinedReducers.js';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="register" component={Register} />
                    <Route path="lobby" component={Lobby} />
                    <Route path="game" component={Game} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById("GameWindow")
); 