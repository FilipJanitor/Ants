import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
//import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import Login from './components/Login.js';
import Lobby from './components/Lobby.js';
import Game from './components/Game.js';
import Register from './components/Register.js';
import NotFound from './components/NotFound.js';
import reducer from './reducers/combinedReducers.js';
import { createBrowserHistory } from 'history';
import PrivateRoute from './components/PrivateRoute.js';
/*browserrouter is just wraper <Router history={genericwrapperhistoryAPI}>  we will do it our way*/
// ________________________________CONSTANTS___________________________________
export const NOT_LOOKING_FOR_MATCH = 0;
export const LOOKING_FOR_NORMAL_MATCH = 1;
export const LOOKING_FOR_HARDCORE_MATCH = 2;
export const LOOKING_FOR_CORRESPONDENCE_MATCH = 3;
export const LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH = 4;
export const USER_ON_TURN = 0;
export const OPPONENT_ON_TURN = 1;

export const RANKS = Object.freeze ([
    "Cadet",
    "1st class soldier (1 win)",
    "2nd class soldier (10 wins)",
    "Lance corporal (20 wins)",
    "Corporal (30 wins)",
    "Sergeant (50 wins)",
    "Skipper (70 wins)",
    "Sergeant major (90 wins)",
    "Warrant Officer (100 wins)",
    "Ensign (120 wins)",
    "Lieutenant (150 wins)",
    "First Lieutenant (200 wins)",
    "Captain (250 wins)",
    "Colonel (300 wins)",
    "Brigadier general (400 wins)",
    "General (500 wins)"
]);



export const initialGlobalState = {
    appState: {
        name: '',
        password: '',
        failed: false,
        userId: -1,
        token: '',
        auth: false
    },
    routing: {
        location: null
    }
};/*toto bude tazke s tym routingom spojit */

//const middleware = routerMiddleware(browserHistory)
const browserHistory = createBrowserHistory();
const combinedReducers = combineReducers({
    appState: reducer,
    routing: routerReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(browserHistory)/*...middleware*/)
);

const store = createStore(combinedReducers, initialGlobalState, enhancer);

//const store = createStore(combinedReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()/*INITIAL STATE*/);

//Toto blokuje prebublanie locationu k Routru z browserHistory
//const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render( //tuto dorobit private routy, a default routy
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
