const handleSignin = (req,res, bcrypt, db) =>{
	if(!req.body.email || !req.body.password){
			return res.json ('Unable to signin,input wrong')
		}
		db.select('*').from('login')
			.where('email','=',req.body.email)
			.then(data => {
				const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
				if (isValid){
					return db.select('*').from('users')
						.where('email','=',req.body.email)
						.then(user => {
								res.json(user[0])
						})
				}else{
					res.json('Failed to signin')
				}

			})
			.catch(err => res.status(400).json('Signin process failed'))
	}

module.exports ={
	handleSignin:handleSignin
}