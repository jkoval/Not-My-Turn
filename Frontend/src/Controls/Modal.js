import React from 'react'

class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.childValues = {};

        this.onAccept = this.onAccept.bind(this);
        this.childPropertyChanged = this.childPropertyChanged.bind(this);
    }

    childPropertyChanged(key, value) {
        this.childValues[key] = value;
    }

    onAccept() {
        this.props.onAccept(this.childValues);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        const windowStyle = {
            position: 'absolute',
            left: this.props.position.x,
            top: this.props.position.y,

            backgroundColor: '#5680E9',
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 5,
            height: 200,
            width: 200
        }

        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                childPropertyChanged: this.childPropertyChanged
            });
        });

        return (
            <div style={windowStyle}>
                {children}

                <div>
                    <button onClick={this.onAccept}>
                        Accept
                    </button>
                    
                    <button onClick={this.props.onClose}>
                        Close
                    </button>
                </div>
            </div>
        )
    }
}

export default Modal;