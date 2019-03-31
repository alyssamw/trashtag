import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';

const SimpleComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    text: "LAHacks",
    center: {
      lat: 34.0689,
      lng: -118.4452
    },
    zoom: 11
  };
  render() {
    // console.log(process.env.REACT_APP_GCP_KEY)
    return (
      // Important! Always set the container height explicitly
      <div className="map-wrapper">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GCP_KEY }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
        >

          <SimpleComponent
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            text={this.props.text}
          />
        </GoogleMapReact>
      </div>
    );
  }
} export default Map