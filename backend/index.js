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

//run the api
app.listen(port, (err) => {
	if(!err){
		console.log(`Server running on Port ${port}`)
	}else{
		console.log(`Error: ${error}`)
	}
})