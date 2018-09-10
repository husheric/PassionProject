import React, { Component } from 'react';

import Register from './Register';
import Login from './Login';
import FiltersComponent from './FiltersComponent';
import MarkerInfoComponent from './MarkerInfoComponent';

class ExtendedSidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: 'Register'
		};
	}

	onClickLoginRegister = e => {
		this.setState({
			type: e.target.value
		});
	}

	render() {
		const { type } = this.state;
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
					<FiltersComponent 
						onMarkerFilterChange={onMarkerFilterChange}
						markerFilters={markerFilters}
						onMapFilterChange={onMapFilterChange}
					/>
				)
			case 'markerInfo':
				return (
					<MarkerInfoComponent
						selected={selected}
						onMarkerScoreChange={onMarkerScoreChange}
					/>
				)
		}
	}
}

export default ExtendedSidebar;