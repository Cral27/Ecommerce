import React, { useEffect, useState } from 'react'
import './SettingSidebar.css'
import { Link } from 'react-router-dom'
import product_icon from '../Assets/Product_list_icon.svg'
import product_cart from '../Assets/Product_Cart.svg'
import admin_icon from '../Assets/admin-logo.png'

const SettingSidebar = () => {

	const [admin, setAdmin] = useState(null)

	const adminStatus = async () => {
		try{
			const response = await fetch('http://localhost:3001/checkadmin', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token')
				}
			})

			if(!response.ok){
				throw new Error('Failed to fetch data')
			}

			const data = await response.json()
			const isAdmin = data.isAdmin

			console.log(`Is Admin status: ${isAdmin}`)

			if(isAdmin){
				setAdmin(isAdmin)
				console.log('User is an admin')
			}else{
				console.log('User does not have qualifications')
			}
		} catch(err) {
			console.error('Error checking admin status:', err.message);
		}
	}

	useEffect(() => {
		adminStatus();
	}, [])

	return (
		<div id='sidebar-main'>
			{admin ?
				<>
					<Link to='/settings/admin' style={{textDecoration: "none", color: 'black'}}>
						<div className='sidebar-item'>
							<img src={admin_icon} alt="" />
							<p>Users</p>
						</div>
					</Link>
					<Link to='/settings/addproduct' style={{textDecoration: "none", color: 'black'}}>
						<div className='sidebar-item'>
							<img src={product_cart} alt="" />
							<p>Add Product</p>
						</div>
					</Link>
					<Link to='/settings/productlist' style={{textDecoration: "none", color: 'black'}}>
						<div className='sidebar-item'>
							<img src={product_icon} alt="" />
							<p>Product List</p>
						</div>
					</Link>
				</>
			: null}
			<h1>Benis</h1>
		</div>
	)
}

export default SettingSidebar