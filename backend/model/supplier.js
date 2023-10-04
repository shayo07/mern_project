const mongoose = require('mongoose')

const Schema = mongoose.Schema

const supplierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactPerson: {
        type: String,
        required: true
    },
    contactMobile: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    country: {
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
})

module.exports = mongoose.model('Supplier', supplierSchema)