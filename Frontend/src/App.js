import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from './../node_modules/react-router-dom';
import './App.css';

import Home from './Views/Home.js';
import Login from './Views/Login.js';
import Register from './Views/Register.js';
import Dashboard from './Views/Dashboard.js';
import Group from './Views/Group.js';
import Drive from './Views/Drive.js';
import CalculateDriver from './Views/CalculateDriver.js';

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
            <NavLink to="/groups">Groups</NavLink>
            <NavLink to="/drives">Drives</NavLink>
            <NavLink to="/calculateDriver">Calculate Driver</NavLink>
          </div>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/register" component={Register} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/groups" component={Group} />
              <PrivateRoute path="/drives" component={Drive} />
              <PrivateRoute path="/calculateDriver" component={CalculateDriver} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
