//dekonstrukcia z this.props
//zatial to nechavam bez stylov
import createReactClass from  'create-react-class';
import React from 'react';
import { connect } from "react-redux";
import { routeActions } from 'react-router-redux';
import { push } from 'react-router-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import axios from 'axios';

//{user.failedLogin && <Text text=/>}
//z this.props vytiahne dispatch a user
//na zaciatku je neinicializovany, ktovie preco
class Login extends React.Component {
    constructor(props){
        super(props);
        //props.user = {failedLogin: false};
    }
    render() {
        return (
            <div className="container">
            {console.log(this.props.location)}
                <form>
                    <FormGroup
                        controlId="formBasicText"
                    >
                    <ControlLabel>Working example with validation</ControlLabel>
                    <FormControl
                        type="text"
                        inputRef={ref => {this.loginNameInput = ref}}
                        placeholder="Enter name"
                        onBlur={() => {return (setName(this.props.dispatch, this.loginNameInput.value))}}
                    />
                    <FormControl
                        type="password"
                        inputRef={ref => {this.loginPasswordInput = ref}}
                        placeholder="Enter password"
                        onBlur={() => {return (setPassword(this.props.dispatch, this.loginPasswordInput.value))}}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                    <Button bsSize="large" onClick={() => {console.log(this.props);attemptToLogin(this.props.dispatch, this.props.reduxState.name, this.props.reduxState.password)} }> Login </Button>
                    <Button bsSize="large" onClick={() => routeToRegister(this.props.dispatch) }> Register </Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

const routeToRegister = function(dispatch){
    console.log("routing to register");
    dispatch(/*routeActions.*/push('/register'));
    dispatch({type: "test", data: 1});
}

const setName = function(dispatch, name){
    console.log("setting name");
    dispatch({ type: "SET_NAME", data: name });
}

const setPassword = function(dispatch, password){
    console.log("setting password");
    dispatch({ type: "SET_PASSWORD", data: password });
}

const attemptToLogin = function(dispatch, loginName, loginPassword) {
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

const logOut = function() {
    dispatch({ type: "LOGOUT" });
}

//ten token, skore a userid pojdu niekam hore
//{this.props.user.failedLogin && <p> FAIL </p>}
//export default withRouter(connect((state) => {
//    return { reduxState: state };//mapStateToProps
//})(Login)); //toto spoji redux state s propsami komponentu

export default withRouter(connect((state) => {
    return { reduxState: state };//mapStateToProps
    },  null, null, {
        pure: false
})(Login)); //toto spoji redux state s propsami komponentu
