
import createReactClass from  'create-react-class';
import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom';
import { compose } from 'redux'

var Button = createReactClass({
    render: function() {
        return (
            <button
                onClick={this.props.onClick}>
                {this.props.label}
            </button>
        );
    }
});
//{user.failedLogin && <Text text=/>}
//z this.props vytiahne dispatch a user 
//na zaciatku je neinicializovany, ktovie preco
const Register = ({ user = {failedRegister: false}, dispatch}) => {
    return (
        <div>
            //nejaky signal na ukazanie ze login failol
            {user.failedLogin && <p> FAIL </p>}
            //ukladame, ked pouzivatel dopise
            <input type="name" onBlur={() => setName(dispatch, value)} /> 
            <input type="password" onBlur={() => setPassword(dispatch, value)} />
            <Button 
                label="Register"
                onClick={() => attemptToRegister(dispatch, user.name, user.password) } 
            />
            <button><Link to='/register'/></button>
        </div>
    );
};

const setName = function(dispatch, name){
    dispatch({ type: "SET_NAME", data: name });
};

const setPassword = function(dispatch, password){
    dispatch({ type: "SET_PASSWORD", data: password });
};

const attemptToRegister = function(dispatch, name, password) {

};

export default connect ((state) => {
    return { user: state.user };//mapStateToProps
})(Login); //toto spoji redux state s propsami komponentu