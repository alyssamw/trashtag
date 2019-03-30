import React, { Component } from 'react';
import './Home.css';
import Feed from '../Feed/Feed';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import FacebookLogin from '../../components/FacebookLoginButton/FacebookLoginButton';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: false,
        }
    }

    // componentDidMount() {
    //     document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
    // }

    // statusChangeCallback = (response) => {
    //     if(response.status === 'connected') {
    //         this.setState({
    //             loginStatus: true,
    //         })
    //     }
    //     else {
    //         this.setState({
    //             loginStatus: false,
    //         })
    //     }
    // }

    // initializeFacebookLogin = () => {
    //     this.FB = window.FB;
    //     this.FB.getLoginStatus((response) => {
    //         this.statusChangeCallback(response);
    //     });
    // }

    onFacebookLogin = (loginStatus, resultObject) => {
        console.log(loginStatus);
        if (loginStatus === true) {
            this.setState({
                // username: resultObject.user.name
                loginStatus: true,
            });
        } else {
            this.setState({
                loginStatus: false,
            })
            console.log('Please log in');
        }
    }

    render() {
        return (
            <Router>
                <Route exact path="/" render={() => (
                    this.state.loginStatus ? (
                        //console.log('Logged in!')
                       <Redirect to="/feed" />
                    ) : (
                            <div id="home-wrapper">
                                <div className="Home">
                                    <p className="title">#trashtag</p>
                                    <p className="caption">make the world a better place, one trash at a time.</p>
                                    <FacebookLogin onLogin={this.onFacebookLogin}/>
                                </div >
                            </div>
                        )
                )} />
                <Route path="/feed" component={Feed} />

            </Router>
        );
    }
}

export default Home;
