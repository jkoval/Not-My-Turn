import React, { useState } from 'react';
import { setUserSession } from '../Utils/UserStateUtils'
 
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

      fetch("http://localhost:5000/api/auth/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
      }).then(data => {
          setUserSession(data.token, data.Id);
          props.history.push('/dashboard');
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
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
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