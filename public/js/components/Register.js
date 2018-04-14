import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { setName, setPassword, attemptToRegister, routeToLogin, getValidationState } from './loginRegisterActions.js';

class Register extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="container">
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={getValidationState(this.props.appState.failed)}
                    >
                    {this.props.appState.failed && <ControlLabel>There was a problem with registration. Please try again</ControlLabel>}
                    <FormControl
                        type="text"
                        inputRef={ref => {this.registerNameInput = ref}}
                        placeholder="Enter name"
                        onBlur={() => {return (setName(this.props.dispatch, this.registerNameInput.value))}}
                    />
                    <FormControl
                        type="password"
                        inputRef={ref => {this.registerPasswordInput = ref}}
                        placeholder="Enter password"
                        onBlur={() => {return (setPassword(this.props.dispatch, this.registerPasswordInput.value))}}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Password needs to have at least six characters.</HelpBlock>
                    <Button bsSize="large" onClick={() => attemptToRegister(this.props.dispatch, this.props.appState.name, this.props.appState.password)} > Register </Button>
                    <Button bsSize="large" onClick={() => routeToLogin(this.props.dispatch) }> Back to login </Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default withRouter(connect((state) => {
    return {
        appState: state.appState
        // name: state.name,
        // password: state.password,
        // failed: state.failed,
        // userId: state.userId,
        // token: state.token,
    };//mapStateToProps
})(Register));