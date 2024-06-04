import React, { useContext } from 'react'
import { ShopContext } from '../ShopContext/ShopContext'
import Item from '../Components/Item/Item'
import './CSS/ShopCategory.css'

const ShopCategory = (props) => {

	const {all_product} = useContext(ShopContext)

	return (
		<div className='shop-category'>
			<img src={props.banner} alt="" className='shop-banner' />
			<div className='shopCategory-products'>
				{all_product.map((item, index) => {
					if(props.category === item.category){
						return <Item
									key={index}
									id={item.id}
									name={item.name}
									image={item.image}
									new_price={item.new_price}
									old_price={item.old_price}
								/>
					}else{
						return null
					}
				})}
			</div>
			<div className='shopCategory-loadMore'>
				Explore More
			</div>
		</div>
	)
}

export default ShopCategory