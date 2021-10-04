const userControl = require('../controllers/userCtrl')

const router = require('express').Router()

//get all users
router.get('/users', userControl.getUsers)

//get one user
//user sign in
router.post('/users/signin' , userControl.signIn)


//#############################################################

module.exports = router