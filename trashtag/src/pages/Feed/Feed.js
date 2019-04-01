import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import PostContainer from '../../components/PostContainer/PostContainer';
import { firebaseApp } from '../../base';
import Upload from '../../components/Upload/Upload';
import Map from '../../components/Map/Map';
import './Feed.css'

let referenceToOldestKey = '';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postKey: Math.random()
        }
    }

    updatePosts = (token) => {
        this.setState({
            postKey: Math.random()
        })
    }

    render() {

        return (
            <div>
                <NavigationBar />
                <Map center={[34.07, -118.438]}/>
                <Upload onUpload={this.updatePosts}/>
                <PostContainer key={this.state.postKey}/>
            </div>
        );
    }
}

export default Feed;
