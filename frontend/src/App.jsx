import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function App() {
  const [count, setCount] = useState(0)

	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Shop />}></Route>
					<Route path='/mouse' element={<ShopCategory category='mouse'/>}></Route>
					<Route path='/keyboard' element={<ShopCategory category='keyboard'/>}></Route>
					<Route path='/headphones' element={<ShopCategory category='headphones'/>}></Route>
					<Route path='product' element={<Product />}>
						<Route path=':productId' element={<Product />}></Route>
					</Route>
					<Route path='/cart' element={<Cart />}></Route>
					<Route path='/login' element={<LoginSignup />}></Route>
					<Route path='/settings' element={<Settings />}>
						<Route path='admin' element={<Admin />}></Route>
						<Route path='addproduct' element={<AddProduct />}></Route>
						<Route path='removeproduct' element={<RemoveProduct />}></Route>
					</Route>
					
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
