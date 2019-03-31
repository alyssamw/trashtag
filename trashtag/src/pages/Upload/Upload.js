import React, { Component } from 'react';
import './Upload.css';
import Map from '../../components/Map/Map';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup/';
import FormControlLabel from '@material-ui/core/FormControlLabel/';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

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
            image: null,
            url: ''
        };
        this.initMap = this.initMap.bind(this);
        this.initMap();
        this.handleChange = this.handleChange.bind(this);
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
                this.setState({ hasGeolocation: true })
                this.setState({ center: [pos.lat, pos.lng] })
                document.dispatchEvent(new Event('GeolocationFound'))
            }, function () {
                this.handleLocationError(true);
                this.setState({ hasGeolocation: false });
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false);
            this.setState({ hasGeolocation: false });
        }
    }

    renderMap = (lat, lng) => {
        return (
            <Map center={[lat, lng]} />
        )
    }

    renderNoGeolocation = () => {
        return (<div>We could not find ur current location</div>)
    }

    addressField = () => {
        var clMap = this.state.hasGeolocation ? this.renderMap(this.state.center.lat, this.state.center.lng) : this.renderNoGeolocation();
        return (
            <div>
                <div style={{ justifyContent: "center", width: "100%" }}>{clMap}</div>
                <br />
                <div>
                    <FormGroup row className="formRow" style={{ display: "flex", width: "100%" }}>
                        <TextField id="address" placeholder="Manually type in location or " style={{ width: "75%" }} />
                        <div style={{ flex: 0.25 }}></div>
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

    handleChange = e => {
        if (e.target.files[0]) {
            const image = this.target.files[0];
            this.setState(() => ({image}));
        }
    }

    renderForm = () => {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="form-wrapper">
                    <Form>
                        <br />
                        <FormGroup row className="formRow" style={{ display: "flex", width: "100%" }}>
                            <TextField id="address" placeholder="Manually type in location or... " style={{ width: "100%" }} />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="curLoc"
                                        color="primary"
                                    />
                                }
                                label="Use my current location"
                                disabled={!this.state.hasGeolocation}

                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField id="description" variant="outlined" multiline="true" rows="3" placeholder="Please give a short description about the area in need of beautification." style={{ width: "100%" }} />
                        </FormGroup>
                        <br />
                        <FormGroup row className="formRow">

                            <InputLabel m={10}>Please upload a photo of the dirty area you found... </InputLabel>
                            <div id="upload-wrapper">
                                <Input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="raised-button-file" onChange={this.handleChange}>
                                    <Button variant="raised" size="small" component="span" color="primary" id="upload-button">
                                        Upload
                                    </Button>
                                </label>
                            </div>

                            <div id="post-wrapper">
                                <label>
                                    <Button variant="raised" size="small" component="span" color="primary" id="post-button">
                                        Post
                                    </Button>
                                </label>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </MuiThemeProvider>
        )
    }

    render() {
        return (
            <div className="upload">
                {this.renderForm()}
            </div>
        )
    }
}

export default Upload;