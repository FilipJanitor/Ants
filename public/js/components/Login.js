import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { setName, setPassword, attemptToLogin, routeToRegister, getValidationState } from '../actions/loginRegisterActions.js';

class Login extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="well">
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={getValidationState(this.props.appState.failed)}
                                >
                                {this.props.appState.failed && <ControlLabel>Wrong user or password</ControlLabel>}
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
                                </FormGroup>
                                <FormGroup>
                                <Button bsSize="large" onClick={() => attemptToLogin(this.props.dispatch, this.props.appState.name, this.props.appState.password) }> Login </Button>
                                <Button bsSize="large" onClick={() => routeToRegister(this.props.dispatch) }> Register </Button>
                                </FormGroup>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect((state) => {
    return {
        appState: state.appState
    };
    })(Login));