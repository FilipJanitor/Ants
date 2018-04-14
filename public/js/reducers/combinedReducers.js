import { combineReducers } from 'redux'; //vytvara strom, to nechceme
import reduceReducers from 'reduce-reducers'; //vytvara flat stav
import loginReducer from './loginReducer.js';
import registerReducer from './registerReducer.js';

const reducer = reduceReducers(loginReducer,registerReducer);

export default reducer;