import { combineReducers } from "redux";

import loginReducer from "./loginReducer.js";
import registerReducer from "./registerReducer.js";

const reducer = combineReducers({
    login: loginReducer,
    register: registerReducer
    //found: foundReducer //tento sluzi na zapamatanie URLky v stave a pouzivanie toho ako argumentu
})

export default reducer;