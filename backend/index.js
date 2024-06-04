const express = require('express')
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const jwt =  require('jsonwebtoken')
const {validationResult, body} = require('express-validator');
const md5 = require('md5')

const port = 3001;
const app = express()

app.use(express.json())
app.use(cors())

//Database Connection with MongoDB
const uri = "mongodb+srv://carl2700:Banana123@cluster0.jyokewp.mongodb.net/e-commerce?retryWrites=true&w=majority"
mongoose.connect(uri)
.then(() => {
	console.log('MongoDB Connected')
})
.catch((err) => {
	console.error('MongoDB Connection Error: ', err)
})

//for connection verification
app.get('/', (req, res) => {
	res.send("Express App is running")
})

/* For Users API */
//Schema for users model
const Users = mongoose.model('Users2', {
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cartData: {
		type: Object,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now
	},
	isAdmin: {
		type: Boolean,
		default: false,
	}
})

//Endpoint for user when registering
app.post('/signup', [
	body('username').notEmpty().withMessage('Username is required'),
	body('email').isEmail().withMessage('Valid email is required'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
	const errors = validationResult(req)
	if(!errors.isEmpty()){
		return res.status(400).json({ success: false, errorrs: errors.array() })
	}

	const { username, email, password } = req.body

	try{
		let check = await Users.findOne(({email}))

		//duplicate of above
		if(check){
			return res.status(400).json({ success: false, errors: 'Existing User Found' })
		}

		let cart = {}
		for(let i=0; i<100; i++){
			cart[i] = 0
		}

		let hashed = md5(password)

		const user = new Users({ 
			name: username,
			email,
			password: hashed,
			cartData: cart,
		})

		//saves user details
		await user.save()

		const data = {
			user: {
				id: user.id,
			}
		}

		const id = {
			user: user.id,
		}

		const adminStatus = {
			isAdmin: user.isAdmin
		}

		const token = jwt.sign(data, 'secret_code')
		res.json({ success: true, token, adminStatus, id })

	}catch(err){
		console.error(err.message)
		res.status(500).send('Server Error has occured')
	}
})

//Endpoint for login
app.post('/login', async (req, res) => {
	let user = await Users.findOne({email: req.body.email})

	if(user){
		const passCompare = md5(req.body.password) === user.password

		if(passCompare){
			const data = {
				user: {
					id: user.id
				}
			}

			const token = jwt.sign(data, 'secret_code')
			res.json({success: true, token})
		}else{
			res.json({success: false, error: "Incorrect Credentials"})
		}
	}else{
		res.json({success: false, errors: "Incorrect Credentials"})
	}
})

//fetch all users
app.get('/fetchusers', async (req, res) => {
	try{
		let user = await Users.find({})
	console.log('Users Fetched')
	res.send(user);
	} catch (err){
		console.error(`Error fetching users: ${err}`)
		res.status(500).json({success: false, error: err.message});
	}
})

//fetchuser middleware
const fetchUser = async (req, res, next) => {
	const token = req.header('auth-token')
	if(!token){
		return res.status(401).send({ errors: 'Users does not exist' })
	}

	try{
		const data = jwt.verify(token, 'secret_code')
		const user = await Users.findById(data.user.id)
		if(!user){
			return res.status(404).send({ errors: "User does not exist" })
		}
		req.user = user
		next()
	} catch(err) {
		return res.status(401).send({ erorrs: 'Please use a valid token' })
	}
}

const isAdmin = (req, res) => {
	if(req.user && req.user.isAdmin){
		res.send({ isAdmin: true })
	}else{
		res.send({ isAdmin: false })
	}
}

//fetch isAdmin
app.get('/checkadmin', fetchUser, isAdmin, (req, res) => {
	console.log('Code running')
})

//fetch user info
app.get('/fetchuser', fetchUser, (req, res) => {
	if(req.user){
		res.send({ user: req.user })
	} else{
		return res.status(400).send({ errors: 'User not found' })
	}
})

//update user info
app.post('/updatedata', fetchUser, async (req, res) => {

	if(req.body.password){
		try{
			const { name, email, password } = req.body;
			const hashedPassword = md5(password)
	
			let updateUser = await Users.findByIdAndUpdate(
				req.user.id, 
				{
					$set: { name, email, password: hashedPassword },
				},
				{ new: true }
			)
	
			res.json(updateUser)
		} catch(err) {
			res.status(500).send({ errors: 'Error updating data' })
		}
	} else{
		return res.status(404).send({ errors: 'Please Provide a Password' })
	}
	

})

//Remove user
app.post('/removeuser', async (req, res) => {
	try{
		const userData = await Users.deleteOne({_id: req.body.id});
		if(userData){
			console.log('Removed User')
			res.status(200).send('User Removed Successfully');
		} else {
			res.status(404).send('User Not Found')
		}
	} catch (err) {
		console.error('Error removing user: '. err)
		res.status(500).send('Error removing user')
	}
})

/* For Multer/Upload of images */
//Using Multer for images
const storage = multer.diskStorage({
	destination: 'upload/images',
	filename: (req, file, cb) => {
		return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
	},
})

//for multer uploads
const upload = multer ({ storage: storage })

//api for uploading images
app.use('/images', express.static('upload/images'))//when clicking the images

//upload api
app.post('/upload', upload.single('product'), (req, res) => {
	if(!req.file){
		return res.status(400).json({ success: 0, message: 'File upload failed' })
	}

	res.json({
		success: 1,
		image_url: `http://localhost:${port}/images/${req.file.filename}`
	})
})


/* For Products API */
//Schema for products 2
const Product = mongoose.model('Product2', {
	id: {
		type: Number,
		required: true,
	},
		name: {
		type: String,
		required: true,
	},
		image: {
		type: String,
		required: true,
	},
		category: {
		type: String,
		required: true,
	},
		new_price: {
		type: Number,
		required: true,
	},
		old_price: {
		type: Number,
		required: true,
	},
		date: {
		type: Date,
		default: Date.now,
	},
		available: {
		type: Boolean,
		default: true,
	},
})

//adding product
app.post('/addproduct', async (req, res) => {
	try{
		console.log('Received request to add product:', req.body)

		//validation of data
		const { name, image, category, new_price, old_price } = req.body
		if(!name || !image || !category || !new_price || !old_price){
			return res.status(400).json({ success: false, message: 'Missing required fields' });
		}

		//getting the list or amount of products
		let products = await Product.find({});
		let id = 1;
		if(products.length > 0){
			let last_product_array = products.slice(-1)
			let last_product = last_product_array[0]
			id = last_product.id + 1
		}

		const product = new Product({
			id: id,
			name: name,
			image: image,
			category: category,
			new_price: new_price,
			old_price: old_price
		})

		console.log('Saving product: ', product)

		await product.save()
		console.log('Product Saved')

		res.json({
			success: true,
			name: name,
		})
	} catch (err){
		console.error('Error saving the product: ', err)
		res.status(500).json({success: false, error: err.message});
	}
})

//removal of product
app.post('/removeproduct', async (req, res) => {
	try{
		await Product.findOneAndDelete({ id: req.body.id });
		console.log(`Removed Product`)
		res.json({
			success: true, 
			name: req.body.name,
		})
	} catch(err) {
		console.error('Error removing product: ', err)
		res.status(500).json({success: false, error: err.message})
	}
})

/* For Cart API */
//Adding Products to cart
app.post('/addtocart', fetchUser, async (req, res) => {
	let userData = await Users.findOne({ _id: req.user.id })
	userData.cartData[req.body.itemId] += 1
	await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
	res.send("Added to cart")
})

//Fetch all products
app.get('/allproducts', async (req, res) => {
	try{
		let products = await Product.find({})
		console.log('All Products Fetched')
		res.send(products)
	} catch (err) {
		console.error('Error fetching products: ',err)
		res.status(500).json({success: false, error: err.message})
	}
})

//removing products from cart
app.post('/removefromcart', fetchUser, async(req, res) => {
	let userData = await Users.findOne({ _id: req.user.id })
	if(userData.cartData[req.body.itemId] > 0){
		userData.cartData[req.body.itemId] = 0;
		await Users.findOneAndUpdate({ _id: req.user.id }, {cartData: userData.cartData});
	}

	res.send(`Removed Product`)
})

//fetch Cart Data
app.post('/getcart', fetchUser, async (req, res) => {
	let userData = await Users.findOne({ _id: req.user.id })
	res.json(userData.cartData)
})

//run the api
app.listen(port, (err) => {
	if(!err){
		console.log(`Server running on Port ${port}`)
	}else{
		console.log(`Error: ${error}`)
	}
})