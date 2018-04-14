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
    console.log("setting name");
    dispatch({ type: "SET_NAME", data: name });
}

export const setPassword = function(dispatch, password){
    console.log("setting password");
    dispatch({ type: "SET_PASSWORD", data: password });
}

//sem treba dat skore a podobne
export const attemptToLogin = function(dispatch, loginName, loginPassword) {
    console.log("atempting login");
    axios
    .post("/login", { name: loginName, password: loginPassword })
    .then(res => {
      if (res.data.result == true) {
        dispatch({
          type: "LOGIN",
          data: { name, password, userId: res.data.userId, token: res.data.token }
        });
        dispatch(push('/lobby'));
      } else {
        dispatch({ type: "LOGIN_FAIL" });
      }
    })
    .catch(() => dispatch({ type: "LOGIN_FAIL" }));
}

export const attemptToRegister = function(dispatch, name, password) {
    axios
    .post("/register", { name, password })
    .then(res => {
      if (res.data.result == true) {
        dispatch({
          type: "REGISTER",
          data: { name, password, userId: res.data.userId, token: res.data.token }
        });
        this.props.dispatch(routeActions.push('/lobby'));
      } else {
        dispatch({ type: "REGISTER_FAIL" });
      }
    })
    .catch(() => dispatch({ type: "REGISTER_FAIL" }));
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