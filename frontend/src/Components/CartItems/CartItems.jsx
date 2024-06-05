import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../ShopContext/ShopContext'
import cross from '../Assets/cross_icon_nobg.png'

const CartItems = () => {
	const {all_product, cartItems, removeFromCart, getTotalCartAmount, removeAllItems} = useContext(ShopContext)
	const [promoCode, setPromoCode] = useState('')
	const [code, setCode] = useState('')

	return (
		<div id='cartItems'>
			<div className="cartItems-format-main">
				<p>Products</p>
				<p>Title</p>
				<p>Price</p>
				<p>Quantity</p>
				<p>Total</p>
				<p>Remove</p>
			</div>
			<hr />
			{all_product.map((e) => {
				if(cartItems[e.id] > 0){
					return(
						<div>
							<div className="cartItems-format cartItems-format-main">
								<img src={e.image} alt="" className='product-icon'/>
								<p>{e.name}</p>
								<p>${e.new_price}</p>
								<button className='cartItems-quantity'>{cartItems[e.id]}</button>
								<p>${e.new_price*cartItems[e.id]}</p>
								<img src={cross} alt="" id='cross' onClick={() => removeFromCart(e.id)}/>
							</div>
							<hr />
						</div>
					)
				}
				return null
			})}
			<div id="cartItems-down">
				<div id="cartItems-total">
					<h1>Cart Totals</h1>
					<div>
						<div className="cartItems-total-item">
							<p>Subtotal</p>
							<p>${getTotalCartAmount()}</p>
						</div>
						<hr />
						<div className="cartItems-total-item">
							<p>Shipping Fee</p>
							<p>Free Shipping</p>
						</div>
						<hr />
						<div className="cartItems-total-item">
							<h3>Total</h3>
							<h3>${getTotalCartAmount() - (code === 'TECHSHOP' ? getTotalCartAmount() * 0.5 : 0)}</h3>
						</div>
					</div>
					<button onClick={() => removeAllItems()}>PROCEED TO CHECKOUT</button>
				</div>
				<div className='cartItems-promo-code'>
					<p>If you have a promo code, Enter it here</p>
					<div className="cartItems-promo-box">
						<input type="text" placeholder='USE CODE TECHSHOP FOR 50% OFF' value={promoCode} onChange={(e) => setPromoCode(e.target.value)}/>
						<button onClick={() => {setCode(promoCode); setPromoCode('')}}>Submit</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartItems