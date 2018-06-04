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

	filterMarkers = () => {
		const { filters, markers } = this.props
		if (filters.all) { return markers }

		return markers.filter(marker => {
			console.log(marker.category, filters[marker.category])
			return filters[marker.category]
		})
		// return filteredMarkers
	}

	render() {
		const { center, zoom, draggable, newReport, selected, markers, onNewReport, onChange, onMarkerDrag, onChildMouseDown, onChildMouseUp, onChildClick, onFormChange, onFormSubmit, sidebarIsOpen, filters } = this.props;
		console.log(markers)
		
		return (
			<div style={{ width: '90vw', height: '90vh' }}>
	      <GoogleMapReact
          bootstrapURLKeys={{ key: google_map_api_key }}
          center={center}
          options={{ styles: map_options }}
          zoom={zoom}
          draggable={draggable}
          onChange={onChange}
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
	      			lat={selected.latitude}
	      			lng={selected.longitude}
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
	      </GoogleMapReact>
	  	</div>
		)
	}
}


export default Map