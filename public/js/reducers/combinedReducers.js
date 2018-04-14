import { combineReducers } from 'redux'; //vytvara strom, to nechceme
import reduceReducers from 'reduce-reducers'; //vytvara flat stav
import loginRegisterReducer from './loginRegisterReducer.js';

const reducer = reduceReducers(loginRegisterReducer);

export default reducer;