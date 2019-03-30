import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Map from '../components/Map.js'

const SimpleComponent = ({ text }) => <div>{text}</div>;

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 34.0689,
                lng: -118.4452
            }
        };
        this.initMap = this.initMap.bind(this);
    }

    componentDidMount() {
        this.initMap();
    }

    handleLocationError = (browserHasGeolocation) => {
        console.log('error getting location')
        console.log(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.')
    }

    initMap() {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
            console.log(pos.lat);
            console.log(pos.lng);
            this.setState({center: [pos.lat, pos.lng]});
        }, function() {
            this.handleLocationError(true);
        });
        } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false);
        }
    }

   

    render() {
        return(
            <div>
                <div>My map</div>
                <Map/>
                <div>End my map</div>
            </div>
        )
    }
}

export default Upload