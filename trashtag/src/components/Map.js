import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const SimpleComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static defaultProps = {
        text: "Kreyser Avrora",
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
    };
    render() {
        return (
          // Important! Always set the container height explicitly
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyDU40XGqr3SR80ECP0POFrKL9WNZmHzhO0" }}
              defaultCenter={this.props.center}
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