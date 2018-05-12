import { push } from 'react-router-redux';
import axios from 'axios';

export const routeToRegister = function(dispatch){
    dispatch(push('/register'));
    dispatch({type: "LOGIN_TO_REGISTER", data: null});
}

export const routeToLogin = function(dispatch){
    dispatch(push('/'));
    dispatch({type: "REGISTER_TO_LOGIN", data: null});
}

export const setName = function(dispatch, name){
    dispatch({ type: "SET_NAME", data: name });
}

export const setPassword = function(dispatch, password){
    dispatch({ type: "SET_PASSWORD", data: password });
}

export const attemptToLogin = function(dispatch, loginName, loginPassword) {
    axios
    .post("/login", { name: loginName, password: loginPassword })
    .then(res => {
        if (res.data.result == true) {
            dispatch({
                type: "LOGIN",
                data: {
                    name: loginName,
                    password: loginPassword,
                    userId: res.data.userId,
                    token: res.data.token
                }
            });
            dispatch(push('/lobby'));
        } else {
            dispatch({ type: "FAIL" });
        }
    })
    .catch((error) => {console.log(error);dispatch({ type: "FAIL" });});
}

export const attemptToRegister = function(dispatch, registerName, registerPassword) {
    axios
    .post("/register", { name: registerName, password: registerPassword })
    .then(res => {
      if (res.data.result == true) {
        dispatch({
          type: "LOGIN",
          data: { name: registerName, registerPassword, userId: res.data.userId, token: res.data.token }
        });
        dispatch(push('/lobby'));
      } else {
        dispatch({ type: "FAIL" });
      }
    })
    .catch((error) => {console.log(error);dispatch({ type: "FAIL" });});
};

export const logOut = function() {
    dispatch({ type: "LOGOUT" });
}

export const getValidationState = function(failed) {
    if (failed){
        return "error";
    }
    return null;
}