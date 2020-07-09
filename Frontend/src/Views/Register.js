import React, { useState } from 'react';
import { setUserSession } from '../Utils/UserStateUtils'
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
          Register<br /><br />
          <div>
            Name<br />
            <input type="text" {...name}/>
          </div>
          <div style={{ marginTop: 10 }}>
            Username<br />
            <input type="text" {...username}/>
          </div>
          <div style={{ marginTop: 10 }}>
            Password<br />
            <input type="password" {...password}/>
          </div>
          <div style={{ marginTop: 10 }}>
            Confirm Password<br />
            <input type="password" {...confirmPassword}/>
          </div>
          <br />
          {error && <><small style={{ color: 'red' }}>{error}</small><br /><br /></>}
          <input type="button" value='Register' onClick={handleRegister} /><br />
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