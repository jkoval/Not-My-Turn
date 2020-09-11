import React from 'react';
import { BrowserRouter, Switch, Route } from './../node_modules/react-router-dom';
import './App.css';

import Home from './Views/Home.js';
import Login from './Views/Login.js';
import Register from './Views/Register.js';
import Dashboard from './Views/Dashboard.js';
import Group from './Views/Group.js';
import Drive from './Views/Drive.js';
import CalculateDriver from './Views/CalculateDriver.js';
import { getToken } from './Utils/UserStateUtils';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const StyledPaper = styled(Paper)({
  height: "90vh",
  textAlign: "center"
});

const StyledAppBar = styled(AppBar)({
  minHeight: 60,
})

const StyledGridContainer = styled(Grid)({
  marginTop: 4
})

function App() {
  return (
    <Grid className="App">
      <BrowserRouter>
        <div>
          <StyledAppBar position="static">
            <StyledGridContainer container justify="center" alignItems="center" spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="secondary" href="/">Home</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" href="/login">Login</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" href="/register">Register</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" href="/dashboard">Dashboard</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" href="/groups">My Groups</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" href="/drives">Add Drive</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" href="/calculateDriver">Choose Driver</Button>
                  </Grid>
                </Grid>
              </Grid>
            </StyledGridContainer>
          </StyledAppBar>
          <Container>
            <StyledPaper>
              <div style={{margin:"10px"}}>
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
            </StyledPaper>
          </Container>
        </div>
      </BrowserRouter>
    </Grid>
  );
}

export default App;
