import React, { Component } from 'react';
import Timer from "./components/Timer"
import './App.css';
import Weather from "./components/Weather.js"
class App extends Component {
  render() {
    return (
      <div>
        <div>
        <Weather></Weather>
        </div>
      <div className="App">
      <Timer></Timer>
      </div>
      </div>
    );
  }
}

export default App;
