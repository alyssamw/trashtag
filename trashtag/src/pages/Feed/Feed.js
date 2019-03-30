import React, { Component, Fragment } from 'react';
import { render } from "react-dom";
import request from "superagent";
import NavigationBar from './NavigationBar.js';

class Feed extends Component {
	constructor(props) {
		super(props);

		/* Initial state of the Feed. */
		this.state = {
			error: false,
			hasMore: true,
			isLoading: false,
			users: [],
		};

		/* Bind scroll event handler. */
		window.onscroll = () => {
			const {
				loadUsers,
				state: {
					error,
					isLoading,
					hasMore,
				},
			} = this;

			/* If nothing left to load, leave. */
			if (error || isLoading || !hasMore)
				return;

			/* Check that page is not at bottom. */
			if (window.innerheight + document.documentElement.scrollTop === document.documentElement.offsetheight) {
				loadUsers();
			}
		};
	}

	/* Initial load. */
	componentWillMount() {
		this.loadUsers();
	}

	loadUsers = () => {
		this.setState({ isLoading: true }, () => {
			request
				.get('https://randomuser.me/api/?results=30')
				.then((results) => {

					/* Array of user data. */
					const nextUsers = results.body.results.map(user => ({
						email: user.email,
						name: Object.values(user.name).join(' '),
						photo: user.picture.medium,
						username: user.login.username,
						uuid: user.login.uuid,
					}));

					/* Combines next users into existing users. */
					this.setState({
						hasMore: (this.state.users.length < 100),
						isLoading: false,
						users: [
							...this.state.users,
							...nextUsers,
						],
					});
				})
				.catch((err) => {
					this.setState({
						error: err.message,
						isLoading: false,
					});
				})
			});
		}

	render() {
		const {
			error,
			hasMore,
			isLoading,
			users,
		} = this.state;

		return (
      		<div>
        		<NavigationBar />
        		<p>scroll to load more</p>
        		{users.map(user => (
          			<Fragment key={user.username}>
            			<hr />
            			<div style={{ display: 'flex' }}>
              				<img
              					class='photo'
                				alt={user.username}
                				src={user.photo}
              				/>
              				<div>
                				<h2 style={{ marginTop: 0 }}>
                  					@{user.username}
                				</h2>
                				<p>Name: {user.name}</p>
                				<p>Email: {user.email}</p>
              				</div>
            			</div>
          			</Fragment>
        		))}
        		<hr />
        		{error &&
          			<div style={{ color: '#900' }}>
            			{error}
          			</div>
        		}
        		{isLoading &&
          			<div>loading...</div>
        		}
       			 {!hasMore &&
         			 <div>end</div>
        		}
      		</div>
		);
	}
}

export default Feed;
