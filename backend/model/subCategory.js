const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {type: Schema.Types.ObjectId,
        ref: 'Category'},
        
    description:{
        type: String,
        required: true
    },
    photo: {
        type: String
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
})

module.exports = mongoose.model('SubCategory', subCategorySchema)