import React from 'react';

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.platform = null;
        this.map = null;

        this.state = {
            app_id: props.app_id,
            app_code: props.app_code,
            center: {
                lat: props.lat,
                lng: props.lng,
            },
            zoom: props.zoom,
            theme: props.theme,
            style: props.style
        }

        this.addClickEventHandler = this.addClickEventHandler.bind(this);
    }

    componentDidMount() {
        this.platform = new window.H.service.Platform(this.state);

        var layer = this.platform.createDefaultLayers();
        var container = document.getElementById('here-map');

        this.map = new window.H.Map(container, layer.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom,
          })

        var events = new window.H.mapevents.MapEvents(this.map);
        var behavior = new window.H.mapevents.Behavior(events);
        var ui = new window.H.ui.UI.createDefault(this.map, layer);

        this.addClickEventHandler(this.map, this.props.onTap);
    }

    addClickEventHandler(map, onTap) {
        map.addEventListener('tap', function (evt) {
            //var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
            // var marker = new window.H.map.Marker({lat:coord.lat, lng:coord.lng});
            // map.addObject(marker);

            onTap(map, evt.currentPointer.viewportX, evt.currentPointer.viewportY);
        });
    }

    render() {
        return (
            <div>
                <div id="here-map" style={{width: '100%', height: '600px', background: 'grey' }} />
            </div>
        );
    }
}

export default Map;