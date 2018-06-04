import React, { Component } from 'react';
// import logo from './logo.svg';
import './styles/App.css';
import Map from './Components/GoogleMap';
import Sidebar from './Components/Sidebar'
// import Map from './Components/Map';
// import Map from './Components/MapV2'


class App extends Component {
  render() {
    return (
      <div className='container'>
      	<Sidebar />
        <Map />
      </div>
    );
  }
}

export default App;
