import React, { useState, useEffect } from 'react';
import { getUser, getToken } from '../Utils/UserStateUtils'
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const axios = require('axios');

class GroupUser extends React.Component {
    render() {
        return (
            <div>
                <Typography variant="p" color="secondary">{this.props.name}</Typography>
            </div>
        )
    }
}

class AddUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handleAddUser() {
        var token = getToken();

        axios({
            method: 'post',
            url: "http://localhost:5000/api/group/addUser?groupId=" + this.props.groupId + "&username=" + this.state.username,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {

        }).catch(error => {

        });
    }

    render() {
        return (
            <Grid container justify="center" spacing={2}>
                <Grid item>
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                </Grid>
                <Grid item align="center">
                    <Button color="primary" variant="contained" onClick={this.handleAddUser}>Add Friend</Button>
                </Grid>
            </Grid>
        )
    }
}

class GroupRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];

        this.props.users.forEach((user) => {
            rows.push(<GroupUser name={user.user.name}/>);
        });

        rows.push(<br/>);
        rows.push(<AddUser groupId={this.props.id}/>);

        return (
            <div>
                <Grid container justify="center" spacing={1}>
                    <Grid item>
                        <Typography fontWeight="fontWeightBold" variant="h5" color="secondary">{this.props.name}</Typography>
                    </Grid>
                    {this.props.isAdmin && <Grid item>
                        <Button color="primary" variant="contained" onClick={() => this.props.handleDelete(this.props.id)}>Delete</Button>
                    </Grid>}
                </Grid>
                <br/>
                Users:
                {rows}
                <br/>
            </div>
        )
    }
}

class MyGroups extends React.Component {
    constructor(props) {
        super(props);

        this.deleteGroup = this.deleteGroup.bind(this);
    }

    getGroups = () => {
        var token = getToken();

        axios({
            method: 'get',
            url: "http://localhost:5000/api/group/byuser/" + getUser(),
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            var data = response.data;
            var names = data.map(function(group) {
                 return { name: group.name, isAdmin: group.users.find(x => x.userId === getUser()).permissions === 1, id: group.id, users: group.users}
            });
            this.setState({ names: names});
        }).catch(error => {

        });
    }

    componentDidMount() {
        this.getGroups();
    }

    deleteGroup(id) {
        var token = getToken();

        axios({
            method: 'post',
            url: "http://localhost:5000/api/group/delete/" + id,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(() =>{
            this.getGroups();
        }).catch(error => {
            alert("error");
        });
    }

    render() {
        var rows = [];

        if (this.state) {
            this.state.names.forEach((group) => 
                rows.push(
                    <GroupRow 
                        name={group.name}
                        isAdmin={group.isAdmin}
                        id={group.id}
                        handleDelete={this.deleteGroup}
                        users={group.users}/>
                )
            );
        }

        return (
            <div>
                <Typography variant="h3" color="primary">My Groups:</Typography>
                <div>
                    {rows}
                </div>
            </div>
        )
    }
}

function Group(props) {

    const name = useFormInput('');

    const handleCreateGroup = () => {

        if (name.value === "")
            return;

        const body = JSON.stringify({
            userId: getUser(),
            name: name.value
        });

        axios({
            method: 'post',
            url: "http://localhost:5000/api/group/create",
            headers: {
              'Content-Type': 'application/json'
            },
            data: body
        }).then(response => {
            name.setValue("");
        }).catch(error => {
            alert(error);
        });
    }

    return (
        <div>
            <div>
                <div>
                    <Typography variant="h3" color="primary">Create new Group</Typography>
                    <br />
                    <TextField
                        label="Group Name"
                        variant="outlined"
                        value={name.value}
                        onChange={name.onChange}
                    />
                </div>
                <br />
                <Button color="primary" variant="contained" onClick={handleCreateGroup}>Create Group</Button>
            </div>
            <br/>
            <hr/>
            <div>
                <MyGroups />
            </div>
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
      onChange: handleChange,
      setValue: setValue
    }
  }

export default Group;