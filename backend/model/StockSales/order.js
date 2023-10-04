const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    orderNo: {
        type: String,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    itemDiscount: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    shipping:{
        type: Number,
        required: true,
    },
    total:{
        type: Number,
        required: true,
    },
    promo:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },
    grandTotal:{
        type: Number,
        required: true,
    },
    paid:{
        type: Number,
        required: true,
    },
    balance:{
        type: Number,
        required: true,
    },
    status:{
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

module.exports = mongoose.model('Order', orderSchema)