import React, { useState } from 'react';
import { setUserSession } from '../Utils/UserStateUtils'
import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const axios = require('axios');

function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
 
  const handleLogin = () => {
      const body = JSON.stringify({
          Username: username.value,
          Password: password.value
      });

      axios({
          method: 'post',
          url: "http://localhost:5000/api/auth/login",
          headers: {
            'Content-Type': 'application/json'
          },
          data: body
      }).then(response => {
          setUserSession(response.data.token, response.data.id);
          //props.history.push('/dashboard');
          history.push('./dashboard');
          
      }).catch(error => {
          if (error.response === undefined) {
              alert(error.message);
              return;
          }

          var serverError = error.response.data;
          setError(serverError.error);
      });
  }
 
  return (
    <div>
      <Typography variant="h3" color="primary">Login</Typography>
      <br/>
      <div>
        <TextField
            label="Username"
            variant="outlined"
            value={username.value}
            onChange={username.onChange}
        />
        <br />
        <br />
        <TextField
            label="Password"
            variant="outlined"
            type="password"
            password={password.value}
            onChange={password.onChange}
        />
      </div>
      <br />
      {error && <><small style={{ color: 'red' }}>{error}</small><br /><br /></>}
      <Button color="primary" variant="contained" onClick={handleLogin} disabled={loading}>Login</Button>
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;