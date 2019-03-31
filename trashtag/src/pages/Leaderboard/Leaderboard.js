import React, { Component } from 'react'
import './Leaderboard.css'

class Leaderboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const userList = [
			{name: 'carey', key: 0},
			{name: 'smallberg', key: 1},
			{name: 'harrop-griffiths', key: 2},
			{name: 'gutperle', key: 3},
			{name: 'corbin', key: 4},
			{name: 'arnold', key: 5},			
			{name: 'wilkinson', key: 6},
		];

		return (
			<div className="leaderboard-wrapper">
				<div className="title">leaderboard</div>
				<ol>
					{userList.map(users => {
						return (
							<li className="list-item" key={users.key}>{users.name}</li>
						);
					})}
				</ol>
			</div>
		)
	}
}

export default Leaderboard