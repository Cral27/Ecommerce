import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'

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
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
