import React, { Component } from 'react'
import './Leaderboard.css'

class Leaderboard extends Component {
	render() {
		return (
			<div className="leaderboard-wrapper">
				<div className="title">leaderboard</div>
				<ol>
					{this.props.userList.map(user => {
						return (
							<li className="list-item" key={user.uid}>{user.username}</li>
						);
					})}
				</ol>
			</div>
		)
	}
}

export default Leaderboard