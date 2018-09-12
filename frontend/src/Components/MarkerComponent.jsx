import React, { Component } from 'react';
// import { icon_dict } from '../constants'
import userLocationIcon from '../icons/005-userLocation.svg';
import weatherIcon from '../icons/001-weather.svg';
import crimeIcon from '../icons/002-crime.svg'
import otherIcon from '../icons/003-other.svg'
import constructionIcon from '../icons/004-construction.svg';
import reportIcon from '../icons/report-icon.svg';
import repairIcon from '../icons/repair-icon.svg';

const icon_dict = {
	user: userLocationIcon,
	Weather: weatherIcon,
	Construction: constructionIcon,
	Crime: crimeIcon,
	Other: otherIcon,
	Repair: repairIcon,
	new: reportIcon
}

class MarkerComponent extends Component {
	render() {
		const { category, zoom } = this.props;
		const className = zoom < 14 ? 'marker-small' : 'marker-big';
		return (
			<div>
				<img className={className} src={icon_dict[category] || icon_dict.new} alt={category} />
			</div>
		)
	}
}

export default MarkerComponent;