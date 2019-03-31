import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import GCP_KEY from '../../config.js'

const SimpleComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static defaultProps = {
        text: "LAHacks",
        zoom: 11
    };
    render() {
        return (
          // Important! Always set the container height explicitly
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: GCP_KEY }}
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