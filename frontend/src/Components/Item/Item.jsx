import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
	return (
		<div id='item'>
			<Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="item-image" /></Link>
			<p>{props.name}</p>
			<div id="item-prices">
				<div id="item-price-new">
					${props.new_price}
				</div>
				<div id='item-price-old'>
					${props.old_price}
				</div>
			</div>
		</div>
	)
}

export default Item