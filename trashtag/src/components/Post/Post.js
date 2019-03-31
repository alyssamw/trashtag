import React, { Component } from 'react';
import './Post.css';
import like from '../../like.png';
import trash1 from '../../trash1.jpg';
import trash2 from '../../trash2.jpg';
import trash3 from '../../trash3.jpg';
import trash4 from '../../trash4.jpg';
import trash5 from '../../trash5.jpg';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location,
            caption: props.caption,
            photo: props.photo,
        }
    }
    render() {
        return (
            <div className="post-wrapper">
                <div className="Post">
                    <div className="location">
                        <p className="location-text">{this.state.location}</p>
                        <button className="clean-button">CLEANED IT!</button>
                    </div>
                    <div className="content">
                        <div className="caption">
                            <p className="caption-text">{this.state.caption}</p>
                        </div>
                        <div className="photo-wrapper">
                            <img src={trash4} alt="Trash" className="photo" />
                        </div>
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
