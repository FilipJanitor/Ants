import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { setName, setPassword, attemptToRegister, routeToLogin } from './loginRegisterActions.js';

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
                    <HelpBlock>Password needs to have at least six characters.</HelpBlock>
                    <Button bsSize="large" onClick={() => attemptToLogin(this.props.dispatch, this.props.reduxState.name, this.props.reduxState.password)} > Register </Button>
                    <Button bsSize="large" onClick={() => routeToLogin(this.props.dispatch) }> Back to login </Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default withRouter(connect((state) => {
    return {
        reduxState: state
    };//mapStateToProps
})(Register));