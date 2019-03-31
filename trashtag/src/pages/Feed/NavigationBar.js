import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import './NavigationBar.css';

class NavigationBar extends Component {
	render() {
		return (
  				<Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
  					<Navbar.Brand href="#">#trashtag</Navbar.Brand>
  				</Navbar>
		);
	}
}

export default NavigationBar;