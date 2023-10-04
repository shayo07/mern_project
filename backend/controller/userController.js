const User = require('../model/user')
const jwt = require('jsonwebtoken')


//create token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


//login
const Login = async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    }catch(error){
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


//signup
const Signup = async(req, res) => {
    const {firstName, lastName, email, password} = req.body

    try{
        const user = await User.signup(firstName, lastName, email, password)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {Login, Signup}