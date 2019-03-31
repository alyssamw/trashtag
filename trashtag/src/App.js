import React, { Component } from 'react';
import Home from './pages/Home/Home'
import Map from './components/Map.js';
<<<<<<< HEAD
import Feed from './pages/Feed/Feed.js';
=======
import Post from './components/Post/Post';
import Feed from './pages/Feed/Feed';
>>>>>>> 4a4515d6900a9d3a366328387580e66e008e7e25
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
=======
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
>>>>>>> 4a4515d6900a9d3a366328387580e66e008e7e25
        <Feed/>
      </div>
    );
  }
}

export default App;
