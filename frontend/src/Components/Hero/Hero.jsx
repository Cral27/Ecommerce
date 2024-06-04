 import React from 'react'
 import './Hero.css'
 import { Link } from 'react-router-dom'
 import hero from '../Assets/Hero_product.png'
 import arrow from '../Assets/arrow.png'
 
 const Hero = () => {
	return (
		<div className='hero'>
			<div id='hero-left'>
				<p>New</p>
				<p>Quality Audio</p>
				<p>For Everyone</p>
				<a href="#latest" style={{textDecoration: 'none'}}>
					<div id='arrow'>
						<div>Latest Drops</div>
						<img src={arrow} alt="Arrow-icon" id='arrow-icon'/>
					</div>
				</a>
			</div>
			<div id='hero-right'>
				<img src={hero} alt="" />
			</div>
		</div>
	)
 }
 
 export default Hero

