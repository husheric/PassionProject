import React, { Component } from 'react';
import reportIcon from '../icons/report-icon.svg';

class ReportComponent extends Component {
	render() {
		return (
			<div style={{ backgroundColor: 'white', width: '75px', border: '1px solid black' }} onClick={this.props.onClick} >
				<img src={reportIcon} width='18px' height='18px' />
				<h1 style={{ display: 'inline-block' }} >REPORT</h1>
			</div>
		)
	}
}

export default ReportComponent;