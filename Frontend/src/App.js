import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from './../node_modules/react-router-dom';
import './App.css';

import Home from './Views/Home.js';
import Login from './Views/Login.js';
import Register from './Views/Register.js';
import Dashboard from './Views/Dashboard.js';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </div>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/register" component={Register} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
