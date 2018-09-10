import React, { Component } from 'react';


class MarkerInfoComponent extends Component {
	render() {
		const { selected, onMarkerScoreChange } = this.props
		if (!selected) {
			return (<div><p className='font-size'>Pick a marker!</p></div>)
		} else {
			return (
				<div>
					<p>{selected.category}</p>
					<p>Timestamp: {selected.timestamp}</p>
					<p>{selected.description}</p>
					<p>Reported by Eric</p>
					<p>Score: {selected.score}</p>
					<p>Is this still here?</p>
					<input type='button' value='yes' onClick={(e) => onMarkerScoreChange(e)} />
					<input type='button' value='no' onClick={(e) => onMarkerScoreChange(e)} />
				</div>
			)
		}
	}
}

export default MarkerInfoComponent;