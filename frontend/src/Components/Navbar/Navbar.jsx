import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/cart_icon.png'
import logo2 from '../Assets/techshop.png'

const Navbar = () => {

	const [selected, setSelected] = useState('all')

  	return (
		<div id='navbar'>
			<img src={logo2} alt="" id='navbar-logo'/>
			<ul id='nav-list'>
				<li onClick={() => {setSelected('all')}} style={selected === 'all' ? {borderBottom:"3px solid #ff4141"} : null}>All</li>
				<li onClick={() => {setSelected('mouse')}} style={selected === 'mouse' ? {borderBottom:"3px solid #ff4141"} : null}>Mouse</li>
				<li onClick={() => {setSelected('keyboard')}} style={selected === 'keyboard' ? {borderBottom:"3px solid #ff4141"} : null}>Keyboard</li>
				<li onClick={() => {setSelected('headphones')}} style={selected === 'headphones' ? {borderBottom:"3px solid #ff4141"} : null}>Headphones</li>
			</ul>
			<div id='navbar-right'>
				<button id='login-btn'>Login</button>
				<div id='cart'>
					<img src={cart} alt="" id='cart-icon'/>
					<p id='cart-num'>0</p>
				</div>

			</div>
		</div>
	)
}

export default Navbar