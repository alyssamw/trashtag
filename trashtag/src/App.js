import React, { Component } from 'react';
import Home from './pages/Home/Home'
import Map from './components/Map.js';
import Feed from './pages/Feed/Feed.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Feed/>
      </div>
    );
  }
}

export default App;
