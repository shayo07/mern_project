const Brand = require('../model/brand')
const mongoose = require('mongoose')
// get brand
const getBrand = async (req, res) => {
    const brand = await Brand.find({}).sort({createdBy: -1}) 
    res.status(200).json(brand)
}


// create brand
const createBrand = async (req, res) => {
    const {name, description, photo, createdBy} = req.body
    let emptyFields = []
    if(!name){
        emptyFields.push('name')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!photo){
        emptyFields.push('photo')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "please fill all th fields", emptyFields})
    }
    try{
        const brand = await Brand.create({name, description, photo, createdBy })
        console.log('success')
        res.status(200).json(brand)
    }catch(error){
        console.log('not ')
        res.status(400).json({error: error.message})
    }
    
}

//update brand
const updateBrand = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such brand1'})
    }
    const brand = await Brand.findOneAndUpdate({_id: id}, { ...req.body})
    if(!brand){
        return res.status(400).json({error: 'no such brand2'})
    }

    res.status(200).json(brand)
}

//delete Brand
const deleteBrand = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such brand'})
    }

    const brand = await Brand.findByIdAndDelete({_id: id})
    if(!brand){
        return res.status(400).json({error: 'no such brand'})
    }
    res.status(200).json(brand)
}

module.exports = {getBrand, createBrand, updateBrand, deleteBrand}