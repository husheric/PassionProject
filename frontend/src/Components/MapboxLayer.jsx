import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

const iconArr = ['circle-11', 'beer-11', 'airfield-15', 'karaoke-11'];

class MapboxLayer extends Component {
	render() {
		const { markers, handleMarkerClick } = this.props;
		console.log(markers)
		// this.props.markers = {crime: [], ..etc}
		return (
			<Layer
	 			type="symbol"
	 			id="marker"
	 			layout={{ "icon-image": "danger-15"}}
	 		>
	 			{markers.construction.map(el => (
	 				<Feature
	 					coordinates={[el.longitude, el.latitude]}
	 					onClick={() => this.handleMarkerClick(el)}
	 				/>
	 			))}
	 		</Layer>
		)
	}	
}

export default MapboxLayer;