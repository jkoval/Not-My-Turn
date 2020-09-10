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
            nextDriver: ""
        };

        this.leastDistance = this.leastDistance.bind(this);
        this.leastAmount = this.leastAmount.bind(this);
        this.leastTime = this.leastTime.bind(this);
    }

    leastDistance() {
        var token = getToken();

        axios({
            method: 'get',
            url: "http://localhost:5000/api/calculate/bydistance/1",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            var data = response.data;
            this.setState({ nextDriver: data.name });
        }).catch(error => {

        });
    }

    leastAmount() {
        var token = getToken();

        axios({
            method: 'get',
            url: "http://localhost:5000/api/calculate/byduration/1",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            var data = response.data;
            this.setState({ nextDriver: data.name });
        }).catch(error => {

        });
    }

    leastTime() {
        var token = getToken();

        axios({
            method: 'get',
            url: "http://localhost:5000/api/calculate/bytime/1",
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
                            value={this.currentGroup}
                            onChange={this.onGroupSelect}
                        >
                        </Select>
                    </StyledFormControl>
                </div>

                <br />

                <Typography variant="h4">Choose the next driver from the following criteria!</Typography>
                <br />
                <div>
                    <BigButton variant="contained" color="primary" onClick={this.leastDistance}>
                        Least Distance
                    </BigButton>
                    <BigButton variant="contained" color="primary" onClick={this.leastAmount}>
                        Least Amount
                    </BigButton>
                    <BigButton variant="contained" color="primary" onClick={this.leastTime}>
                        Least Time
                    </BigButton>
                </div>

                <div>
                    {this.state.nextDriver !== "" ? (<Typography variant="h1">{this.state.nextDriver}</Typography>) : <br/>}
                </div>
            </div>
        )
    }
}

export default CalculateDriver;