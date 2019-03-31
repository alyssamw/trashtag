import React, { Component } from 'react';
import './NavigationBar.css';
import NavDropdown from './NavDropdown.js';
import { Link } from "react-router-dom";

class NavigationBar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<ul className="container">
					<NavDropdown className="settings">
						<Link className="dropdown-item" to="/leaderboard">leaderboard</Link>
						<a className="dropdown-item" href="/">settings</a>
					</NavDropdown>

        			<Link to="/feed" className="navbar-brand" >#trashtag</Link>

        			<form className="form-inline my-2 my-lg-0">
            			<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            			<button className="btn btn-outline-success my-2 my-sm-0" type="submit">search</button>
          			</form>
          		</ul>
      		</nav>
		);
	}
}

export default NavigationBar;