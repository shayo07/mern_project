const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartItemSchema = new Schema({
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    unitCost: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },
    netPrice:{
        type: Number,
        required: true,
    },
    markup:{
        type: Number,
        required: true,
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

module.exports = mongoose.model('CartItem', cartItemSchema)