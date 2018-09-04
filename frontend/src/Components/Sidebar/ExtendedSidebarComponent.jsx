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
		const { onLogin, user, sidebarPage, selected, onMarkerFilterChange, markerFilters, onMapFilterChange, onMarkerScoreChange } = this.props;

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
						<div>
							<p>Name: {user.full_name}</p>
							<p>Email: {user.email}</p>
							<p>Score: 1023</p>
						</div>
					)
				}
				
			case 'filter':
				return (
					<div>
						<div style={{ marginBottom: '100px' }}>
						  <p className='font-size'>Pick a filter</p>
					  	<div><input type='checkbox' value='all' onChange={onMarkerFilterChange} checked={markerFilters.all} /> All</div>
					  	<div><input type='checkbox' value='none' onChange={onMarkerFilterChange} checked={false} /> none</div>
					  	<div><input type='checkbox' value='Construction' onChange={onMarkerFilterChange} checked={markerFilters.all || markerFilters.Construction} /> Construction</div>
					  	<div><input type='checkbox' value='Crime' onChange={onMarkerFilterChange} checked={markerFilters.all || markerFilters.Crime} /> Crime</div>
					  	<div><input type='checkbox' value='Weather' onChange={onMarkerFilterChange} checked={markerFilters.all || markerFilters.Weather} /> Weather</div>
					  	<div><input type='checkbox' value='Other' onChange={onMarkerFilterChange} checked={markerFilters.all || markerFilters.Other} /> Other</div>
						</div>
						<div>
							<p className='font-size'>Pick a map</p>
							<div><input type='button' value='Map' onClick={onMapFilterChange} name='mapfilter'/></div>
					  	<div><input type='button' value='Heat Map' onClick={onMapFilterChange} name='mapfilter' /></div>
						</div>
					</div>
				)
			case 'markerInfo':
				if (!selected) {
					return (<div><p className='font-size'>Pick a marker!</p></div>)
				}
				else {
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
}

export default ExtendedSidebar;