import { combineReducers } from "redux";

import loginReducer from "./loginReducer.js";

const reducer = combineReducers({
    login: loginReducer
    //found: foundReducer //tento sluzi na zapamatanie URLky v stave a pouzivanie toho ako argumentu
})

export default reducer;