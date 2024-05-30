 import React from 'react'
 import './Hero.css'
 import hero from '../Assets/Hero_product.png'
 import hero_img from '../Assets/hero_image.png'
 
 const Hero = () => {
	return (
		<div className='hero'>
			<div id='hero-left'>
				<p>New</p>
				<p>Quality Audio</p>
				<p>For Everyone</p>
			</div>
			<div id='hero-right'>
				<img src={hero} alt="" />
			</div>
		</div>
	)
 }
 
 export default Hero

