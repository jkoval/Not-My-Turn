import React from 'react';
import Map from '../Controls/Map.js';
import { styled } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getUser, getToken } from '../Utils/UserStateUtils'
import DateFnsUtils from '@date-io/date-fns';
import { 
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
const axios = require('axios');

const StyledFormControl = styled(FormControl)({
    minWidth: 300,
    minHeight: 50
});

class AddDrive extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            currentGroup: null,
            drivers: [],
            currentDriver: null,
            map: null,
            selectedDate: new Date()
        };
        
        this.onTap = this.onTap.bind(this);
        this.onGroupSelect = this.onGroupSelect.bind(this);
        this.onDriverSelect = this.onDriverSelect.bind(this);
        this.handleDateChange =  this.handleDateChange.bind(this);
        this.addDrive = this.addDrive.bind(this);
    }

    addMarker(map, coord, index) {
        var markupTemplate = '<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="36px"><path d="M 19 31 C 19 32.7 16.3 34 13 34 C 9.7 34 7 32.7 7 31 C 7 29.3 9.7 28 13 28 C 16.3 28 19 29.3 19 31 Z" fill="#000" fill-opacity=".2"/><path d="M 13 0 C 9.5 0 6.3 1.3 3.8 3.8 C 1.4 7.8 0 9.4 0 12.8 C 0 16.3 1.4 19.5 3.8 21.9 L 13 31 L 22.2 21.9 C 24.6 19.5 25.9 16.3 25.9 12.8 C 25.9 9.4 24.6 6.1 22.1 3.8 C 19.7 1.3 16.5 0 13 0 Z" fill="#fff"/><path d="M 13 2.2 C 6 2.2 2.3 7.2 2.1 12.8 C 2.1 16.1 3.1 18.4 5.2 20.5 L 13 28.2 L 20.8 20.5 C 22.9 18.4 23.8 16.2 23.8 12.8 C 23.6 7.07 20 2.2 13 2.2 Z" fill="#18d"/><text x="13" y="19" font-size="12pt" font-weight="bold" text-anchor="middle" fill="#fff">${text}</text></svg>';
        var markup = markupTemplate.replace('${text}', index);
        var icon = new window.H.map.Icon(markup);

        var marker = new window.H.map.Marker({lat:coord.lat, lng:coord.lng}, { icon: icon });
        map.addObject(marker);
    }

    onTap(map, x, y) {
        var coord = map.screenToGeo(x, y);
        this.addMarker(map, coord, map.getObjects().length + 1);

        if (this.state.map == null) {
            this.setState({map: map});
        }
    }

    onGroupSelect(event) {
        this.setState({currentGroup: event.target.value});
    }

    onDriverSelect(event) {
        this.setState({currentDriver: event.target.value});
    }

    handleDateChange(date) {
        this.setState({selectedDate: date});
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
                 return { name: group.name, id: group.id, users: group.users };
            });
            this.setState({ groups: groups});
        }).catch(error => {

        });
    }

    componentDidMount() {
        this.getGroups();
    }

    addDrive() {
        if (this.state.map == null) {
            return;
        }

        if (this.state.currentGroup == null) {
            return;
        }

        if (this.state.currentDriver == null) {
            return;
        }

        if (this.state.map.getObjects().length < 1) {
            return;
        }

        var token = getToken();

        var locations = this.state.map.getObjects().map((marker) => {
            return marker.getGeometry().lat + "," + marker.getGeometry().lng;
        });

        const body = JSON.stringify({
            PassengerUserIds: [],
            DriverUserId: this.state.currentDriver,
            UserGroupId: this.state.currentGroup.id,
            Locations: locations,
            Timestamp: this.state.selectedDate
        });

        axios({
            method: 'post',
            url: "http://localhost:5000/api/drive/create",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: body
        }).then(response => {
            this.props.history.push('/home');
        }).catch(error => {

        });
    }

    render() {
        var groups = [];
        var users = [];

        this.state.groups.forEach((group) => {
            groups.push(<MenuItem value={group}>{group.name}</MenuItem>);
        });

        if (this.state.currentGroup != null) {
            this.state.currentGroup.users.forEach((user) => {
                users.push(<MenuItem value={user.userId}>{user.user.name}</MenuItem>)
            });
        }

        return (
            <div>
                <Typography variant="h2">
                    Add New Drive
                </Typography>

                <div>
                    <StyledFormControl>
                        <InputLabel id="group-select-label">Group</InputLabel>
                        <Select
                            labelId="group-select-label"
                            id="group-select"
                            value={this.currentGroup}
                            onChange={this.onGroupSelect}
                        >
                            {groups}
                        </Select>
                    </StyledFormControl>

                    <br />

                    <StyledFormControl>
                        <InputLabel id="driver-select-label">Driver</InputLabel>
                        <Select
                            labelId="driver-select-label"
                            id="driver-select"
                            value={this.currentDriver}
                            onChange={this.onDriverSelect}
                        >
                            {users}
                        </Select>
                    </StyledFormControl>

                    <br />

                    <StyledFormControl>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </StyledFormControl>

                    <br />
                    <br />

                    <Button variant="contained" color="primary" onClick={this.addDrive}>
                        Add Drive
                    </Button>
                </div>

                <br />

                <Map
                    app_id="yTjwq58WL50BY9TGpUUX"
                    app_code="6AVvQtGYK2e34p4gG-DZ7Q"
                    lat="51.0"
                    lng="-4.2"
                    zoom="12"
                    theme={ 'reduced.day' }
                    onTap={this.onTap}
                />
            </div>
        )
    }
}

export default AddDrive;