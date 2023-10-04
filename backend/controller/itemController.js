const mongoose = require('mongoose')
const Items = require('../model/items')
const Category = require('../model/category')
const SubCategory = require('../model/subCategory')
const Brand = require('../model/brand')
const Product = require('../model/product')

const getItems = async(req, res) => {
    const item = await Items.find({}).populate('categoryId').populate('subCategoryId').populate('productId').populate('brandId')
    res.status(200).json(item)
}

const createItem = async(req, res) => {
    const {name, categoryId, subCategoryId, productId, brandId, sku,
    barcode, createdBy} = req.body
    emptyFields = []
    if(!name){
        emptyFields.push('name')
    }
    if(!categoryId){
        emptyFields.push('categoryId')
    }
    if(!subCategoryId){
        emptyFields.push('subCategoryId')
    }
    if(!productId){
        emptyFields.push('productId')
    }
    if(!brandId){
        emptyFields.push('brandId')
    }
    if(!sku){
        emptyFields.push('sku')
    }
    if(!barcode){
        emptyFields.push('barcode')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'these fields must be filled'})
    }
    try{
        const catData = await Category.findOne({_id: categoryId})
        const subcatData = await SubCategory.findOne({_id: subCategoryId})
        const brandData = await Brand.findOne({_id: brandId})
        const proData = await Product.findOne({_id: productId})
        const item = await Items.create({
            name: name,
            categoryId: catData,
            subCategoryId: subcatData,
            productId: proData,
            brandId: brandData,
            sku: sku,
            barcode: barcode,
            createdBy: createdBy})
        res.status(200).json(item)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const updateItem = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such item'})
    }
    const item = await Items.findOneAndUpdate({_id: id}, {...req.body})
    if(!item){
        return res.status(400).json({error: 'no such item'})
    }
    res.status(200).json(item)
}

const deleteItem = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such item'})
    }
    const item = await Items.findOneAndDelete({_id: id})
    if(!item){
        return res.status(400).json({error: 'no such item'})
    }
    res.status(200).json(item)
}

module.exports = {getItems, createItem, updateItem, deleteItem}