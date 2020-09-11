import React, { useEffect, useState } from 'react';
import { removeUserSession, getToken } from '../Utils/UserStateUtils'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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
            <Typography variant="h3" color="primary">My Dashboard</Typography>
            <br  />
            <Typography variant="h5">Welcome, {name}!</Typography>
            <br /><br />

            <div>
                Username: {username}
            </div>

            <br />
            <Button color="primary" variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Dashboard;