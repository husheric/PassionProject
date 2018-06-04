import React, { Component } from 'react';
import circleIcon from '../icons/circle-stroked-11.svg';

class ReportComponent extends Component {
	render() {
		return (
			<div style={{ backgroundColor: 'red', width: '75px' }} onClick={this.props.onClick} >
				<img src={circleIcon} width='18px' height='18px' />
				<h1 style={{ display: 'inline-block' }} >REPORT</h1>
			</div>
		)
	}
}

export default ReportComponent;