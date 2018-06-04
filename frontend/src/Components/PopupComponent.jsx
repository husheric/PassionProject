import React, { Component } from 'react';

class PopupComponent extends Component {
	render() {
		const { marker, onFormChange, type, onFormSubmit } = this.props
		if (type === 'new') {
			return (
				<div className='popup popup_new'>
					<form onSubmit={onFormSubmit} >
						<select onChange={onFormChange} name='category' value={marker.category} >
							<option>Pick a Category</option>
							<option value='construction'>Construction</option>
							<option value='crime'>Crime</option>
							<option value='weather'>Weather</option>
							<option value='other'>Other</option>
						</select>
						<input placeholder='description' name='description' onChange={onFormChange} value={marker.description} />
						<input type='submit' />
					</form>
				</div>
			)
		}
		else {
			return (
				<div className='popup popup_marker'>
					<div className='popup_category'>
						<h3>{marker.category}</h3>
					</div>
					<div className='popup_description'>
						<h1>{marker.description}</h1>
					</div>
					<div className='popup_validate'>
						<input type='button' value='yes' />
						<input type='button' value='no' />
					</div>
				</div>
			)
		}
	}
}

export default PopupComponent;