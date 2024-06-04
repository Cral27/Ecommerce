import React, {createContext, useState, useContext, useEffect} from 'react'

export const ShopContext = createContext(null)

const getDefaultCart = () => {
	let cart = {}
	for(let i=0; i<100+1; i++){
		cart[i] = 0
	}
	return cart
}

const ShopContextProvider = (props) => {

	const [isAdmin, setIsAdmin] = useState(null)
	const [all_product, setAll_Product] = useState([]);
	const [cartItems, setCartItems] = useState([])

	//check if user is admin
	const adminStatus = async () => {
		try{
			const response = await fetch('http://localhost:3001/checkadmin', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('auth-token')
				}
			})

			if(!response.ok){
				throw new Error('Failed to fetch data')
			}

			const data = await response.json()

			setIsAdmin(data.isAdmin)
		} catch(err) {
			console.error('Error checking admin status:', err.message);
		}
	}

	//run everytime the page loads
	useEffect(() => {
		//check admin status
		adminStatus();

		//fetch all products
		fetch('http://localhost:3001/allproducts')
		.then((res) => res.json())
		.then((data) => setAll_Product(data))

		//fetch cartdata
		if(localStorage.getItem('auth-token')){
			fetch('http://localhost:3001/getcart', {
				method: 'POST',
				headers: {
					Accept: 'application/form-data',
					'auth-token': `${localStorage.getItem('auth-token')}`,
					'Content-Type': 'application/json',
				},
				body: '',
			})
			.then((res) => res.json())
			.then((data) => {setCartItems(data)})
		}
	}, [])

	//addtocart bleh bleh
	const addToCart = (itemId, count) => {
		setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+count}))
		if(localStorage.getItem('auth-token')){
			fetch('http://localhost:3001/addtocart', {
				method: 'POST',
				headers: {
					Accept: 'application/form-data',
					'auth-token': `${localStorage.getItem('auth-token')}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "itemId": itemId })
			})
			.then((res) => res.json())
			.then((data) => console.log(data))
		}
	}

	//removing items from cart
	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({...prev, [itemId]:0}))
		if(localStorage.getItem('auth-token')){
			fetch('http://localhost:3001/removefromcart', {
				method: 'POST',
				headers: {
					Accept: 'application/form-data',
					'auth-token': `${localStorage.getItem('auth-token')}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({"itemId": itemId})
			})
			.then((res) => res.json())
			.then((data) => console.log(data))
		}
	}

	//Get Cart Total Price
	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for(const item in cartItems){
			if(cartItems[item] > 0){
				let itemInfo = all_product.find((product) => product.id === Number(item))
				totalAmount += itemInfo.new_price*cartItems[item]
			}
		}
		return totalAmount
	}

	//Get the Number of Cart Items
	const getTotalCartItems = () => {
		let totalItem = 0;
		for(const item in cartItems){
			if(cartItems[item] > 0){
				totalItem += 1
			}
		}
		return totalItem
	}
	

	const contextValue = { isAdmin, all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems }

	return (
		<ShopContext.Provider value={contextValue}>
			{props.children}
		</ShopContext.Provider>
	)
}

export default ShopContextProvider
