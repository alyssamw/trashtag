import React, { Component } from 'react';
import './Upload.css';
import Map from '../components/Map.js';
import Grid from '@material-ui/core/Grid';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup/';
import FormControlLabel from '@material-ui/core/FormControlLabel/';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasGeolocation: true,
            center: {
                lat: 34.0689,
                lng: -118.4452
            },
            locationHelper: "",
        };
        this.initMap = this.initMap.bind(this);
        this.initMap();
    }

    componentDidMount = () => {
       document.addEventListener('GeolocationFound', this.renderMap)
    }

    componentWillUnmount = () => {
        document.removeEventListener('GeolocationFound', this.renderMap)
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
        navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
            console.log(pos.lat);
            console.log(pos.lng);
            this.setState({hasGeolocation: true})
            this.setState({center: [pos.lat, pos.lng]})
            document.dispatchEvent(new Event('GeolocationFound'))
        }, function() {
            this.handleLocationError(true);
            this.setState({hasGeolocation: false});
        });
        } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false);
        this.setState({hasGeolocation: false});
        }
    }

    renderMap = (lat, lng) => {
        return(
            <Map center={[lat, lng]} />
        )
    }
   
    renderNoGeolocation = () => {
        return(<div>We could not find ur current location</div>)
    }

    addressField = () => {
        var clMap = this.state.hasGeolocation ? this.renderMap(this.state.center.lat, this.state.center.lng) : this.renderNoGeolocation();
        return(
            <div>
                <div style={{justifyContent: "center", width: "100%"}}>{clMap}</div>
                <br/>
                <div>
                    <FormGroup row className="formRow" style={{display: "flex", width:"100%"}}>
                        <TextField id="address" placeholder="Manually type in location or " style={{width:"75%"}}/>
                        <div style={{flex: 0.25}}></div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                value="curLoc"
                                />
                            }
                            label="Use my current location"
                            disabled={!this.state.hasGeolocation}
                        />
                    </FormGroup>
                </div>
            </div>
        )
    }

    renderForm = () => {
        return(
            <div>
                <br/>
                <Form>
                    <TextField id="title" placeholder="Title" fullWidth="true" InputProps={{style: {fontSize: "28px"}}}/>
                    <br/>
                    <FormGroup row className="formRow" style={{display: "flex", width:"100%"}}>
                        <TextField id="address" placeholder="Manually type in location or " style={{width:"60%"}}/>
                        <div style={{flex: 0.05}}></div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                value="curLoc"
                                />
                            }
                            label="Use my current location"
                            disabled={!this.state.hasGeolocation}
                        />
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <TextField id="description" multiline="true" rows="3" placeholder="How much trash did you clean up? What was something crazy you found? One man's trash is another man's internet karma..."  style={{width: "100%"}}/>
                    </FormGroup>
                    <br/>
                    <FormGroup row className="formRow">
                        <InputLabel>Please upload a photo of the beautiful area you have now cleaned up </InputLabel>
                        <div style={{flex: 0.15}}></div>
                        <Input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span">
                            Upload
                        </Button>
                        </label> 
                    </FormGroup>
                </Form>
            </div>
        )
    }

    render() {
        return(
            <div>
                <Grid container row gridGap="4px">
                    <Grid item xs={6}>{this.addressField()}</Grid>
                    <Grid item xs={6}>{this.renderForm()}</Grid>
                </Grid>
            </div>
        )
    }
}

export default Upload