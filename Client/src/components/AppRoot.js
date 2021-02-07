import React from 'react';
import { Provider } from 'react-redux'
import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom';

import Registration from './Registration'
import Authorization from './Authorization';
import store from '../store/store';
import ToDoShow from './ToDoShow';

function AppRoot() {
    return (
        <Provider store={store}>
            <div className="container-fluid">
                <BrowserRouter>
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <Switch>
                                <Route exact path="/" component={Authorization} />
                                <Route path="/todoshow" component={ToDoShow} />
                                <Route path="/registration" component={Registration} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default AppRoot;