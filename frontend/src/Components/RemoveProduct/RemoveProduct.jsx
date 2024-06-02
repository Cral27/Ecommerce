import React, { useEffect, useState } from 'react'
import './RemoveProduct.css'
import cross from '../Assets/cross_icon_nobg.png'

const RemoveProduct = () => {

	const [ allProducts, setAllProducts ] = useState([])

	const fetchProducts= async () => {
		await fetch('http://localhost:3001/allproducts')
		.then((res) => res.json())
		.then((data) => setAllProducts(data))
	}

	useEffect(() => {
		fetchProducts()
	}, []) 

	const removeProduct = async (id) => {
		await fetch('http://localhost:3001/removeproduct', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id:id })
		})
		await fetchProducts();
	}

	return (
		<div className='list-product'>
			<h1>Products List</h1>
			<div className="listproduct-format-main">
				<p>Product</p>
				<p>Title</p>
				<p>Old Price</p>
				<p>New Price</p>
				<p>Category</p>
				<p>Remove</p>
			</div>
			{allProducts.length > 0 && <hr />}
			<div className="listproduct-allproducts">
				{allProducts.map((product, index) => {
					return <>
						<div key={index} className="listproduct-format-main listproduct-format">
							<img src={product.image} alt="" className="listproduct-product-icon" />
							<p>{product.name}</p>
							<p>${product.old_price}</p>
							<p>${product.new_price}</p>
							<p>{product.category}</p>
							<img onClick={() => {removeProduct(product.id)}} src={cross} alt="" className='listproduct-remove-icon'/>
						</div>
						<hr />	
					</>
				})}
			</div>
		</div>
	)
}

export default RemoveProduct