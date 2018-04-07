import { combineReducers, createStore, compose } from "redux";
import { foundReducer, resolver, createConnectedRouter, createRender } from "found";

import loginReducer from "./loginReducer"

export default reducer = combineReducers({
    login: loginReducer,
    found: foundReducer //tento sluzi na zapamatanie URLky v stave a pouzivanie toho ako argumentu
})