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
import { initialGlobalState } from './constants.js';

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
