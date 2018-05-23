import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import axios from "axios";
import { map_options, google_map_api_key } from '../constants';
import GoogleMapReact from 'google-map-react';
import '../styles/GoogleMap.css'

import userLocationIcon from '../icons/005-userLocation.svg';
import weatherIcon from '../icons/001-weather.svg';
import crimeIcon from '../icons/002-crime.svg'
import otherIcon from '../icons/003-other.svg'
import constructionIcon from '../icons/004-construction.svg';
import circleIcon from '../icons/circle-stroked-11.svg';

/*
marker object  = {
	reported_by,
	timestamp,
	category,
	latitude,
	longitude,
	description
}

*/

const iconDict = {
	user: userLocationIcon,
	weather: weatherIcon,
	construction: constructionIcon,
	crime: crimeIcon,
	other: otherIcon,
	new: circleIcon
}

class PopupComponent extends Component {
	render() {
		const { marker } = this.props
		return (
			<div className='popup'>
				{marker.category}: {marker.description}
			</div>
		)
	}
}

class MarkerComponent extends Component {
	render() {
		const { marker } = this.props;
		return (
			<div>
				<img src={iconDict[marker.category]} />
			</div>
		)
	}
}
// width='18px' height='18px' 

class ReportComponent extends Component {
	render() {
		return (
			<div style={{ backgroundColor: 'red', width: '75px' }} onClick={this.props.onClick} >
				<img src={circleIcon} width='18px' height='18px' />
				<h1 style={{ display: 'inline-block' }} >REPORT</h1>
			</div>
		)
	}
}

class Map extends Component {
	constructor() {
		super();

		this.counter = 0

		this.userMarker = {
			category: 'user',
			description: 'your current location'
		}

		this.getMarkers();

		this.state = {
			shouldMapCenterOnUserCoord: true,
			markers: [],
			newReport: false,
			draggable: true,
			center: { lat: 40.73, lng: -73.93 },
			zoom: 13,
			popup: null
		}
	}

	getMarkers = () => {
		axios.get(`/getMarkers`)
			.then(res => {
				this.setState({
					markers: res.data.data
				})
			})
	}

	handleOnClickNewReport = e => {
		const { center } = this.state;
		const newReport = {
			reported_by: 1,
			category: 'new',
			latitude: center.lat,
			longitude: center.lng,
			description: ''
		}
		this.setState({
			newReport
		})
	}

	handleOnChange = e => {
		this.setState({
			center: e.center,
			zoom: e.zoom
		})
	}

	handleOnMarkerDrag = (key, marker, mouse) => {
		if (marker.marker.category === 'new') {
			console.log(marker, mouse)
			const newReportCopy = { ...this.state.newReport }
			newReportCopy.latitude = mouse.lat
			newReportCopy.longitude = mouse.lng
			this.setState({
				newReport: newReportCopy
			})
		}
	}

	handleOnChildMouseDown = () => {
		this.setState({
			draggable: false
		})
	}

	handleOnChildMouseUp = () => {
		this.setState({
			draggable: true
		})
	}

	handleDistanceToMouse = (a,b,c) => {
		this.counter = this.counter + 1;
		console.log(this.counter, a, b, c)
	}

	handleOnChildMouseEnter = (key, marker) => {
		// show pop up here
		// this is a marker
		this.setState({
			popup: marker.marker
		})
	}

	handleOnChildMouseLeave = (key, marker) => {
		this.setState({
			popup: false
		})
	}

	render() {
		const { shouldMapCenterOnUserCoord, markers, newReport, center, zoom, draggable, popup } = this.state;
		const { coords } = this.props;
		// console.log(this.state)

		return (
			<div style={{ width: '90vh', height: '90vh', cursor: 'crosshair' }}>
	      <GoogleMapReact
          bootstrapURLKeys={{ key: google_map_api_key }}
          center={(shouldMapCenterOnUserCoord && coords && { lat: coords.latitude, lng: coords.longitude }) || center}
          options={{ styles: map_options }}
          zoom={zoom}
          draggable={draggable}
          onChange={this.handleOnChange}
          // onChildClick={(a,b) => console.log(a,b)} // (a,b) = (key??, marker)
    			onChildMouseDown={this.handleOnChildMouseDown}
    			onChildMouseUp={this.handleOnChildMouseUp}
    			onChildMouseMove={this.handleOnMarkerDrag}
    			onChildMouseEnter={this.handleOnChildMouseEnter}
    			onChildMouseLeave={this.handleOnChildMouseLeave}
    			// hoverDistance={15}
    			// distanceToMouse={this.handleDistanceToMouse}
	      >
	      	{newReport && (
	      		<MarkerComponent
	      			marker={newReport}
	      			lat={newReport.latitude}
	      			lng={newReport.longitude}
	      		/>
	      	)}
	      	{markers.map((marker, i) => (
	      		<MarkerComponent
	      			marker={marker}
	      			lat={marker.latitude}
	      			lng={marker.longitude}
	      			index={i}
	      			key={marker.id}
	      			text={marker.description}
	      		/>
	      	))}
	      	<ReportComponent
	      		onClick={this.handleOnClickNewReport}
	      	/>
	      	{coords && (
	      		<MarkerComponent
	      			marker={this.userMarker}
	      			lat={coords.latitude}
	      			lng={coords.longitude}
	      		/>
	      	)}
	      	{popup && (
	      		<PopupComponent
	      			marker={popup}
	      			lat={popup.latitude}
	      			lng={popup.longitude}
	      		/>
	      	)}
	      </GoogleMapReact>
	  	</div>
		)
	}
}


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Map);
