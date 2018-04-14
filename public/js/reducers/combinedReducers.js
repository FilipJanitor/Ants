import { combineReducers } from 'redux'; //vytvara strom, to nechceme
import reduceReducers from 'reduce-reducers'; //vytvara flat stav
import loginReducer from './loginReducer.js';
import registerReducer from './registerReducer.js';

const reducer = reduceReducers({
    login: loginReducer,
    register: registerReducer
    //found: foundReducer //tento sluzi na zapamatanie URLky v stave a pouzivanie toho ako argumentu
})

export default reducer;