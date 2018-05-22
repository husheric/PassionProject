import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './Components/GoogleMap';
// import Map from './Components/Map';
// import Map from './Components/MapV2'


class App extends Component {
  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default App;
