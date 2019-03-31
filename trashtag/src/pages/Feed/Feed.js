import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Post from '../../components/Post/Post';
import { firebaseApp } from '../../base';
import Upload from '../Upload/Upload.js';
import Map from '../../components/Map/Map';
import './Feed.css'

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
                loadPosts,
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
                loadPosts();
            }
        };
    }

    /* Initial load. */
    componentWillMount() {
        this.loadPosts();
    }

    loadPosts = () => {
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
            posts,
        } = this.state;

        return (
            <div>
                <NavigationBar />
                <Map center={[34.07, -118.438]}/>
                <Upload/>
                {posts.map((singlePost, i) =>
                    <Post
                        key={i}
                        location={singlePost.location}
                        caption={singlePost.caption}
                        photo={"trash" + (i + 1)}
                    />
                )}

                {error &&
                    <div style={{ color: '#900' }}>
                        {error}
                    </div>
                }
                {isLoading &&
                    <div className="loading-sign">loading...</div>
                }
                {!hasMore &&
                    <div>end</div>
                }
            </div>
        );
    }
}

export default Feed;
