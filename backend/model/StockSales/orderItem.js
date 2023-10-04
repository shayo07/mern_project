const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderItemSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
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
    totalmarkup:{
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

module.exports = mongoose.model('OrderItem', orderItemSchema)