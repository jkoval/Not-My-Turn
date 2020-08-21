import React from 'react';
import Map from '../Controls/Map.js';
import Modal from '../Controls/Modal.js';
import AddDestinationDialog from './AddDestinationDialog.js';

class Home extends React.Component {

   constructor(props) {
      super(props);
  
      this.state = { 
         showMapPopup: false,
         mapPopupPosition: {
            x: 0,
            y: 0
         }
      };

      this.onMapTap = this.onMapTap.bind(this);
      this.onMapPopupAccept = this.onMapPopupAccept.bind(this);
    }

   toggleMapPopup = (x, y) => {
      this.setState({
         showMapPopup: !this.state.showMapPopup,
         mapPopupPosition: {
            x: x,
            y: y
         }
       });
   }

   onMapTap(x, y) {
      this.toggleMapPopup(x, y);
   }

   onMapPopupAccept(data) {
      this.toggleMapPopup(0, 0);
      alert(data.name + " " + data.order);
   }

   render() {
      return (
         <div>
            Test Homepage.
   
            <Map
               app_id="yTjwq58WL50BY9TGpUUX"
               app_code="6AVvQtGYK2e34p4gG-DZ7Q"
               lat="51.0"
               lng="-4.2"
               zoom="12"
               theme={ 'reduced.day' }
               onTap={this.onMapTap}
            />

            <Modal 
               show={this.state.showMapPopup}
               onClose={this.toggleMapPopup}
               position={this.state.mapPopupPosition}
               onAccept={this.onMapPopupAccept}>
                  <AddDestinationDialog />
            </Modal>
         </div>
      );
   }
}

export default Home;