import React, { Component } from 'react';
import closeIcon from '../icons/close-black.svg'

class PopupComponent extends Component {
	render() {
		const { marker, onFormChange, type, onFormSubmit, onClosePopup } = this.props
		if (type === 'new') {
			return (
				<div className='popup'>
					<form onSubmit={onFormSubmit} >
						<select onChange={onFormChange} name='category' value={marker.category} >
							<option>Pick a Category</option>
							<option value='Construction'>Construction</option>
							<option value='Crime'>Crime</option>
							<option value='Weather'>Weather</option>
							<option value='Repair'>Repair</option>
							<option value='Other'>Other</option>
						</select>
						<input placeholder='description' name='description' onChange={onFormChange} value={marker.description} />
						<input type='submit' />
					</form>
				</div>
			)
		}
		else {
			return (
				<div className='popup popup-marker'>
					<img src={closeIcon} className='popup-close' onClick={onClosePopup} />
					<div className='popup-category'>
						<p>{marker.category}</p>
					</div>
					<div className='popup-description'>
						<p>{marker.description}</p>
					</div>
					<div className='popup-score'>
						<p>Score: {marker.score || 0}</p>
					</div>
				</div>
			)
		}
	}
}

export default PopupComponent;