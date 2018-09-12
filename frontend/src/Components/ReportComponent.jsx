import React, { Component } from 'react';
import reportIcon from '../icons/report-icon.svg';

class ReportComponent extends Component {
	render() {
		return (
			<div className='report-component' onClick={this.props.onClick} >
				<img className='report-component-icon' src={reportIcon} />
				<h1>REPORT</h1>
			</div>
		)
	}
}

export default ReportComponent;