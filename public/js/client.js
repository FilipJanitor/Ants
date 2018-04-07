import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore, compose } from "redux";
import { foundReducer, resolver, createConnectedRouter, createRender } from "found";

import router from "./router.js"



const enhancer = compose(router);
const store = createStore(reducer,enhancer);

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
    document.getElementById("MainComponent")
); //matchcontext je na urobenie storu available v getData metodach v routach - snad to budeme potrebovat