import React from 'react'

class AddDestinationDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "Default Name",
            order: 2
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
        this.props.childPropertyChanged("name", this.state.name);
    }
    
    handleOrderChange(event) {
        this.setState({order: event.target.value});
        this.props.childPropertyChanged("order", this.state.order);
    }

    render() {
        return (
            <div>
                <h3>Add Destination</h3>
                <div>
                    Destination Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                </div>
                <div>
                    Destination Order:
                    <input type="number" min="1" step="1" value={this.state.order} onChange={this.handleOrderChange}/>
                </div>
            </div>
        );
    }

}

export default AddDestinationDialog;