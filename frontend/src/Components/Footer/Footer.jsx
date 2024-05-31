import React from 'react'
import './Footer.css'
import logo from '../Assets/techshop.png'
import insta from '../Assets/instagram_icon.png'
import pinterest from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'

const Footer = () => {
	return (
		<div id='footer'>
			<img src={logo} alt="" id='footer-logo'/>
			<ul id="footer-link">
				<li>Company</li>
				<li>Products</li>
				<li>Offices</li>
				<li>About</li>
				<li>Contact</li>
			</ul>
			<div id='footer-socials'>
				<div className='footer-socials-container'>
					<img src={insta} alt="" />
				</div>
				<div className='footer-socials-container'>
					<img src={pinterest} alt="" />
				</div>
				<div className='footer-socials-container'>
					<img src={whatsapp} alt="" />
				</div>
			</div>
			<div id='footer-copyright'>
				<hr />
				<p>Copyright @ 2024 - All Rights Reserved</p>
			</div>
		</div>
	)
}

export default Footer