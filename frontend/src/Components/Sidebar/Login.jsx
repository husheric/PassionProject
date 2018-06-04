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
			<div>
				<h1>LOGIN PAGE</h1>
				<form onSubmit={this.onSubmit}>
					<input type='email' placeholder='email' value={email} name='email' onChange={this.onChange} />
					<input type='password' placeholder='password' value={password} name='password' onChange={this.onChange} />
					<input type='submit' value='login' />
				</form>
				<h3>or</h3><input type='button' value='Register' onClick={onClickLoginRegister}/>
			</div>
		)
	}
}

export default Login;