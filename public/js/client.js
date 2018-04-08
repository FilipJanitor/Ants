import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore, compose } from "redux";
import { foundReducer, resolver, createConnectedRouter, createRender } from "found";

import router from "./router.js"


import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import App from "./App.js";
import Login from "./Login.js";
import Lobby from "./Lobby.js";
import Game from "./Game.js";
import Register from "./Register.js"
import { makeRouteConfig, createMatchEnhancer, Matcher } from "found";


//ten router vlastne ani nebude potrebny
//toto je cargocult, nechapem na co to vlastne je
// const Router = ( //na bookmarkovanie a historiu
//     <BrowserRouter>
//         <Route path="/" component={App} />
//     </BrowserRouter>
// );

const routeConfig = makeRouteConfig(
    <Route path="/" Component={App}>
        <Route Component={Login} />
        <Route path="register" Component={Register} />
        <Route path="lobby" Component={Lobby} />
        <Route path="game" Component={Game} />
    </Route>
);
const reducer = 

const router = createMatchEnhancer(new Matcher(routeConfig));
const enhancer = compose(router);
const store = createStore(
    combineReducers({
        login: loginReducer,
        found: foundReducer //tento sluzi na zapamatanie URLky v stave a pouzivanie toho ako argumentu
    }),
    createMatchEnhancer(
        new Matcher(routeConfig)
    )
);

const ConnectedRouter = createConnectedRouter({
    render: createRender({
        renderError: ({ error }) => (
            <div>
                { error.status === 404 ? 'Not Found' : 'Error' }
            </div>
        )
    })
});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter matchContext={ store } resolver={ resolver } />
    </Provider>,
    document.getElementById("GameWindow")
); //matchcontext je na urobenie storu available v getData metodach v routach - snad to budeme potrebovat