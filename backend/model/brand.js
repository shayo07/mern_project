const mongoose = require('mongoose')

const Schema = mongoose.Schema

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    createdBy: {
        type: String,
        required: false
    },
    updatedBy: {
        type: String,
        required: false
    },
    deletedBy: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Brand', brandSchema)