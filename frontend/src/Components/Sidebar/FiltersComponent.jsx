import React, { Component } from 'react';

class FiltersComponent extends Component {
	render() {
		const { onMarkerFilterChange, markerFilters, onMapFilterChange } = this.props;
		return (
			<div>
				<div className='filter'>
				  <p className='font-size'>Pick a filter</p>
					<div><input type='checkbox' value='construction' onChange={onMarkerFilterChange} checked={markerFilters.construction} /> Construction</div>
					<div><input type='checkbox' value='crime' onChange={onMarkerFilterChange} checked={markerFilters.crime} /> Crime</div>
					<div><input type='checkbox' value='weather' onChange={onMarkerFilterChange} checked={markerFilters.weather} /> Weather</div>
					<div><input type='checkbox' value='repair' onChange={onMarkerFilterChange} checked={markerFilters.repair} /> Repair</div>
					<div><input type='checkbox' value='other' onChange={onMarkerFilterChange} checked={markerFilters.other} /> Other</div>
				</div>
			</div>
		)
	}
}

export default FiltersComponent;



// return (
// 	<div>
// 		<div style={{ marginBottom: '100px' }}>
// 		  <p className='font-size'>Pick a filter</p>
// 			<div><input type='checkbox' value='construction' onChange={onMarkerFilterChange} checked={markerFilters.construction} /> Construction</div>
// 			<div><input type='checkbox' value='crime' onChange={onMarkerFilterChange} checked={markerFilters.crime} /> Crime</div>
// 			<div><input type='checkbox' value='weather' onChange={onMarkerFilterChange} checked={markerFilters.weather} /> Weather</div>
// 			<div><input type='checkbox' value='other' onChange={onMarkerFilterChange} checked={markerFilters.other} /> Other</div>
// 		</div>
// 		<div>
// 			<p className='font-size'>Pick a map</p>
// 			<div><input type='button' value='Map' onClick={onMapFilterChange} name='mapfilter'/></div>
// 			<div><input type='button' value='Heat Map' onClick={onMapFilterChange} name='mapfilter' /></div>
// 		</div>
// 	</div>
// )