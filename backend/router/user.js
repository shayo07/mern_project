const express = require('express')
const {Login, Signup} = require('../controller/userController')
const router = express.Router()


//login router

router.post('/login', Login)

//signup router

router.post('/signup', Signup)


module.exports = router