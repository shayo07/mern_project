const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
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
    brandId:{
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    description:{
        type: String,
        required: true
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

module.exports = mongoose.model('Product', productSchema)