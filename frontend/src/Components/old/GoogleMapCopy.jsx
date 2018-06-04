import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import axios from "axios";
import { map_options, google_map_api_key } from '../constants';
import GoogleMapReact from 'google-map-react';
import '../styles/GoogleMap.css'

import MarkerComponent from './MarkerComponent';
import PopupComponent from './PopupComponent';
import ReportComponent from './ReportComponent'

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

class Map extends Component {
	constructor() {
		super();

		this.getMarkers();

		this.state = {
			shouldMapCenterOnUserCoord: true,
			markers: [
				{ category: 'user', latitude: null, longitude: null, id: 'user', description: 'Your current location.' }
			],
			newReport: null,
			draggable: true,
			center: { lat: 40.73, lng: -73.93 },
			zoom: 12,
			popup: null
		}
	}

	getMarkers = () => {
		axios.get(`/getMarkers`)
			.then(res => {
				this.setState({
					markers: [...this.state.markers, ...res.data.data]
				})
			})
	}

	handleOnClickNewReport = e => {
		const { center, markers } = this.state;
		const newReport = {
			id: 'new',
			reported_by: 1,
			category: '',
			description: '',
			latitude: center.lat,
			longitude: center.lng
		}
		this.setState({
			newReport,
			markers: [newReport, ...markers],
			shouldMapCenterOnUserCoord: false,
			popup: false
		})
	}

	handleOnChange = e => {
		this.setState({
			center: e.center,
			zoom: e.zoom
		})
	}

	handleOnMarkerDrag = (key, marker, mouse) => {
		if (marker.marker.id === 'new') {
			const newReportCopy = { ...this.state.newReport }
			newReportCopy.latitude = mouse.lat
			newReportCopy.longitude = mouse.lng
			const markersCopy = [...this.state.markers]
			markersCopy[0].latitude = mouse.lat
			markersCopy[0].longitude = mouse.lng
			this.setState({
				newReport: newReportCopy,
				markers: markersCopy,
				popup: false
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

	handleFormOnChange = e => {
		const newReportCopy = {
			...this.state.newReport,
			[e.target.name]: e.target.value
		}
		this.setState({
			newReport: newReportCopy
		})
	}

	handleFormOnSubmit = e => {
		e.preventDefault();
		console.dir(e.target)
		const { newReport } = this.state;
		axios.post(`/insertNewMarker`, {
			reported_by: 1, 
			category: newReport.category, 
			description: newReport.description, 
			latitude: newReport.latitude, 
			longitude: newReport.longitude
		})
		.then(res => {
			const markersCopy = this.state.markers
			markersCopy[0] = res.data.data
			this.setState({
				markers: markersCopy,
				newReport: null,
				popup: markersCopy[0]
			})
		})
		.catch(err => {
			console.log('sikee', err)
		})
	}

	getUserLocation = () => {
		const { coords } = this.props 
		const { shouldMapCenterOnUserCoord, markers } = this.state
		if (shouldMapCenterOnUserCoord && coords) {
			const markersCopy = [...markers];
			markersCopy[0].longitude = coords.longitude;
			markersCopy[0].latitude = coords.latitude;
			this.setState({
				shouldMapCenterOnUserCoord: false,
				markers: markersCopy,
				zoom: 14,
				center: { lat: coords.latitude, lng: coords.longitude }
			})
		}
	}

	handleOnChildClick = (key, marker) => {
		console.log(marker.marker)
		const { popup, markers } = this.state;
		if (popup) {
			console.log(popup)
			if (popup.id === marker.marker.id) {
				this.setState({
					popup: false
				})
			}
			else {
				this.setState({
					popup: this.state.markers[marker.index]
				})
			}
		}
		else {
			this.setState({
				popup: this.state.markers[marker.index]
			})
		}
	}

	render() {
		const { markers, newReport, center, zoom, draggable, popup } = this.state;
		this.getUserLocation();
		// console.log(this.state.markers)
		return (
			<div style={{ width: '100vw', height: '100vh' }}>
	      <GoogleMapReact
          bootstrapURLKeys={{ key: google_map_api_key }}
          center={center}
          options={{ styles: map_options }}
          zoom={zoom}
          draggable={draggable}
          onChange={this.handleOnChange}
          onChildClick={this.handleOnChildClick} // (a,b) = (key??, marker)
    			onChildMouseDown={this.handleOnChildMouseDown}
    			onChildMouseUp={this.handleOnChildMouseUp}
    			onChildMouseMove={this.handleOnMarkerDrag}
	      >
	      	<ReportComponent
	      		onClick={this.handleOnClickNewReport}
	      	/>
	      	{markers.map((marker, i) => (
	      		<MarkerComponent
	      			marker={marker}
	      			category={marker.category}
	      			lat={marker.latitude}
	      			lng={marker.longitude}
	      			index={i}
	      			key={marker.id}
	      		/>
	      	))}
	      	{popup && (
	      		<PopupComponent
	      			type='marker'
	      			marker={popup}
	      			lat={popup.latitude}
	      			lng={popup.longitude}
	      		/>
	      	)}
	      	{newReport && (
	      		<PopupComponent
	      			type='new'
	      			marker={newReport}
	      			handleFormOnChange={this.handleFormOnChange}
	      			handleFormOnSubmit={this.handleFormOnSubmit}
	      			lat={newReport.latitude}
	      			lng={newReport.longitude}
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