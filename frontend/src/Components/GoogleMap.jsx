import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import axios from "axios";
import { map_options, google_map_api_key } from '../constants';
import GoogleMap from 'google-map-react';
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
	constructor(props) {
		super(props);

		this.test();

		this.state = {
			// heatData: [props.center, { lat: 40.721, lng: -73.931 }, { lat: 40.722, lng: -73.93211111111111 }]
		}
	}

	test = () => {
		axios.get('https://data.cityofnewyork.us/resource/5jvd-shfj.json?$limit=50000') //$limit=50000
			.then(res => {
				const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1))

				// const heatData = res.data.filter(el => (el.latitude && new Date(el.cmplnt_fr_dt) < lastYear))

				const heatData = [];

				for (let i = 0; i < 10000; i++) {
					const copy = res.data[i]
					if (copy.latitude && copy.longitude) {
						const latitude = copy.latitude.slice(0,-4)
						const longitude = copy.longitude.slice(0,-4)
						copy.lng = longitude
						copy.lat = latitude
						// copy.longitude = longitude
						// copy.latitude = latitude
						// console.log(longitude, latitude)
						heatData.push(copy);

					}
				}

				this.setState({
					heatData
				})
			})
	}

	filterMarkers = () => {
		const { markerFilters, markers } = this.props

		return markers.filter(marker => {
			if (markerFilters)
			return markerFilters[marker.category.toLowerCase()] || marker.category === '';
		})
		// return filteredMarkers
	}

	render() {
		const { center, zoom, draggable, newReport, selected, markers, onNewReport, onMapChange, onMarkerDrag, onChildMouseDown, onChildMouseUp, onChildClick, onFormChange, onFormSubmit, sidebarIsOpen, markerFilters, mapFilter, onClosePopup } = this.props;

		switch (mapFilter) {
			case 'Map':
				return (
					<div style={{ width: '100vw', height: '100vh' }}>
			      <GoogleMap
		          bootstrapURLKeys={{ key: google_map_api_key }}
		          center={center}
		          options={{ styles: map_options }}
		          zoom={zoom}
		          draggable={draggable}
		          onChange={onMapChange}
		          onChildClick={onChildClick}
		    			onChildMouseDown={onChildMouseDown}
		    			onChildMouseUp={onChildMouseUp}
		    			onChildMouseMove={onMarkerDrag}

			      >
			      	<ReportComponent
			      		onClick={onNewReport}
			      	/>
			      	{this.filterMarkers().map((marker, i) => (
			      		<MarkerComponent
			      			marker={marker}
			      			category={marker.category}
			      			lat={marker.latitude}
			      			lng={marker.longitude}
			      			index={i}
			      			key={marker.id}
			      		/>
			      	))}
			      	{selected && !sidebarIsOpen && (
			      		<PopupComponent
			      			type='marker'
			      			marker={selected}
			      			onChildClick={onChildClick}
			      			lat={selected.latitude}
			      			lng={selected.longitude}
			      			onClosePopup={onClosePopup}
			      		/>
			      	)}
			      	{newReport && (
			      		<PopupComponent
			      			type='new'
			      			marker={newReport}
			      			onFormChange={onFormChange}
			      			onFormSubmit={onFormSubmit}
			      			lat={newReport.latitude}
			      			lng={newReport.longitude}
			      		/>
			      	)}
			      </GoogleMap>
			  	</div>
				)
			case 'Heat Map':
				if (this.state.heatData) {
					return (
						<div style={{ width: '100vw', height: '100vh' }}>
							<GoogleMap
				      	bootstrapURLKeys={{ libraries: 'visualization', key: google_map_api_key }}
				      	src={`https://maps.googleapis.com/maps/api/js?key=${google_map_api_key}&libraries=visualization`}
			          options={{ styles: map_options }}
				        center={center}
				        zoom={11}
				        yesIWantToUseGoogleMapApiInternals
				        onGoogleApiLoaded={({map, maps}) => {
				      		const heatmap = new maps.visualization.HeatmapLayer({
				            data: this.state.heatData.map(point => ({
				            	location: new maps.LatLng(point.lat, point.lng)
				            	// location: new maps.LatLng(point[0], point[1])
				            	// location: new maps.LatLng(point.latitude, point.longitude)
				              // weight: point.law_cat_cd === "MISDEMEANOR" ? 1 : 2
				            }))
				          });
				          heatmap.HeatmapLayerOptions = {
				          	dissipating:true,
				          	maxIntensity:10
				          }
				          heatmap.setMap(map);
				        }}
				      >
							</GoogleMap>
				  	</div>
					)
				}
				else {
					return (<div>Loading</div>)
				}
		}
	}
}

export default Map;