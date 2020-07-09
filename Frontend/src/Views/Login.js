import React, { useState } from 'react';
import { setUserSession } from '../Utils/UserStateUtils'
const axios = require('axios');
 
function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
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
          props.history.push('/dashboard');
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
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password}/>
      </div>
      <br />
      {error && <><small style={{ color: 'red' }}>{error}</small><br /><br /></>}
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
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