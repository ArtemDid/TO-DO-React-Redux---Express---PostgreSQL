import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store';
import { NavLink } from 'react-router-dom';
import validator from 'validator';

import { createUser, assureAreEqual, assureRegPasswords } from '../Services/Services'

import { CreateActionSetLogin, CreateActionPassword, CreateActionRepeadPassword } from '../actions/actions'

class Registration extends React.Component {

    messageLogin = "";
    messagePassword = "";

    setLogin(event) {

        this.props.dispatch(CreateActionSetLogin(event.target.value));
        if (!validator.isEmail(store.getState().login)) {
            this.messageLogin = "Login is invalid";
        }
        else{
            this.messageLogin = "";
        }
    }
    setPassword(event) {

        this.props.dispatch(CreateActionPassword(event.target.value));
        if (!assureRegPasswords(store.getState().password)) {
            this.messagePassword = "Password is invalid";
        }
        else{
            this.messagePassword = "";
        }
    }
    setRepeatPassword(event) {

        this.props.dispatch(CreateActionRepeadPassword(event.target.value));
        if (!assureAreEqual(store.getState().password, store.getState().repeatpassword)) {
            this.messagePassword = "Password is invalid";
        }
        else{
            this.messagePassword = "";
        }

    }

    register(event) {

        this.messageLogin = "";
        this.messagePassword = "";

        event.preventDefault();

        if (validator.isEmail(store.getState().login) && assureRegPasswords(store.getState().password) && assureAreEqual(store.getState().password, store.getState().repeatpassword)) {
            createUser(store.getState().login, store.getState().password, store.getState().repeatpassword);
        }
        else alert("Login or Password is invalid");

    }

    render() {

        return (
            <form style={{ width: "500px", margin: "auto" }}>
                <h2>Sign up</h2>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input className="form-control" onChange={(event) => this.setLogin(event)} id="email" type="email" name="email" placeholder="name@example.com" />
                    {!this.messageLogin ? null : <span style={{ color: "#D81313", fontSize: "12px" }}>{this.messageLogin}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" onChange={(event) => this.setPassword(event)} id="password" type="password" name="password" placeholder="••••••••" />
                    {!this.messagePassword ? null : <span style={{ color: "#D81313", fontSize: "12px" }}>{this.messagePassword}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Repeat Password</label>
                    <input className="form-control" onChange={(event) => this.setRepeatPassword(event)} id="password" type="password" name="password" placeholder="••••••••" />
                </div>
                <div className="d-flex p-2 justify-content-start">
                    <div>
                        <NavLink to="/" className="btn btn-primary" activeClassName="active" onClick={(event) => this.register(event)}>Sign up</NavLink>
                    </div>
                </div>
            </form>

        );
    }
}

const mapStateToProps = function (state) {
    return {
        login: state.login,
        password: state.password,
        repeatpassword: state.repeatpassword,
        data: state.data
    }
}

export default connect(mapStateToProps)(Registration);
