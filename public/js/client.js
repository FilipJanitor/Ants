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
/*browserrouter is just wraper <Router history={genericwrapperhistoryAPI}>  we will do it our way*/
// ________________________________CONSTANTS___________________________________
export const NOT_LOOKING_FOR_MATCH = 0;
export const LOOKING_FOR_NORMAL_MATCH = 1;
export const LOOKING_FOR_HARDCORE_MATCH = 2;
export const LOOKING_FOR_CORRESPONDENCE_MATCH = 3;
export const LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH = 4;


export const initialGlobalState = {

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

const store = createStore(combinedReducers, enhancer);

//const store = createStore(combinedReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()/*INITIAL STATE*/);

//Toto blokuje prebublanie locationu k Routru z browserHistory
//const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Switch>
                <Route path="/register" component={Register} />
                <Route exact path="/" component={Login} />
                <Route path="/lobby" component={Lobby} />
                <Route path="/game" component={Game} />
                <Route path="/*" component={NotFound} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("GameWindow")
);
