import React, { Component, Fragment } from 'react';
import { render } from "react-dom";
import request from "superagent";
import NavigationBar from './NavigationBar.js';
<<<<<<< HEAD

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
=======
import Post from '../../components/Post/Post';
import base, { firebaseApp } from '../../base';

let referenceToOldestKey = '';

class Feed extends Component {
    constructor(props) {
        super(props);

        /* Initial state of the Feed. */
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            posts: [],
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
            if (!referenceToOldestKey) {
                firebaseApp.database().ref('posts')
                    .orderByKey()
                    .limitToLast(5)
                    .once('value')
                    .then((snapshot) => {
                        let arrayOfKeys = Object.keys(snapshot.val())
                            .sort()
                            .reverse();
                        let results = arrayOfKeys.map((key) => snapshot.val()[key]);
                        referenceToOldestKey = arrayOfKeys[arrayOfKeys.length - 1];
                        this.setState({
                            hasMore: (this.state.posts.length < 80),
                            isLoading: false,
                            posts: [
                                ...this.state.posts,
                                ...results,
                            ],
                        });
                        console.log(results);
                    })
                    .catch((error) => { 
                        console.log("Something bad happened");
                        this.setState({
                            error: error.message,
                            isLoading: false,
                        });
                     });
            }
            else {
                firebaseApp.database().ref('posts')
                    .orderByKey()
                    .endAt(referenceToOldestKey)
                    .limitToLast(6)
                    .once('value')
                    .then((snapshot) => {
                        let arrayOfKeys = Object.keys(snapshot.val()).sort().reverse().slice(1);
                        let results = arrayOfKeys.map((key) => snapshot.val()[key]);
                        referenceToOldestKey = arrayOfKeys[arrayOfKeys.length - 1];
                        this.setState({
                            hasMore: (this.state.posts.length < 80),
                            isLoading: false,
                            posts: [
                                ...this.state.posts,
                                ...results,
                            ],
                        });
                    })
                    .catch((error) => {
                        console.log("Something bad happened");
                        this.setState({
                            error: error.message,
                            isLoading: false,
                        });
                });
            }
        });
    }

    render() {
        const {
            error,
            hasMore,
            isLoading,
            posts: posts,
        } = this.state;

        return (
            <div>
                <NavigationBar />
                <p>scroll to load more</p>
                <hr />
                {posts.map((singlePost, i) =>
                    <Post
                        key={i}
                        location={singlePost.location}
                        caption={singlePost.caption}
                    />
                )}
                {/* {posts.map(post => (
                    <Fragment key={post.location}>
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
                ))} */}
                
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
>>>>>>> 4a4515d6900a9d3a366328387580e66e008e7e25
}

export default Feed;
