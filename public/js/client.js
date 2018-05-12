import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import Login from './components/Login.js';
import Lobby from './components/Lobby.js';
import Game from './components/Game.js';
import Register from './components/Register.js';
import NotFound from './components/NotFound.js';
import reducer from './reducers/combinedReducers.js';
import { createBrowserHistory } from 'history';
import PrivateRoute from './components/PrivateRoute.js';
import { initialGlobalState } from './constants.js';

const browserHistory = createBrowserHistory();
const combinedReducers = combineReducers({
    appState: reducer,
    routing: routerReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(browserHistory))
);

const store = createStore(combinedReducers, initialGlobalState, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/lobby" component={Lobby} />
                <PrivateRoute path="/game" component={Game} />
                <Route path="/*" component={NotFound} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("GameWindow")
);
