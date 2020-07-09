import React, { useEffect, useState } from 'react';
import { removeUserSession, getToken } from '../Utils/UserStateUtils'
const axios = require('axios');

function Dashboard(props) {

    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        var token = getToken();

        axios({
            method: 'get',
            url: "http://localhost:5000/api/account/details",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            var data = response.data;
            setName(data.name);
            setUsername(data.username);
        }).catch(error => {
            var serverError = error.response.data;
        });
    }, []);

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    return (
        <div>
            Welcome, {name}!<br /><br />

            <div>
                Username: {username}
            </div>

            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    );
}

export default Dashboard;