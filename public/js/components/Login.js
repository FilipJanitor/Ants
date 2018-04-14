import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { setName, setPassword, attemptToLogin, routeToRegister, getValidationState } from './loginRegisterActions.js';

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
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={getValidationState(this.props.reduxState.failed)}
                    >
                    {this.props.reduxState.failed && <ControlLabel>Wrong user or password</ControlLabel>}
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
                    <Button bsSize="large" onClick={() => attemptToLogin(this.props.dispatch, this.props.reduxState.name, this.props.reduxState.password) }> Login </Button>
                    <Button bsSize="large" onClick={() => routeToRegister(this.props.dispatch) }> Register </Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

//ten token, skore a userid pojdu niekam hore
//{this.props.user.failedLogin && <p> FAIL </p>}
//export default withRouter(connect((state) => {
//    return { reduxState: state };//mapStateToProps
//})(Login)); //toto spoji redux state s propsami komponentu

export default withRouter(connect((state) => {
    return {
        reduxState: state
    };//mapStateToProps
    })(Login)); //toto spoji redux state s propsami komponentu
//tie nully a purte false mozno mozu ist prec