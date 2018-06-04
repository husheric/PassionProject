import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import axios from "axios";
// import logo from './logo.svg';
import './styles/App.css';
import Map from './Components/GoogleMap';
import Sidebar from './Components/Sidebar'
// import Map from './Components/Map';
// import Map from './Components/MapV2'


class App extends Component {
	constructor() {
		super();

		this.getMarkers();

		this.state = {
			shouldMapCenterOnUserCoord: true,
			user: false,
			center: { lat: 40.73, lng: -73.93 },
			zoom: 12,
			draggable: true,
			newReport: null,
			selected: null,
			markers: [
				{ category: 'user', latitude: null, longitude: null, id: 'user', description: 'Your current location.' }
			],
			sidebarIsOpen: false,
			sidebarPage: 'profile',
			filters: {
				all: true,
				construction: false,
				weather: false,
				crime: false,
				other: false,
				user: true
			}
		};

	}

	getMarkers = () => {
		axios.get(`/getMarkers`)
			.then(res => {
				this.setState({
					markers: [...this.state.markers, ...res.data.data]
				})
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

	onNewReport = e => {
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
			selected: false
		})
	}

	onMapChange = e => {
		this.setState({
			center: e.center,
			zoom: e.zoom
		})
	}

	onMarkerDrag = (key, marker, mouse) => {
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
				selected: false
			})
		}
	}

	onChildMouseDown = () => {
		this.setState({
			draggable: false
		})
	}

	onChildMouseUp = () => {
		this.setState({
			draggable: true
		})
	}

	onChildClick = (key, marker) => {
		const { selected, markers, sidebarIsOpen } = this.state;
		if (sidebarIsOpen) {
			this.setState({
				selected: this.state.markers[marker.index],
				sidebarPage: 'markerInfo'
			})
		}
		/*
			if sidebar is open
				- every click = update sidebar info, no selected = false
			else
				- popup logic
		*/
		else if (selected) {
			if (selected.id === marker.marker.id) {
				this.setState({
					selected: false
				})
			}
			else {
				this.setState({
					selected: this.state.markers[marker.index]
				})
			}
		}
		else {
			this.setState({
				selected: this.state.markers[marker.index]
			})
		}
	}

	onFormChange = e => {
		console.log('on form change')
		const newReportCopy = {
			...this.state.newReport,
			[e.target.name]: e.target.value
		}
		this.setState({
			newReport: newReportCopy
		})
	}

	// on new marker submit
	onFormSubmit = e => {
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
					selected: markersCopy[0]
				})
			})
			.catch(err => {
				console.log('sikee', err)
			})
	}

	onLogin = user => {
		const { id, email, full_name } = user;
		console.log('logged user in')
		this.setState({
			user: {
				id,
				email,
				full_name
			}
		})
	}

	onImageClick = e => {
		const { sidebarPage, sidebarIsOpen } = this.state;

		if (e.target.name === sidebarPage) {
			this.setState({
				sidebarIsOpen: !sidebarIsOpen
			})
		}
		else {
			this.setState({
				sidebarPage: e.target.name,
				sidebarIsOpen: true
			})
		}
	}

	// filters: {
	// 			all: false,
	// 			construction: false,
	// 			weather: false,
	// 			crime: false,
	// 			other: false
	// 		}

	onMarkerFilterChange = e => {
		const { filters } = this.state
		const filtersCopy = {...filters}

		switch (e.target.value) {
			case 'all':
				filtersCopy.all = false
				filtersCopy.construction = true
				filtersCopy.weather = true
				filtersCopy.crime = true
				filtersCopy.other = true
				
				filtersCopy[e.target.value] = e.target.checked
				break;
			case 'none':
				filtersCopy.all = false
				filtersCopy.construction = false
				filtersCopy.weather = false
				filtersCopy.crime = false
				filtersCopy.other = false
				break;
			default:
				filtersCopy[e.target.value] = e.target.checked	
		}
		this.setState({
			filters: filtersCopy
		})
	}

  render() {
  	const { center, zoom, draggable, newReport, selected, markers, user, sidebarIsOpen, sidebarPage, filters } = this.state;
  	this.getUserLocation();

    return (
      <div className='container'>
      	<Sidebar
      		onLogin={this.onLogin}
      		user={user}
      		sidebarIsOpen={sidebarIsOpen}
					sidebarPage={sidebarPage}
					onImageClick={this.onImageClick}
					selected={selected}
					onMarkerFilterChange={this.onMarkerFilterChange}
					filters={filters}
    			//needs state newReport, selected, that's it, need to prevent popup if open
      	/>
        <Map 
        	center={center}
					zoom={zoom}
					draggable={draggable}
					newReport={newReport}
					selected={selected}
					markers={markers}
      		onNewReport={this.onNewReport}
					onMapChange={this.onMapChange}
					onMarkerDrag={this.onMarkerDrag}
					onChildMouseDown={this.onChildMouseDown}
					onChildMouseUp={this.onChildMouseUp}
					onChildClick={this.onChildClick}
					onFormChange={this.onFormChange}
					onFormSubmit={this.onFormSubmit}
					sidebarIsOpen={sidebarIsOpen}
					filters={filters}
        />
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);