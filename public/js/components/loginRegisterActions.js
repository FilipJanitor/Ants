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

//LOGIN a FAIL sa daju spojit, staci result dat do state.failed
export const attemptToLogin = function(dispatch, loginName, loginPassword) {
    console.log("atempting login");
    console.log({loginName, loginPassword});
    axios
    .post("/login", { name: loginName, password: loginPassword })
    .then(res => {
        if (res.data.result == true) {
            console.log("success");
            dispatch({
                type: "LOGIN",
                data: {
                    name: loginName,
                    password: loginPassword,
                    userId: res.data.userId,
                    token: res.data.token,
                    result: true,
                    score: res.data.score,
                    wins: res.data.wins,
                    loses: res.data.loses,
                    ties: res.data.ties,
                    lookingForMatch: res.data.lookingForMatch
                }
            });
            dispatch(push('/lobby'));
        } else {
            console.log("Fail");
            dispatch({ type: "FAIL" });
        }
    })
    .catch((error) => {console.log(error);dispatch({ type: "FAIL" });});
}

export const attemptToRegister = function(dispatch, registerName, registerPassword) {
    console.log({registerName, registerPassword});
    axios
    .post("/register", { registerName, registerPassword })
    .then(res => {
      if (res.data.result == true) {
        dispatch({
          type: "LOGIN",
          data: { name: registerName, registerPassword, userId: res.data.userId, token: res.data.token }
        });
        this.props.dispatch(routeActions.push('/lobby'));
      } else {
        dispatch({ type: "FAIL" });
      }
    })
    .catch(() => dispatch({ type: "FAIL" }));
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