import React from 'react';
import { styled } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getUser, getToken } from '../Utils/UserStateUtils'
const axios = require('axios');

const StyledFormControl = styled(FormControl)({
    minWidth: 200,
    minHeight: 100
});

const BigButton = styled(Button)({
    minWidth: 250,
    minHeight: 100,
    marginRight: 10
});

class CalculateDriver extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nextDriver: "",
            currentGroup: null,
            groups: []
        };

        this.leastDistance = this.leastDistance.bind(this);
        this.leastDuration = this.leastDuration.bind(this);
        this.leastRecent = this.leastRecent.bind(this);
        this.onGroupSelect = this.onGroupSelect.bind(this);
        this.getGroups = this.getGroups.bind(this);
    }

    componentDidMount() {
        this.getGroups();
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
            var groups = data.map(function(group) {
                 return { name: group.name, id: group.id };
            });
            this.setState({ groups: groups});
        }).catch(error => {

        });
    }

    onGroupSelect(event) {
        this.setState({currentGroup: event.target.value});
    }

    leastDistance() {
        var token = getToken();

        axios({
            method: 'get',
            url: "http://localhost:5000/api/calculate/bydistance/" + this.state.currentGroup.id,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            var data = response.data;
            this.setState({ nextDriver: data.name });
        }).catch(error => {

        });
    }

    leastDuration() {
        var token = getToken();

        axios({
            method: 'get',
            url: "http://localhost:5000/api/calculate/byduration/" + this.state.currentGroup.id,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            var data = response.data;
            this.setState({ nextDriver: data.name });
        }).catch(error => {

        });
    }

    leastRecent() {
        var token = getToken();

        axios({
            method: 'get',
            url: "http://localhost:5000/api/calculate/bytime/" + this.state.currentGroup.id,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            var data = response.data;
            this.setState({ nextDriver: data.name });
        }).catch(error => {

        });
    }

    render() {
        let groups = [];
        this.state.groups.forEach((group) => {
            groups.push(<MenuItem value={group}>{group.name}</MenuItem>);
        });

        return (
            <div>
                <div>
                    <Typography variant="h2">Choose Driver</Typography>
                </div>

                <div>
                    <StyledFormControl>
                        <InputLabel id="group-select-label">Group</InputLabel>
                        <Select
                            labelId="group-select-label"
                            id="group-select"
                            value={this.state.currentGroup}
                            onChange={this.onGroupSelect}
                        >
                            {groups}
                        </Select>
                    </StyledFormControl>
                </div>

                <br />

                <Typography variant="h4">Choose the next driver from the following criteria!</Typography>
                <br />
                <div>
                    <BigButton variant="contained" color="primary" onClick={this.leastDistance} disabled={this.state.currentGroup === null}>
                        Least Distance
                    </BigButton>
                    <BigButton variant="contained" color="primary" onClick={this.leastDuration} disabled={this.state.currentGroup === null}>
                        Least Duration
                    </BigButton>
                    <BigButton variant="contained" color="primary" onClick={this.leastRecent} disabled={this.state.currentGroup === null}>
                        Least Recent
                    </BigButton>
                </div>

                <div>
                    {this.state.nextDriver !== "" ? (<Typography variant="h1">The next driver should be: {this.state.nextDriver}</Typography>) : <br/>}
                </div>
            </div>
        )
    }
}

export default CalculateDriver;