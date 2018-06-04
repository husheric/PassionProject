import React, { Component } from 'react'

import Register from './Register'
import Login from './Login'


class ExtendedSidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: 'Register'
		}
	}

	onClickLoginRegister = e => {
		this.setState({
			type: e.target.value
		})
	}

	render() {
		const { type } = this.state
		const { onLogin, user, sidebarPage, selected, onMarkerFilterChange, filters } = this.props;

		switch (sidebarPage) {
			case 'profile':
				if (!user) {
					if (type === 'Register') {
						return (
							<Register
								onClickLoginRegister={this.onClickLoginRegister}
								onLogin={onLogin}
							/>
						)
					}
					else {
						return (
							<Login
								onClickLoginRegister={this.onClickLoginRegister}
								onLogin={onLogin}
							/>
						)
					}
				}
				else {
					return (
						<div>this is the profile page while logged in!</div>
					)
				}
				
			case 'filter':
				return (
					<div>
					  <p>Pick a filter</p>
				  	<div><input type='checkbox' value='all' onChange={onMarkerFilterChange} checked={filters.all} /> all</div>
				  	<div><input type='checkbox' value='none' onChange={onMarkerFilterChange} checked={false} /> none</div>
				  	<div><input type='checkbox' value='construction' onChange={onMarkerFilterChange} checked={filters.all || filters.construction} /> construction</div>
				  	<div><input type='checkbox' value='crime' onChange={onMarkerFilterChange} checked={filters.all || filters.crime} /> crime</div>
				  	<div><input type='checkbox' value='weather' onChange={onMarkerFilterChange} checked={filters.all || filters.weather} /> weather</div>
				  	<div><input type='checkbox' value='other' onChange={onMarkerFilterChange} checked={filters.all || filters.other} /> other</div>
					</div>


					// 	  <div>
					// 	    <input type="radio" id="contactChoice1"
					// 	     name="contact" value="email">
					// 	    <label for="contactChoice1">Email</label>

					// 	    <input type="radio" id="contactChoice2"
					// 	     name="contact" value="phone">
					// 	    <label for="contactChoice2">Phone</label>

					// 	    <input type="radio" id="contactChoice3"
					// 	     name="contact" value="mail">
					// 	    <label for="contactChoice3">Mail</label>
					// 	  </div>
					// 	  <div>
					// 	    <button type="submit">Submit</button>
					// 	  </div>
					// 	</form>		
					// </div>
				)
			case 'markerInfo':
				if (!selected) {
					return (<div>no marker selected</div>)
				}
				else {
					return (
						<div>
							<p>{selected.category}</p>
							<p>{selected.timestamp}</p>
							<p>{selected.description}</p>
							<p>reported by Eric</p>
							<input type='button' value='yes' />
							<input type='button' value='no' />
						</div>
					)
				}
		}
	}
}

export default ExtendedSidebar;