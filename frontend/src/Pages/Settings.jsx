import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import SettingSidebar from '../Components/SettingSidebar/SettingSidebar'
import './CSS/Settings.css'
import Admin from '../Components/Admin/Admin'
import AddProduct from '../Components/AddProduct/AddProduct'
import RemoveProduct from '../Components/RemoveProduct/RemoveProduct'

const Settings = () => {
	return (
		<div id='settings-main'>
			<SettingSidebar />
			<div id='right'>
				<Outlet />
			</div>
		</div>
	)
}

export default Settings