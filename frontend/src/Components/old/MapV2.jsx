import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY2xpdTkzIiwiYSI6ImNqZzlwbm85NzFkN2gyd3Fqa29nZXY4OXgifQ.8wpCYrAv7RUqSySFY4k5xQ';

const geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-73.941878, 40.7429446]
    },
    properties: {
      title: 'Mapbox',
      description: 'C4Q i think'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-73.911878, 40.7529446]
    },
    properties: {
      title: 'Mapbox',
      description: 'some place close to c4q i think'
    }
  }]
};


class Map extends Component {
	constructor() {
		super();

		this.state = {
			lat: 40.7429446,
			lng: -73.941878,
			zoom: 11
		}
	}

	componentDidMount() {
		const { lng, lat, zoom } = this.state;

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/light-v9',
			center: [lng, lat],
			zoom
		});

		map.on('move', () => {
			const { lng, lat} = map.getCenter();
			console.log( lng, lat, map.getZoom());

			this.setState({
				lng: lng.toFixed(4),
				lat: lat.toFixed(4),
				zoom: map.getZoom().toFixed(2)
			})
		})
	}

	render() {
		const { lng, lat, zoom } = this.state;

		return (
			<div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" width={1000} height={1000} />
      </div>
		)
	}
}

export default Map;