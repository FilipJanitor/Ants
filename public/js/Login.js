//dekonstrukcia z this.props
//zatial to nechavam bez stylov 
//dobry je react material design
import React from 'react'

var Button = React.createClass({
    render: function() {
        return (
            <button
                onClick={this.props.onClick}>
                {this.props.label}
            </button>
        );
    }
});

const Login = ({ user, dispatch}) => {
    return (
        <div>
            //nejaky signal na ukazanie ze login failol
            //ukladame, ked pouzivatel dopise
            <input type="name" onBlur={() => setName(dispatch, value)} />
            <input type="password" onBlur={() => setPassword(dispatch, value)} />
            <Button 
                label="login"
                onClick={() => attemptToLogin(dispatch, user.name, user.password) } 
            />

        </div>
    )
};

const setName = function(dispatch, name){

};

const setPassword = function(dispatch, password){

};

const attemptToLogin = function(dispatch, name, password) {

};

const logOut = function() {

};
