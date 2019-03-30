import React, { Component } from 'react';
import './Home.css';
import FacebookLogin from 'react-facebook-login';

class Home extends Component {

    render() {
        const responseFacebook = (response) => {
            console.log(response);
        }
        return (
            <div id="home-wrapper">
                <div className="Home">
                    <p className="title">trashtag</p>
                    <p className="caption">make the world a better place, one trash at a time.</p>
                    <FacebookLogin
                        appId="1088597931155576"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook} />
                </div >
            </div>
        );
    }
}

export default Home;
