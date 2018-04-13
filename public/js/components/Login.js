//dekonstrukcia z this.props
//zatial to nechavam bez stylov
import createReactClass from  'create-react-class';
import React from 'react';
import { connect } from "react-redux";
import { routeActions } from 'react-router-redux';
//import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

//{user.failedLogin && <Text text=/>}
//z this.props vytiahne dispatch a user
//na zaciatku je neinicializovany, ktovie preco
class Login extends React.Component {
    constructor(props){
        super(props);
        //props.user = {failedLogin: false};
    }

    setName(dispatch, name){
        console.log("setting name");
        dispatch({ type: "SET_NAME", data: name });
    }

    setPassword(dispatch, password){
        console.log("setting password");
        dispatch({ type: "SET_PASSWORD", data: password });
    }

    attemptToLogin(dispatch, name, password) {

        console.log("atempting login");
        axios
        .post("/login", { name, password })
        .then(res => {
          if (res.data.result == true) {
            dispatch({
              type: "LOGIN",
              data: { name, password, userId: res.data.userId, token: res.data.token }
            });
            this.props.dispatch(routeActions.push('/lobby'));
          } else {
            dispatch({ type: "LOGIN_FAIL" });
          }
        })
        .catch(() => dispatch({ type: "LOGIN_FAIL" }));
    }

    logOut() {
        dispatch({ type: "LOGOUT" });
    }

    render() {
        return (
            <div className="container">
                <form>
                    <FormGroup
                        controlId="formBasicText"
                    >
                    <ControlLabel>Working example with validation</ControlLabel>
                    <FormControl
                        type="text"
                        inputRef={ref => {this.input = ref}}
                        placeholder="Enter name"
                        onBlur={() => this.setName(this.props.dispatch, 1)}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                </form>






                //nejaky signal na ukazanie ze login failol
                //ukladame, ked pouzivatel dopise
                <input type="name" onBlur={() => this.setName(this.props.dispatch, 1)} />
                <input type="password" onBlur={() => this.setPassword(this.props.dispatch, 1)} />
                <Button bsSize="large" onClick={() => this.attemptToLogin(this.props.dispatch, 2, 3) }> Login </Button>
                <button><Link to='/register'/></button>
            </div>
        );
    }
}
//{this.props.user.failedLogin && <p> FAIL </p>}
export default connect ((state) => {
    return { user: state.user };//mapStateToProps
})(Login); //toto spoji redux state s propsami komponentu