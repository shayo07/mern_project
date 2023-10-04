const mongoose = require('mongoose')

const Schema = mongoose.Schema

const storeTransactionSchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    },
    transType:{
        type: String,
        required: true,
    },
    transNo:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    cost:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    markup:{
        type: Number,
        required: true,
    },
    totalCost:{
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

module.exports = mongoose.model('StoreTransaction', storeTransactionSchema)