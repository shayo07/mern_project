
const Category = require('../model/category')
const mongoose = require('mongoose')

const getCategory = async (req, res) => {
    const category = await Category.find({}).sort({createdAt: -1})
    res.status(200).json(category)
}

const createCategory = async (req, res) => {
    const {name, description, photo, createdBy} = req.body
    let emptyField = []
    let mycode= []
    if(!name){
        emptyField.push('name')
    }
    if(!description){
        emptyField.push('description')
    }
    if(!photo){
        emptyField.push('photo')
    }
    if(emptyField.length > 0){
        return res.status(400).json({error: 'all field must be filled', emptyField})
    }

    let data = await Category.findOne({}, {}, { sort: { $natural: -1}})
    if(!data){
    mycode.push('COOO1')
    }else{
        let {code} = data
        console.log(code)
        let code1 = code.replace(/[^\d.]/g, '')
        let code2 = parseInt(code1)
        let code3 =(code2 + 1).toString().padStart(code1.length, '0')
        let coder = code.replace(code1, code3)
        mycode.push(coder)
        console.log(mycode)
    }
    try{
        console.log(createdBy)
        const category = await Category.create({name, code: mycode[0], description, photo, createdBy})
        res.status(200).json(category)
    }catch(error){
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const updateCategory = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such category1'})
    }
    const category = await Category.findOneAndUpdate({_id: id}, {...req.body})
    if(!category){
        return res.status(400).json({error: 'no such category2'})
    }
    res.status(200).json(category)
}

const deleteCategory = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such category1'})
    }
    const category = await Category.findOneAndDelete({_id: id})
    if(!category){
        return res.status(400).json({error: 'no such category2'})
    }
    res.status(200).json(category)
}

module.exports = {getCategory, createCategory, updateCategory, deleteCategory}