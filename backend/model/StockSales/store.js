const mongoose = require('mongoose')

const Schema = mongoose.Schema

const storeSchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    storeNo:{
        type: String,
        required: true,
    },
    cost:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    markup:{
        type: String,
        required: true,
    },
    quantity:{
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

module.exports = mongoose.model('Store', storeSchema)