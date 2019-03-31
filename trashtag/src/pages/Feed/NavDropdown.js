import React, { Component } from 'react'

class NavDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOn: false,
		};
	}

	showDropdown(e) {
		e.preventDefault();
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn,
		}));
	}

	render() {
		const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? ' show' : '')

		return (
			<button className="nav-item dropdown">
				<a className="nav-link dropdowdn-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" area-haspopup="true" aria-expanded="false" onClick={(e) => {this.showDropdown(e)}}>
					<img src={require('./menu.jpg')} width="22
					" height="22"></img>
				</a>

				<div className={classDropdownMenu} aria-labelledby="navbarDropdown">
					{this.props.children}
				</div>
			</button>
		)
	}
}

export default NavDropdown;

/*


				<div className="collapse navbar-collapse" id="navbarSupportedContent">
          			<ul className="navbar-nav mr-auto">
            			<li className="nav-item active">
              				<a className="nav-link" href="/">settings<span className="sr-only">(current)</span></a>
            			</li>
            			<li className="nav-item">
              				<a className="nav-link" href="/">leaderboard</a>
            			</li>
            		</ul>
        		</div>
        		*/