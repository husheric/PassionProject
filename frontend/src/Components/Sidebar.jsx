import React, { Component } from 'react'
import axios from 'axios'

import ExtendedComponent from './Sidebar/ExtendedComponent'
import '../styles/Sidebar.css';

import markerIcon from '../icons/001-map.svg'
import filterIcon from '../icons/002-filter.svg'
import profileIcon from '../icons/003-user.svg'

class Sidebar extends Component {
	constructor() {
		super();

		this.state = {
			// sidebarIsOpen: false,
			// sidebarPage: 'profile'
		}
	}

	render() {
		const { onLogin, user, sidebarIsOpen, sidebarPage, onImageClick, selected, onMarkerFilterChange, filters } = this.props;
	
		return (
			<div>
				<div className='sidebar' >
					<img src={profileIcon} height='50px' width='50px' name='profile' onClick={onImageClick} />
					<img src={filterIcon} height='50px' width='50px' name='filter' onClick={onImageClick} />
					<img src={markerIcon} height='50px' width='50px' name='markerInfo' onClick={onImageClick} />
				</div>
				{sidebarIsOpen && (
					<div className='extended-sidebar'>
						<ExtendedComponent 
							onLogin={onLogin}
							user={user}
							sidebarPage={sidebarPage}
							selected={selected}
							onMarkerFilterChange={onMarkerFilterChange}
							filters={filters}
						/>
					</div>
				)}
			</div>
		)
	}
}

export default Sidebar;