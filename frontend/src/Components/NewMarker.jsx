import React, { Component } from 'react';
import weatherIcon from '../icons/001-weather.svg';
import crimeIcon from '../icons/002-crime.svg'
import otherIcon from '../icons/003-other.svg'
import constructionIcon from '../icons/004-construction.svg';

class NewMarker extends Component {
	constructor() {
		super();

		this.state = {
			title: '',
			description: ''
		}
	}

	handleForm = e => {
		e.preventDefault();
		console.log(e.target);
	}

	render() {
		return(
			<div>
				<img src={weatherIcon} width={18} height={18}/>
				<img src={crimeIcon} width={18} height={18}/>
				<img src={otherIcon} width={18} height={18}/>
				<img src={constructionIcon} width={18} height={18}/>
				<form onSubmit={this.handleForm}>
					<input type='text' name='title' value={this.state.title} placeholder='title' />
					<input type='text' name='description' value={this.state.description} placeholder='description' />
					<select>
						<option></option>
						<option>Construction</option>
						<option>Crime</option>
						<option>Mother Nature</option>
						<option>Other</option>
					</select>
					<input type='submit' />
				</form>
			</div>
		)
	}
}

export default NewMarker;