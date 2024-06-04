import React, { useEffect, useState } from 'react'
import './Account.css'

const Account = () => {

	const [userData, setUserData] = useState([]);
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const fetchUser = async () => {
		try{
			const response = await fetch('http://localhost:3001/fetchuser', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token')
				}
			})

			if(!response.ok){
				throw new Error('Failed to fetch user data')
			}

			const data = await response.json()

			if(data){
				setUserData(data)
				console.log('User data fetched')
			}else{
				console.log("Can't fetch user")
			}
		} catch(err) {
			console.error('Error fetching data:', err.message)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	useEffect(() => {
		if(userData.user){
			setName(userData.user.name)
			setEmail(userData.user.email)
		}
	}, [userData])

	const handleSubmit = async () => {
		try{
			const response = await fetch('http://localhost:3001/updatedata', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token')
				},
				body: JSON.stringify({ name, email, password })
			})

			if(!response.ok){
				throw new Error('Failed to update data')
			}

			const updatedUser = await response.json()
			setUserData(updatedUser)
			console.log('User data updated')
		} catch(err) {
			console.log(`Error updating data: ${err.message}`)
		}

		setPassword('');
	}

	return (
		<div id='main'>
			<h1>Account Information</h1>
			<div id='form'>
				<div>
					<label htmlFor="username">Username</label>
					<input 
						type="text" 
						id='username' 
						value={name}
						onChange={(e) => {setName(e.target.value)}}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input 
						type="email" 
						id='email' 
						value={email}
						onChange={(e) => {setEmail(e.target.value)}}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input 
						type="password" 
						id='password' 
						value={password}
						onChange={(e) => {setPassword(e.target.value)}}
						placeholder='Enter New Password'
						required
					/>
				</div>
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	)
}

export default Account