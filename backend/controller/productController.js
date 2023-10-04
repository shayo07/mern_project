const Products = require('../model/product')
const Brand =require('../model/brand')
const Category = require('../model/category')
const SubCategory = require('../model/subCategory')
const mongoose = require('mongoose')

const getProduct = async(req, res) => {
    const product = await Products.find({}).populate('categoryId').populate('brandId').populate('subCategoryId')
    res.status(200).json(product)
}

const createProduct = async(req, res) => {
    const {name, categoryId, subCategoryId, brandId, description, createdBy} = req.body
    const emptyFields = []
    if(!name){
        emptyFields.push('name')
    }
    if(!categoryId){
        emptyFields.push('categoryId')
    }
    if(!subCategoryId){
        emptyFields.push('subCategoryId')
    }
    if(!brandId){
        emptyFields.push('brandId')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'all fields are required', emptyFields})
    }
    
    try{
    const brandData = await Brand.findOne({_id: brandId})
    const catData = await Category.findOne({_id: categoryId})
    const subcatData = await SubCategory.findOne({_id: subCategoryId}) 

    const products = new Products({
        name: name,
        categoryId: catData,
        subCategoryId: subcatData,
        brandId: brandData,
        description: description,
        createdBy: createdBy})
        products.save()
    res.status(200).json(products)
    }catch(error){
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such product'})
    }
    const product = await Products.findOneAndUpdate({_id: id}, {...req.body})
    if(!product){
        return res.status(400).json({error: 'no such product'})
    }
    res.status(200).json(product)
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such product'})
    }
    const product = await Products.findOneAndDelete({_id: id})
    if(!product){
        return res.status(400).json({error: 'no such product'})
    }
    res.status(200).json(product)
}

module.exports = {getProduct, createProduct, updateProduct, deleteProduct}