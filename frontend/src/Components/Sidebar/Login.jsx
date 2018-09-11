import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
	constructor() {
		super();

		this.state = {
			user: '',
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

		const { user, password } = this.state;
		const { onLogin } = this.props;

		axios.post(`/login`, {
				username: user.toLowerCase(),
				password
			})
			.then(res => {
				onLogin(res.data.user)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { user, password } = this.state;
		const { onClickLoginRegister } = this.props;
		return(
			<div className='login'>
				<h1>LOGIN</h1>
				<form onSubmit={this.onSubmit}>
					<div><input type='text' placeholder='Username or Email' value={user} name='user' onChange={this.onChange} /></div>
					<div><input type='password' placeholder='password' value={password} name='password' onChange={this.onChange} /></div>
					<div className='submit-btn'><input type='submit' value='Login' /></div>
				</form>
				<h3>or</h3><div><input type='button' value='Register' onClick={onClickLoginRegister}/></div>
			</div>
		)
	}
}

export default Login;