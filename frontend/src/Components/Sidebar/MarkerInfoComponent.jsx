import React, { Component } from 'react';


class MarkerInfoComponent extends Component {
	render() {
		const { selected, onMarkerScoreChange } = this.props
		if (!selected) {
			return (<div><p className='font-size'>Pick a marker!</p></div>)
		} else {
			const date = new Date(selected.timestamp).toDateString();
			return (
				<div>
					<p>Category: {selected.category}</p>
					<p>Timestamp: {date}</p>
					<p>Description: {selected.description}</p>
					<p>Reported by Eric</p>
					<p>Score: {selected.score}</p>
					<p>Is this still here?</p>
					<input type='button' value='yes' onClick={onMarkerScoreChange} />
					<input type='button' value='no' onClick={onMarkerScoreChange} />
				</div>
			)
		}
	}
}

export default MarkerInfoComponent;