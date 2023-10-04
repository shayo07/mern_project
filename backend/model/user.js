const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, {timestamp: true})

//static signup method
userSchema.statics.signup = async function(firstName, lastName, email, password){
    if(!email || !password){
        throw Error('all field must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password is weak')
    }
    const exist = await this.findOne({email})
    if(exist){
        throw Error('email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({firstName, lastName, email, password: hash})
    return user
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('all fields are required')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('incorrect username or password')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('incorrect username or password')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)