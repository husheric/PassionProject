import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
		}
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value.toLowerCase()
		})
	}

	onSubmit = e => {
		e.preventDefault()

		const { email, password } = this.state;
		axios.post(`/login`, {
				email: email.toLowerCase(),
				password
			})
			.then(res => {
				// console.log(res)
				this.props.onLogin(res.data.user)
				// set the state in app of user res.user = { id, email, full name, image link}
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { full_name, email, password } = this.state;
		const { onClickLoginRegister } = this.props;
		return(
			<div className='login'>
				<h1>LOGIN PAGE</h1>
				<form onSubmit={this.onSubmit}>
					<div><input type='email' placeholder='email' value={email} name='email' onChange={this.onChange} /></div>
					<div><input type='password' placeholder='password' value={password} name='password' onChange={this.onChange} /></div>
					<div><input type='submit' value='Submit' /></div>
				</form>
				<h3>or</h3><div><input type='button' value='Register' onClick={onClickLoginRegister}/></div>
			</div>
		)
	}
}

export default Login;