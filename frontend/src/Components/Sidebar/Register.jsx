import React, { Component } from 'react';
import axios from 'axios'

class Register extends Component {
	constructor() {
		super();

		this.state = {
			full_name: '',
			email: '',
			password: '',
			username: ''
		}
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = e => {
		e.preventDefault();

		const { full_name, email, password, username } = this.state;
		const { onLogin } = this.props

		axios.post(`/createUser`, { full_name, email, password, username })
			.then(res => {
				onLogin(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { full_name, email, password, username } = this.state;
		const { onClickLoginRegister } = this.props;
		return(
			<div className='register'>
				<h1>REGISTER PAGE</h1>
				<form onSubmit={this.onSubmit}>
					<div><input placeholder='Username' value={username} name='username' onChange={this.onChange} /></div>
					<div><input placeholder='Full Name' value={full_name} name='full_name' onChange={this.onChange} /></div>
					<div><input type='email' placeholder='Email' value={email} name='email' onChange={this.onChange} /></div>
					<div><input type='password' placeholder='Password' value={password} name='password' onChange={this.onChange} /></div>
					<div><input type='submit' value='Submit' /></div>
				</form>
				<h3>or</h3><div><input type='button' value='Login' onClick={onClickLoginRegister}/></div>
			</div>
		)
	}
}

	export default Register;