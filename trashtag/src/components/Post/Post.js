import React, { Component } from 'react';
import './Post.css';
import like from '../../like.png';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location,
            caption: props.caption,
            // photo: props.photo,
        }
    }
    render() {
        return (
            <div className="post-wrapper">
                <div className="Post">
                    <div className="location">
                        <p>{this.state.location}</p>
                        <button className="clean-button">cleaned it!</button>
                    </div>
                    <div className="content">
                        <div className="caption">
                            <p>{this.state.caption}</p>
                        </div>
                        <div className="photo"></div>
                    </div>
                    <div className="likes">
                        <img className="like-icon" src={like} alt="Like" />
                        <div className="like-count"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
