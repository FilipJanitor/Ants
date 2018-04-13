import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import Lobby from './components/Lobby.js';
import Game from './components/Game.js';
import Register from './components/Register.js';
import NotFound from './components/NotFound.js';
import reducer from './reducers/combinedReducers.js';


// ________________________________CONSTANTS___________________________________
export const NOT_LOOKING_FOR_MATCH = 0;
export const LOOKING_FOR_NORMAL_MATCH = 1;
export const LOOKING_FOR_HARDCORE_MATCH = 2;
export const LOOKING_FOR_CORRESPONDENCE_MATCH = 3;
export const LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH = 4;


const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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