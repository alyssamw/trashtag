import React, { Component } from 'react';
import Feed from './pages/Feed/Feed'
import Home from './pages/Home/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
