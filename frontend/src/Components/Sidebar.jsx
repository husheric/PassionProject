import React, { Component } from 'react'
import axios from 'axios'

import ExtendedSidebarComponent from './Sidebar/ExtendedSidebarComponent'
import '../styles/Sidebar.css';

import markerIcon from '../icons/001-map.svg'
import filterIcon from '../icons/002-filter.svg'
import profileIcon from '../icons/003-user.svg'
import closeIcon from '../icons/close.svg'

class Sidebar extends Component {
	render() {
		const { onLogin, user, sidebarIsOpen, sidebarPage, onImageClick, selected, onMarkerFilterChange, markerFilters, onMapFilterChange, onMarkerScoreChange } = this.props;
	
		return (
			<div>
				<div className='sidebar' >
					<img src={profileIcon} className='sidebar-icon' name='profile' onClick={onImageClick} />
					<img src={filterIcon} className='sidebar-icon' name='filter' onClick={onImageClick} />
					<img src={markerIcon} className='sidebar-icon' name='markerInfo' onClick={onImageClick} />
				</div>
				{sidebarIsOpen && (
					<div className='extended-sidebar'>
						<img src={closeIcon} className='extended-sidebar-close sidebar-icon' onClick={onImageClick} />
						<ExtendedSidebarComponent 
							onLogin={onLogin}
							user={user}
							sidebarPage={sidebarPage}
							selected={selected}
							onMarkerFilterChange={onMarkerFilterChange}
							markerFilters={markerFilters}
							onMapFilterChange={onMapFilterChange}
							onMarkerScoreChange={onMarkerScoreChange}
						/>
					</div>
				)}
			</div>
		)
	}
}

export default Sidebar;