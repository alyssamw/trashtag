import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'
import { firebaseApp } from '../../base';
import { dummylatlongs } from './dummylatlongs'
import './Map.css';

const SimpleComponent = ({ text }) => <div>{Marker}</div>;

class Map extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: false,
        isLoading: false,
        places: [],
        place_position: []

      };
    }
    static defaultProps = {
        text: "LAHacks",
        zoom: 11
    };
    dummyLoadMarkers = () => {
      // fetch(dummylatlongs)
      // .then(results => {
      //   return results.json();
      // })
      // .then(data => {
        this.setState({place_position: [...this.state.place_position, ...dummylatlongs.places]})
    //   })
    //   .catch((error) => { 
    //     console.log("Something bad happened");
    //     console.log(error.message);
    //     this.setState({
    //         error: error.message,
    //         isLoading: false,
    //     });
    // });
    }
    loadMarkers= () =>
    {
      this.setState({ isLoading: true }, () => {
        firebaseApp.database().ref('posts').once('value')
        .then((snapshot) => {
            let arrayOfKeys = Object.keys(snapshot.val());
            let results = arrayOfKeys.map((key) => snapshot.val()[key]);
            this.setState({
              isLoading: false,
              places: [
                  ...this.state.places,
                  ...results,
              ],
          });
        console.log(results);
        console.log(this.state.places);
        this.state.places.map((place, i) => {
          var address = place.location;
          var formatted_address = address.split(' ').join('+');
          console.log(formatted_address);
          fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+formatted_address+"&key="+process.env.REACT_APP_GCP_KEY)
          .then(results => {
            console.log(results);
            return results.json();
          })
          .then(data => {
            console.log(data);
            this.setState({place_position: [...this.state.place_position, data.candidate[0]]});
          })
        })
        
      })
        .catch((error) => { 
            console.log("Something bad happened");
            this.setState({
                error: error.message,
                isLoading: false,
            });
        });
      });
    }
   
    componentDidMount() {
      //this.loadMarkers()
      this.dummyLoadMarkers();
    }
  
    render() {
      const { places } = this.state; // Copy the places array
        return (
          // Important! Always set the container height explicitly
          <div className="map-wrapper">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GCP_KEY }}
              center={this.props.center}
              defaultZoom={this.props.zoom}
            >
            {this.state.place_position.map((place, i) =>(
                <Marker
                key = {i}
                text=""
                lat={place.lat}
                lng={place.lng}
                />
            ))}
              
            </GoogleMapReact>
          </div>
        );
      }
} export default Map