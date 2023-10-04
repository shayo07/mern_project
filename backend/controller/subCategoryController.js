const SubCategory = require('../model/subCategory')
const Category = require('../model/category')
const mongoose = require('mongoose')

const getSubCategory = async (req, res) => {
    const subCategory = await SubCategory.find({}).populate('categoryId')
    res.status(200).json(subCategory)
}


const createSubCategory = async (req, res) => {
    const {name, categoryId, description, photo, createdBy} = req.body
    const emptyFields = []
    if(!name){
        emptyFields.push('name')
    }
    if(!categoryId){
        emptyFields.push('categoryId')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!photo){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'all field must be filled', emptyFields})
    }
    const catData = await Category.findOne({_id: categoryId})
    try{
        const subCategory = new SubCategory({
            name: name,
            categoryId: catData, 
            description: description,
            photo: photo,
            createdBy: createdBy})
        await subCategory.save()
        res.status(200).json(subCategory)
    }catch(error){
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const updateSubCategory = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'subcategory does not exist'})
    }
    const subcategory =await SubCategory.findOneAndUpdate({_id: id}, {...req.body})
    if(!subcategory){
        return res.status(400).json({error: 'no such subCategory'})
    }
    res.status(200).json({})
}

const deleteSubCategory = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such subCategory'})
    }
    const subCategory = await SubCategory.findOneAndDelete({_id: id})
    if(!subCategory){
        return res.status(400).json({error: 'no such subCategory'})
    }
    res.status(200).json(subCategory)
}

module.exports = {getSubCategory, createSubCategory, updateSubCategory, deleteSubCategory}

