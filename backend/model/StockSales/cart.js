const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    cartNo: {
        type: String,
        required: true,
        default: 'CROOOO1'
    },
    gross: {
        type: Number,
        required: true,
        default: 0
    },
    discount:{
        type: Number,
        required: true,
        default: 0
    },
    promo:{
        type: Number,
        required: true,
        default: 0
    },
    net:{
        type: Number,
        required: true,
        default: 0
    },
    status:{
        type: String,
        required: true,
        default: 'ACTIVE'
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

module.exports = mongoose.model('Cart', cartSchema)