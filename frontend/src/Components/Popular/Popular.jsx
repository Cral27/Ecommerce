import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = () => {

	const [latest, setLatest] = useState([])

	useEffect(() => {
		fetch('http://localhost:3001/latestproducts')
		.then((res) => res.json())
		.then((data) => {setLatest(data)})
	}, [])

	return (
		<div id='latest'>
			<h1>Latest Products</h1>
			<hr />
			<div className="popular-item">
				{latest.map((item, index) => {
					return <Item 
						key={index}
						id={item.id}
						name={item.name}
						image={item.image}
						new_price={item.new_price}
						old_price={item.old_price}
					/>
				})}
			</div>
		</div>
	)
}

export default Popular 