const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    middleName:{
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        required: false
    },
    deletedBy: {
        type: String,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Customer', customerSchema)