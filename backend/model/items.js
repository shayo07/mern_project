const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    sku:{
        type: String,
        required: true
    },
    barcode:{
        type: String,
        required: true
    },
    cost:{
        type: String,
        required: true,
        default: 0
    },
    price:{
        type: String,
        required: true,
        default: 0
    },
    quantity:{
        type: String,
        required: true,
        default: 0
    },
    sold:{
        type: String,
        required: true,
        default: 0
    },
    available:{
        type: String,
        required: true,
        default: 0
    },
    defective:{
        type: String,
        required: true,
        default: 0
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

module.exports = mongoose.model('Item', itemSchema)