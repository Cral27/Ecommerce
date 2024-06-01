import React from 'react'
import './SettingSidebar.css'
import { Link } from 'react-router-dom'
import product_icon from '../Assets/Product_list_icon.svg'
import product_cart from '../Assets/Product_Cart.svg'
import admin_icon from '../Assets/admin-logo.png'

const SettingSidebar = () => {
  return (
	<div id='sidebar-main'>
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
		<Link to='/settings/removeproduct' style={{textDecoration: "none", color: 'black'}}>
			<div className='sidebar-item'>
				<img src={product_icon} alt="" />
				<p>Product List</p>
			</div>
		</Link>
	</div>
  )
}

export default SettingSidebar