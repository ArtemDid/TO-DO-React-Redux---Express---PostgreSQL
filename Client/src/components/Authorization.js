import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store';
import { NavLink } from 'react-router-dom';
import validator from 'validator';

import { checkLogin, assureRegPasswords, checkRemember } from '../Services/Services'
import { CreateActionSetLogin, CreateActionPassword } from '../actions/actions'

class Authorization extends React.Component {
    messageLogin = "";
    messagePassword = "";
    check = false;
    ls = window.localStorage;

    setLogin(event) {
        this.props.dispatch(CreateActionSetLogin(event.target.value));
        if (!validator.isEmail(store.getState().login)) {
            this.messageLogin = "Login is invalid";
        }
        else {
            this.messageLogin = "";
        }
    }
    setPassword(event) {
        this.props.dispatch(CreateActionPassword(event.target.value));
        if (!assureRegPasswords(store.getState().password)) {
            this.messagePassword = "Password is invalid";
        }
        else {
            this.messagePassword = "";
        }
    }

    Mycheck(event) {
        this.check = event.target.checked;
    }

    auth(event) {
        event.preventDefault();

        if (validator.isEmail(store.getState().login) && assureRegPasswords(store.getState().password)) {
            if (this.check) {
                checkRemember(store.getState().login, store.getState().password);
            }
            else {
                this.ls.clear();
            }

            checkLogin(store.getState().login, store.getState().password);
        }
    }

    //TO-DO must make reading localStorage
    getValueLogin() {
        if (this.ls.length > 0) {
            console.log(JSON.parse(this.ls.getItem("login")));

            return JSON.parse(this.ls.getItem("login"));
        }
        else return null;
    }
    getValuePassword() {
        if (this.ls.length > 0) {
            console.log(JSON.parse(this.ls.getItem("password")));

            return JSON.parse(this.ls.getItem("password"));
        }
        else return null;

    }

    render() {

        //TO-DO must make reading localStorage
        // if (this.ls.length > 0) {
        //     this.temp = JSON.parse(this.ls.getItem("login"));
        //     // this.myPassword.current.value = JSON.parse(this.ls.getItem("password"));

        //     console.log(document.getElementById("email"));
        // }


        return (
            <form style={{ width: "500px", margin: "auto" }}>
                <h2>Sign in</h2>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input className="form-control" onChange={(event) => this.setLogin(event)} type="email" id="email" placeholder="name@example.com" />
                    {!this.messageLogin ? null : <span style={{ color: "#D81313", fontSize: "12px" }}>{this.messageLogin}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" onChange={(event) => this.setPassword(event)} type="password" name="password" placeholder="••••••••" />
                    {!this.messagePassword ? null : <span style={{ color: "#D81313", fontSize: "12px" }}>{this.messagePassword}</span>}
                </div>
                <div className="d-flex justify-content-end">
                    <div>
                        <label>
                            <input type="checkbox" name="remember" value="remember" onChange={(event) => this.Mycheck(event)} />
                            <span> Запомнить меня</span>
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <div className="p-2">
                        <NavLink to="/cart" className="btn btn-primary" activeClassName="active" onClick={(event) => this.auth(event)}>Sign in</NavLink>
                    </div>
                    <div className="p-2">
                        <NavLink to="/registration" className="btn btn-primary" activeClassName="active">Sign up</NavLink>
                    </div>
                </div>
            </form>

        );
    }
}

const mapStateToProps = function (state) {
    return {
        login: state.login,
        password: state.password
    }
}

export default connect(mapStateToProps)(Authorization);
