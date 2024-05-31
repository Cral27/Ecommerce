import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import cart from '../Assets/cart_icon.png'
import logo from '../Assets/techshop.png'
import settings from '../Assets/settings.png'

const Navbar = () => {

	const [selected, setSelected] = useState('all')

	const deleteData = () => {
		localStorage.clear()
	}

  	return (
		<div id='navbar'>
			<Link to='/'><img src={logo} alt="" id='navbar-logo'/></Link>
			<ul id='nav-list'>
				<li onClick={() => {setSelected('all')}} style={selected === 'all' ? {borderBottom:"3px solid #ff4141"} : null}><Link style={{textDecoration: 'none', color: '#171717'}} to='/'>All</Link></li>
				<li onClick={() => {setSelected('mouse')}} style={selected === 'mouse' ? {borderBottom:"3px solid #ff4141"} : null}><Link style={{textDecoration: 'none', color: '#171717'}} to='/mouse'>Mouse</Link></li>
				<li onClick={() => {setSelected('keyboard')}} style={selected === 'keyboard' ? {borderBottom:"3px solid #ff4141"} : null}><Link style={{textDecoration: 'none', color: '#171717'}} to='/keyboard'>Keyboard</Link></li>
				<li onClick={() => {setSelected('headphones')}} style={selected === 'headphones' ? {borderBottom:"3px solid #ff4141"} : null}><Link style={{textDecoration: 'none', color: '#171717'}} to='/headphones'>Headphones</Link></li>
			</ul>
			<div id='navbar-right'>
				{localStorage.getItem('auth-token') ? 
				<Link to='/login'><button id='login-btn' onClick={() => deleteData()}>Signout</button></Link> : 
				<Link to='/login'><button id='login-btn'>Login</button></Link>}
				<div id='cart'>
					<Link to='/cart'><img src={cart} alt="" id='cart-icon'/></Link>
					<p id='cart-num'>0</p>
				</div>
				<Link to='/settings'><img src={settings} alt="" id='settings'/></Link>
			</div>
		</div>
	)
}

export default Navbar