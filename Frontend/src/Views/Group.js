import React, { useState, useEffect } from 'react';
import { getUser, getToken } from '../Utils/UserStateUtils'
const axios = require('axios');

class GroupRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>{this.props.name}</span> - {this.props.isAdmin ? <span><b>Admin</b> <input type="button" onClick={() => this.props.handleDelete(this.props.id)} value="Delete" /> </span> : ""}
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
                 return { name: group.name, isAdmin: group.users.find(x => x.userId === getUser()).permissions === 1, id: group.id}
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
                        handleDelete={this.deleteGroup}/>
                )
            );
        }

        return (
            <div>
                <h3>My Groups:</h3>
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
                    Group Name<br />
                    <input type="text" {...name}/>
                </div>
                <input type="button" onClick={handleCreateGroup} value="Create Group" />
            </div>
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