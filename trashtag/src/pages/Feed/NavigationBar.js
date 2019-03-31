import React, { Component } from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import './NavigationBar.css';
import NavDropdown from './NavDropdown.js'
=======
import { Navbar, Nav, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import './NavigationBar.css';
>>>>>>> 4a4515d6900a9d3a366328387580e66e008e7e25

class NavigationBar extends Component {
	render() {
		return (
<<<<<<< HEAD
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<ul className="container">
					<NavDropdown className="settings">
						<a className="dropdown-item" href="/">leaderboard</a>
						<a className="dropdown-item" href="/">settings</a>
					</NavDropdown>

        			<a className="navbar-brand" href="/">#trashtag</a>

        			<form className="form-inline my-2 my-lg-0">
            			<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            			<button className="btn btn-outline-success my-2 my-sm-0" type="submit">search</button>
          			</form>
          		</ul>
      		</nav>
=======
  				<Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
  					<Navbar.Brand href="#">#trashtag</Navbar.Brand>
  				</Navbar>
>>>>>>> 4a4515d6900a9d3a366328387580e66e008e7e25
		);
	}
}

export default NavigationBar;