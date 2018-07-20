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


		/*
		
		handleRegisterFormSubmit = e => {
    e.preventDefault();

    const { username, password, full_name, email } = this.state;
    axios
      .post("/users/new", { username, password, full_name, email })
      .then(res => {
        axios
          .post("/users/login", { username, password })
          .then(res => {
            this.setState({
              userStatus: 'success'
            })
          })
          .catch(err => {
            this.setState({
              message: 'Created account.  Error logging in'
            })
          }) 
      })
      .catch(err => {
        this.setState({
          username: "",
          password: "",
          message: "Error inserting user"
        });
      });  
  }


		
		OLD CODE, PROBABLY DON'T NEED

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
			*/
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