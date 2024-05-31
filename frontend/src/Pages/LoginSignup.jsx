import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

	const [state, setState] = useState('Login')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	
	const signup = async () => {
		let responseData; // Declare responseData here
	
		if (email != null && password != null && name != null) {
			const requestBody = { username: name, email: email, password: password };
	
			await fetch('http://localhost:3001/signup', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			})
			.then((resp) => resp.json())
			.then((data) => responseData = data)
			.catch((error) => {
				console.error('Error during signup:', error);
				alert('Error during signup. Please check the console for details.');
			});
	
			if(responseData.success && responseData){
				localStorage.setItem('auth-token', responseData.token)
	
				console.log('Successfully Signed In')
				//to go back to home after signing up
				window.location.replace('/')
			}else{
				alert('Signup Failed')
			}
		}else{
			console.log('Signup Failed:', responseData.errors);
			// Set error messages for specific fields
			alert('Signup failed')
		}
	
		setName('')
		setEmail('')
		setPassword('')
	}
	

	const login = async () => {
		if(email != null && password != null){
			let responseData;
			const requestBody = { email: email, password: password }

			await fetch('http://localhost:3001/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			})
			.then((resp) => resp.json())
			.then((data) => responseData = data)

			if(responseData.success && responseData){
				localStorage.setItem('auth-token', responseData.token)
				window.location.replace('/')
			}else{
				alert('Login Failed')
			}
		}else{
			alert('banana')
		}
	}

	return (
		<div id='body'>
			<div id='main-form'>
				<h1>{state}</h1>
				<div id='fields'>
					{state === "Sign Up" ? 
					<input 
						type="text" 
						placeholder='Your Name' 
						onChange={(e) => {setName(e.target.value)}}
						value={name} 
						required/> : null}
					<input 
						type="email" 
						placeholder='Email Address' 
						onChange={(e) => {setEmail(e.target.value)}}
						value={email} 
						required
					/>
					<input 
						type="password" 
						placeholder='Password' 
						onChange={(e) => {setPassword(e.target.value)}}
						value={password} 
						required
					/>
				</div>
				<button onClick={() => {state === 'Login' ? login() : signup()}}>Submit</button>
				<p id='terms'>
					{state === 'Login' ? "Already have an account?" : "Don't have an account?"}
					<span onClick={() => {(state === 'Login') ? setState('Sign Up') : setState('Login')}}>Click Here</span>
				</p>
			</div>
		</div>
	)
}

export default LoginSignup