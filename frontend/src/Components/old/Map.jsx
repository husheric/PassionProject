import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import axios from "axios";
import NewMarker from './NewMarker';
import MapboxLayer from './MapboxLayer';

// import userLocationIcon from '../icons/005-userLocation.svg';
// import weatherIcon from '../icons/001-weather.svg';
// import crimeIcon from '../icons/002-crime.svg'
// import otherIcon from '../icons/003-other.svg'
// import constructionIcon from '../icons/004-construction.svg';

const iconMap = {
	weather: 'volcano-15',
	crime: 'fire-station-15',
	construction: 'campsite-15',
	other: 'hospital-15',
	new: 'circle-15',
	user: 'marker-15'
};

const Mapbox = ReactMapboxGl({
	accessToken: 'pk.eyJ1IjoiZXJpY2xpdTkzIiwiYSI6ImNqZzlwbm85NzFkN2gyd3Fqa29nZXY4OXgifQ.8wpCYrAv7RUqSySFY4k5xQ'
});

class Map extends Component {
	constructor() {
		super();

		// let image = new Image(20, 20);
		// image.src = crimeIcon;
		// this.crimeImages = ['crime', image];

		// image = new Image(20, 20);
		// image.src = weatherIcon;
		// this.weatherImages = ['weather', image]

		// image = new Image(20, 20);
		// image.src = constructionIcon;
		// this.constructionImages = ['construction', image]

		// image = new Image(20, 20);
		// image.src = otherIcon;
		// this.otherImages = ['other', image];

		this.getMarkers();

		this.state = {
			receivedUserCoord: false,
			userCoord: {},
			center: {
				latitude: 40.7429446,
				longitude: -73.941878
			},
			zoom: [11],
			popup: { isVisible: false, marker: {} },
			newMarker: { isVisible: false, marker: {} },
			markers: []
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

	getCurrentLocation = () => {
		if (!this.state.receivedUserCoord && this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
			this.setState({
				receivedUserCoord: true,
				userCoord: {
					latitude: this.props.coords.latitude,
					longitude: this.props.coords.longitude
				},
				center: {
					latitude: this.props.coords.latitude,
					longitude: this.props.coords.longitude
				},
				zoom: [14],
				markers: [{
					category:'user',
					id: 'user',
					latitude: this.props.coords.latitude,
					longitude: this.props.coords.longitude,
					description: 'Your current location.'
				}, ...this.state.markers]
			});
		}
	}

	handleMarkerClick = e => {
		const { markers, popup } = this.state;
		const marker = markers[e.feature.properties.id]
		console.log(e.feature.properties.id)
		console.log(marker)
		
		if (this.state.markers[e.feature.properties.id].category !== 'new') {
			console.log(marker.id, popup.marker.id)
			this.setState({
				popup: {
					isVisible: marker.id === popup.marker.id ? false : true,
					marker: this.state.markers[e.feature.properties.id]
				}
			})
		}
	}

	handleNewMarker = () => {
		const markersCopy = [...this.state.markers, {
			category: 'new',
			latitude: this.state.userCoord.latitude || 40.8219597,
			longitude: this.state.userCoord.longitude || -73.941878,
		}]
		
		this.setState({
			newMarker: { marker: markersCopy[markersCopy.length-1], isVisible: true },
			markers: markersCopy,
		})
		// {title: 'title six', type: '', latitude: 40.8219597, longitude: -73.941878}
	}

	handleDragEnd = e => {
		const markersCopy = [...this.state.markers];



		markersCopy[markersCopy.length-1] = {
			...markersCopy[markersCopy.length-1],
			latitude: e.lngLat.lat,
			longitude: e.lngLat.lng
		}
		this.setState({
			markers: markersCopy,
			newMarker: {
				isVisible: true,
				marker: markersCopy[markersCopy.length-1]
			}
		})
	}

	handleDrag = e => {
		this.setState({
			newMarker: { ...this.state.newMarker, isVisible: false }
		})
	}

	mapOnMoveEnd = e => {
		this.setState({
			center: {
				latitude: e.transform._center.lat,
				longitude: e.transform._center.lng
			}
		})
	}

	// handleOnDrag = e => {
	// 	console.log(e);
	// 	const markersCopy = this.state.markers;
	// 	markersCopy[markersCopy.length-1] = {
	// 		...markersCopy[markersCopy.length-1],
	// 		latitude: e.lngLat.lat,
	// 		longitude: e.lngLat.lng
	// 	}
	// }

	render() {
		const { center, zoom, markers, newMarker, popup } = this.state;

		this.getCurrentLocation();
		return (
			<div>
				<button onClick={this.handleNewMarker} disabled={newMarker.isVisible}>New Marker</button>
				<Mapbox
					style="mapbox://styles/mapbox/light-v9"
				  containerStyle={{
				    height: "90vh",
				    width: "90vw"
				  }}
				  // center is in long, lat format
				  center={[center.longitude, center.latitude]}
				  zoom={zoom}
				  onMoveEnd={this.mapOnMoveEnd}
			 	>
			 		<Layer
			 			type="symbol"
			 			id="marker"
			 			layout={{
			 				"icon-image": '{image}',
			 				"icon-allow-overlap": true
			 			}}
			 		>
			 			{markers.map((el, index) => (
			 				<Feature
			 					coordinates={[el.longitude, el.latitude]}
			 					properties={{ image: iconMap[el.category]}}
			 					onClick={this.handleMarkerClick}
			 					draggable={newMarker.marker && index === markers.length-1}
			 					onDrag={this.handleDragEnd}
			 				/>
			 			))}
			 		</Layer>
			    {popup.isVisible && (
			    	<Popup coordinates={[popup.marker.longitude, popup.marker.latitude]}>
			   			<div>{popup.marker.category + ': ' + popup.marker.description || 'Error displaying title'}</div>
			    	</Popup>
			    )}
			    {newMarker.isVisible && (
			    	<Popup coordinates={[markers[markers.length-1].longitude, markers[markers.length-1].latitude]}>
			   			<NewMarker />
			    	</Popup>
			    )}
				</Mapbox>
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

/*

				*/