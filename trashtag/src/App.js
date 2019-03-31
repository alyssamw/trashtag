import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './pages/Home/Home'
import Map from './components/Map.js';
import Post from './components/Post/Post';
import Feed from './pages/Feed/Feed';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Map/>
        <Feed/>
      </div>
    );
  }
}

export default App;
