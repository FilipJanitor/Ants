import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
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