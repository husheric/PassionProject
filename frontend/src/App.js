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

		// this.test();
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
			markerFilters: {
				all: true,
				construction: false,
				weather: false,
				crime: false,
				other: false,
				user: true
			},
			mapFilter: 'Map'
		};
	}

	// gets markers + points for the markers
	getMarkers = () => {
		axios.get(`/getMarkers`)
			.then(res => {
				const markers = res.data.data;
				markers.forEach(marker => {
					marker.score = 1
					axios.get(`/getMarkerScorePlus/${marker.id}`)
						.then(res => {
							// const plusScore = Number(res.data.data[0].count);
							const plusScore = res.data.data
							marker.score += plusScore.length

							axios.get(`/getMarkerScoreMinus/${marker.id}`)
								.then(res => {
									const minusScore = res.data.data
									marker.score -= minusScore.length
								})
								.catch( err => {
									console.log(err)
								})

						})
						.catch( err => {
							console.log(err)
						})
				})

				this.setState({
					markers: [...this.state.markers, ...markers]
				})
			})
			.catch(err => {
				console.log(err)
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
		const { center, markers, newReport } = this.state;

		if (!newReport) {
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
		const selectedCopy = this.state.markers[marker.index];

		if (marker.index) {
			selectedCopy.index = marker.index
		}

		if (sidebarIsOpen) {
			this.setState({
				selected: selectedCopy,
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
				longitude: newReport.longitude,
				score: 1
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
		const { id, email, full_name, username } = user;
		this.setState({
			user: {
				id,
				email,
				full_name,
				username
			}
		})
	}

	onImageClick = e => {
		const { sidebarPage, sidebarIsOpen } = this.state;

		if (e.target.name === sidebarPage || !e.target.name) {
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

	onMarkerFilterChange = e => {
		const { markerFilters } = this.state
		const filtersCopy = {...markerFilters}

		switch (e.target.value) {
			case 'all':
				filtersCopy.all = !filtersCopy.all
				break;
			case 'none':
				filtersCopy.all = false
				filtersCopy.construction = false
				filtersCopy.weather = false
				filtersCopy.crime = false
				filtersCopy.other = false
				break;
			default:
				// filtersCopy[e.target.value] = e.target.checked
				filtersCopy.all = false
				filtersCopy[e.target.value] = !markerFilters[e.target.value]
		}
		this.setState({
			markerFilters: filtersCopy
		})
	}

	onInsertMarkerScore = e => {
		const { user, marker } = this.state
		/*
			add score locally after inserting
			determine timer = score + timestamp of latest score
			highlights button pressed by person to prevent multiple submissions
		*/

		axios.post(`/insertMarkerScore`, {
			user_id: this.state.user.id,
			marker_id: this.state.marker,
			score: Number(e.target.name)
		})
			.then(res => {
				this.setState({
					markers: [...this.state.markers, ...res.data.data]
				})
			})
	}

	onMarkerScoreChange = (e) => {
		e.preventDefault();
		const { markers, selected } = this.state
		const selectedCopy = {...selected};
		const markersCopy = markers;

		if (e.target.value === 'yes') {
			selectedCopy.score = selectedCopy.score + 1
		} else {
			selectedCopy.score = selectedCopy.score - 1
			if (selectedCopy.score < 0) {
				markersCopy.splice(selectedCopy.index, 1)
				this.setState({
					selected: null,
					markers: markersCopy
				})
				return;
			}
		}
		markersCopy[selectedCopy.index] = selectedCopy;

		this.setState({
			markers: markersCopy,
			selected: selectedCopy
		})
	}

	onMapFilterChange = e => {
		this.setState({
			mapFilter: e.target.value
		})
	}

  render() {
  	const { center, zoom, draggable, newReport, selected, markers, user, sidebarIsOpen, sidebarPage, markerFilters, mapFilter } = this.state;
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
					markerFilters={markerFilters}
					onMapFilterChange={this.onMapFilterChange}
					onMarkerScoreChange={this.onMarkerScoreChange}
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
					markerFilters={markerFilters}
					mapFilter={mapFilter}
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