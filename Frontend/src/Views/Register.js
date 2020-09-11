import React, { useState } from 'react';
import { setUserSession } from '../Utils/UserStateUtils'
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const axios = require('axios');

function Register(props) {
    const name = useFormInput('');
    const username = useFormInput('');
    const password = useFormInput('');
    const confirmPassword = useFormInput('');

    const [error, setError] = useState(null);

    const handleRegister = () => {
        if (password.value != confirmPassword.value)
        {
            setError("Passwords do not match");
            return;
        }

        const body = JSON.stringify({
            Username: username.value,
            Password: password.value,
            Name: name.value
        });
  
        axios({
            method: 'post',
            url: "http://localhost:5000/api/auth/register",
            headers: {
              'Content-Type': 'application/json'
            },
            data: body
        }).then(response => {
            setUserSession(response.data.token, response.data.id);
            props.history.push('/dashboard');
        }).catch(error => {
            var serverError = error.response.data;
            setError(serverError.error);
        });
    }

    return (
        <div>
          <Typography variant="h3" color="primary">Register</Typography>
          <br  />
          <TextField
            label="Name"
            variant="outlined"
            value={name.value}
            onChange={name.onChange}
          />
          <br />
          <br />
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
            value={password.value}
            onChange={password.onChange}
          />
          <br />
          <br />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword.value}
            onChange={confirmPassword.onChange}
          />
          <br />
          <br />
          {error && <><small style={{ color: 'red' }}>{error}</small><br /><br /></>}
          <Button color="primary" variant="contained" onClick={handleRegister}>Register</Button>
          <br />
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
   
  export default Register;