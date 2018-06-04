import React, { Component } from 'react';
import axios from 'axios'

class Register extends Component {
	constructor() {
		super();

		this.state = {
			full_name: '',
			email: '',
			password: '',
		}
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = e => {
		const { full_name, email, password } = this.state;
		e.preventDefault()
		axios.post(`/createUser`, {
				full_name,
				email: email.toLowerCase(),
				password
			})
			.then(res => {
				axios.post(`/login`, {
						email,
						password
					})
					.then(res => {
						this.props.onLogin(res.data.user)
						// set the state in app of user res.user = { id, email, full name, image link}
					})
					.catch(err => {
						console.log(err)
					})
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { full_name, email, password } = this.state;
		const { onClickLoginRegister } = this.props;
		return(
			<div>
				<h1>REGISTER PAGE</h1>
				<form onSubmit={this.onSubmit}>
					<input placeholder='Full Name' value={full_name} name='full_name' onChange={this.onChange} />
					<input type='email' placeholder='email' value={email} name='email' onChange={this.onChange} />
					<input type='password' placeholder='password' value={password} name='password' onChange={this.onChange} />
					<input type='submit' value='register' />
				</form>
				<h3>or</h3><input type='button' value='Login' onClick={onClickLoginRegister}/>
			</div>
		)
	}
}

	export default Register;