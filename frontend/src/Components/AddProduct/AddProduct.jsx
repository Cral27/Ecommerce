import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../Assets/upload_area.svg'

const AddProduct = () => {

	const [image, setImage] = useState(null)
	const [productDetails, setProductDetails] = useState({
		name: '',
		image: '',
		category: 'keyboard',
		new_price: '',
		old_price: '',
	})

	const imageHandler = (e) => {
		setImage(e.target.files[0]);
	}

	const changeHandler = (e) => {
		setProductDetails({...productDetails, [e.target.name]: e.target.value})
	}

	const AddProduct = async () => {
		try{
			console.log(productDetails)
			let responseData
			let product = productDetails

			//Making formData and combining product details and image
			let formData = new FormData()
			formData.append('product', image)

			//Connecting to backend and checking if it will connect
			const uploadResponse = await fetch('http://localhost:3001/upload', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
				body: formData,
			})

			if(!uploadResponse.ok){
				throw new Error(`Upload failed with status: ${uploadResponse.status}`)
			}

			const uploadData = await uploadResponse.json();
			responseData = uploadData;

			if(responseData.success){
				product.image = responseData.image_url
				console.log(product)

				//Adding the product on mongodb
				const addProductResponse = await fetch('http://localhost:3001/addproduct', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(product),
				})

				if(!addProductResponse.ok){
					throw new Error(`Failed to add product status: ${addProductResponse.status}`)
				}

				const addProductData = await addProductResponse.json();
				if(addProductData.success){
					alert("Product has been added");
					setProductDetails({
						name: '',
						image: '',
						category: 'keyboard',
						new_price: '',
						old_price: '',
					})
					setImage(null)
					document.getElementById('file-input').value = null
				}else{
					alert('Failed to add product')
				}
			}
		}catch (err){
			console.error(`Error: ${err}`)
			alert(`An error has occured: ${err.message}`)
		}
	}

	return (
		<div id='add-product'>
			<div className="addproduct-itemfield">
				<p>Product Title</p>
				<input type="text" onChange={changeHandler} value={productDetails.name} name='name' placeholder='Product Name'/>
			</div>
			<div className="addproduct-price">
				<div className="addproduct-itemfield">
					<p>Price</p>
					<input type="text" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='Enter Price'/>
				</div>
				<div className="addproduct-itemfield">
					<p>Offer Price</p>
					<input type="text" value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder='Enter New Price'/>
				</div>
			</div>
			<div className="addproduct-itemfield">
				<p>Product Category</p>
				<select name="category" value={productDetails.category} className='addproduct-selector' onChange={changeHandler}>
					<option value="mouse">Mouse</option>
					<option value="keyboard">Keyboard</option>
					<option value="headphone">Headphone</option>
				</select>
			</div>
			<div className="addproduct-itemfield">
				<label htmlFor="file-input">
					<img src={image ? URL.createObjectURL(image) : upload} alt="" className='addproduct-thumbnail-img'/>
				</label>
				<input type="file" onChange={imageHandler} name='image' id='file-input' hidden/>
			</div>
			<button onClick={AddProduct} className='addproduct-btn'>Add</button>
		</div>
	)
}

export default AddProduct