import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

	const [state, setState] = useState('Login')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<div id='body'>
			<div id='main-form'>
				<h1>{state}</h1>
				<div id='fields'>
					{state === "Sign Up" ? 
					<input type="text" placeholder='Your Name' required/> : null}
					<input type="email" placeholder='Email Address' required/>
					<input type="password" placeholder='Password' required/>
				</div>
				<button>Submit</button>
				<p id='terms'>
					{state === 'Login' ? "Already have an account?" : "Don't have an account?"}
					<span onClick={() => {(state === 'Login') ? setState('Sign Up') : setState('Login')}}>Click Here</span>
				</p>
			</div>
		</div>
	)
}

export default LoginSignup