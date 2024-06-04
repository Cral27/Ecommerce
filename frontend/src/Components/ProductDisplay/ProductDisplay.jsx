import React, {useContext, useState} from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../ShopContext/ShopContext'

const ProductDisplay = (props) => {
	const { product } = props;
	const [count, setCount] = useState(1)
	const {addToCart} = useContext(ShopContext);

	return (
		<div id='productDisplay'>
			<div id="productDisplay-left">
				<div id="productDisplay-img">
					<img src={product.image} alt="" id='productDisplay-main-img'/>
				</div>
			</div>
			<div id="productDisplay-right">
				<h1>{product.name}</h1>
				<div id="productDisplay-right-star">
					<img src={star_icon} alt="" />
					<img src={star_icon} alt="" />
					<img src={star_icon} alt="" />
					<img src={star_icon} alt="" />
					<img src={star_dull_icon} alt="" />
					<p>122</p>
				</div>
				<div id="prices">
					<div id="old-price">${product.old_price}</div>
					<div id="new-price">${product.new_price}</div>
				</div>
				<div id="description">
					{product.category === 'mouse' ? <>
						Experience precise control with our high-performance gaming mouse. Featuring customizable RGB lighting and programmable buttons for ultimate control. Designed for professional gamers, it ensures comfort and durability for long gaming sessions. </> 
					: product.category === 'keyboard' ? <>
						Elevate your setup with our mechanical gaming keyboard. Featuring tactile switches, customizable RGB backlighting, and dedicated macro keys. Its robust construction ensures durability, while the ergonomic design provides comfort during play.
					</> : <>
					Immerse yourself in the game with our surround sound headphones. Equipped with high-fidelity audio drivers for clear sound and deep bass. The noise-canceling microphone ensures clear communication, and the adjustable design offers comfort for long sessions.
					</>}
				</div>
				<div id='counter'>
					<button onClick={() => setCount(count+1)}>+</button>
					<p>{count}</p>
					<button onClick={() => setCount(count-1) } disabled={count <= 0}>-</button>
				</div>
				<button onClick={() => {addToCart(product.id, count)}} id='add-to-cart'>ADD TO CART</button>
				<p className='category'><span>Category: <span>Technology, Gaming, Esports</span></span></p>	
				<p className="category"><span>Tags: <span>Latest, Popular</span></span></p>	
			</div>
		</div>
	)
}

export default ProductDisplay