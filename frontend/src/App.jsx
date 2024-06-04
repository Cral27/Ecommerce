import { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import Footer from './Components/Footer/Footer'
import Settings from './Pages/Settings'
import Admin from './Components/Admin/Admin'
import AddProduct from './Components/AddProduct/AddProduct'
import RemoveProduct from './Components/RemoveProduct/RemoveProduct'
import Account from './Components/Account/Account'
import { ShopContext } from './ShopContext/ShopContext'
import mouse_banner from './Components/Assets/mouse_banner.jpg'
import keyboard_banner from './Components/Assets/keyboard_banner.jpg'
import headphone_banner from './Components/Assets/headphone_banner.jpg'

function App() {

	const { isAdmin } = useContext(ShopContext);

	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Shop />}></Route>
					<Route path='/mouse' element={<ShopCategory banner={mouse_banner} category='mouse'/>}></Route>
					<Route path='/keyboard' element={<ShopCategory banner={keyboard_banner} category='keyboard'/>}></Route>
					<Route path='/headphones' element={<ShopCategory banner={headphone_banner} category='headphone'/>}></Route>
					<Route path='product' element={<Product />}>
						<Route path=':productId' element={<Product />}></Route>
					</Route>
					<Route path='/cart' element={<Cart />}></Route>
					<Route path='/login' element={<LoginSignup />}></Route>
					<Route path='/settings' element={<Settings />}>
						<Route index element={isAdmin ? <Navigate to="/settings/productlist" replace /> : <Navigate to="/settings/account" replace />} /> {/* Redirect default route */}
						{isAdmin ? <>
								<Route path='admin' element={<Admin />}></Route>
								<Route path='addproduct' element={<AddProduct />}></Route>
								<Route path='productlist' element={<RemoveProduct />}></Route>
						</> : null}
						<Route path='account' element={<Account />}></Route>
					</Route>
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
