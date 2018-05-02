import { combineReducers } from 'redux'; //vytvara strom, to nechceme
import reduceReducers from 'reduce-reducers'; //vytvara flat stav
import loginRegisterReducer from './loginRegisterReducer.js';
import gameReducer from './gameReducer.js'
import { initialGlobalState } from '../constants.js'
const initializer = function(state, action){
    if(state === undefined){
        return initialGlobalState;
    } else {
        return state;
    }
}
const reducer = reduceReducers(initializer, loginRegisterReducer,gameReducer);

export default reducer;