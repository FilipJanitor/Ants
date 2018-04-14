import createReactClass from  'create-react-class';
import React from 'react'
import { connect } from "react-redux"
import { Link, withRouter } from 'react-router-dom';
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
//z this.props vytiahne dispatch a user
//na zaciatku je neinicializovany, ktovie preco
const Register = ({ user = {failedRegister: false}, dispatch}) => {
    return (

        <div>
            REGISTERREGISTER
            //nejaky signal na ukazanie ze login failol
            {user.failedRegister && <p> FAIL </p>}
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
    dispatch({ type: "SET_REG_NAME", data: name });
};

const setPassword = function(dispatch, password){
    dispatch({ type: "SET_REG_PASSWORD", data: password });
};

const attemptToRegister = function(dispatch, name, password) {
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

export default withRouter(connect ((state) => {
    return { user: state.user };//mapStateToProps
}, null, null, {
    pure: false
  })(Register)); //toto spoji redux state s propsami komponentu