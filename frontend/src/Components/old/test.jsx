import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

class test extends Component {
	constructor() {
		super();
	}

	render() {

		return (
			<div>hello world</div>
		)
	}
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Map);