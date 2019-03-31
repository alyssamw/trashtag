import React, { Component } from 'react';
import './Home.css';
import Feed from '../Feed/Feed';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import FacebookLogin from '../../components/FacebookLoginButton/FacebookLoginButton';
import Leaderboard from '../Leaderboard/Leaderboard.js'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: false,
            users: [],
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
                users: [...this.state.users, resultObject.user.name],
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
                                    <p className="subtitle">make the world a better place, one trash at a time.</p>
                                    <div className="facebook-login">
                                        <FacebookLogin onLogin={this.onFacebookLogin}/>
                                    </div>
                                    <Link className="skip" to="/feed">Skip</Link>
                                </div >
                            </div>
                        )
                )} />
                <Route path="/feed" component={Feed} />
                <Route path="/leaderboard" render={(props) => <Leaderboard {...props} userList={this.state.users}/>}/>
            </Router>
        );
    }
}

export default Home;
