import React, { useEffect, useState } from 'react'
import './Admin.css'
import cross from '../Assets/cross_icon_nobg.png'

const Admin = () => {

	const [users, setUsers] = useState([])

	const fetchUsers = async () => {
		await fetch('http://localhost:3001/fetchusers')
		.then((res) => res.json())
		.then((data) => {setUsers(data)})
	}

	const removeUser = async (id) => {
		await fetch('http://localhost:3001/removeuser', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: id })
		})
		console.log(id)
		await fetchUsers();
	}

	useEffect(() => {
		fetchUsers();
	}, [])

	return (
		<div id='admin'>
			<h1>Users List</h1>
			<div id='user-list-format'>
				<p>Id</p>
				<p>Name</p>
				<p>email</p>
				<p>Admin Status</p>
				<p>Date Registered</p>
				<p>Remove</p>
			</div>
			{users.length > 0 && <hr />}
			<div id='users-list'>
				{users.map((user, index) => {
					return <>
						<div className="usersformat-users-main" key={index}>
							<p>{index+1}</p>
							<p>{user.name}</p>
							<p>{user.email}</p>
							<p>{user.isAdmin === true ? 'Yes' : 'No'}</p>
							<p>{user.date}</p>
							<img src={cross} alt="" onClick={() => {removeUser(user._id)}}/>
						</div>
						<hr />
					</>
				})}
			</div>
		</div>
	)
}

export default Admin