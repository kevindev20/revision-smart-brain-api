const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt');
const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');


const knex = require('knex');
const db = knex({
			  client: 'pg',
			  connection: {
			    connectionString: process.env.DATABASE_URL,
				  ssl: {
				    rejectUnauthorized: false
				  }
			  }
			});

// db.select('*').from('users')
// .then(data => console.log(data))
app.use(bodyParser.json());
app.use(cors())


 	app.get('/',(req,res) =>{
 		res.json(database.users)
 	})



 	app.post('/register',(req,res) => {register.handleRegister(req, res, bcrypt, db)})
	app.post('/signin',(req,res) => {signin.handleSignin(req, res, bcrypt, db)})
	app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res, db)})
	app.put('/image',(req,res) => {image.handleImage(req, res, db)})
	app.post('/imageurl',(req,res) => {image.handleApiCall(req, res)})

const PORT = process.env.PORT || 3001
app.listen(PORT , () => {
	console.log(`App is running on Port ${PORT} `)
})


/*
	root -get ----> its working 
	signin -post ----> success/fail 
	register -post ----> user
	profile/:userId -get  --->user 
	image -put ---->entries
*/