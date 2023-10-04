const Item = require('../model/items')
const Store = require('../model/StockSales/store')
const StoreTransaction = require('../model/StockSales/storeTransaction')
const mongoose = require('mongoose')





const getStores = async (req, res) => {
    const store = await Store.find({}).populate('itemId')
    res.status(200).json(store)
}


const createStore = async (req, res) => {
    const {itemId,storeNo, cost, price, quantity, createdBy} = req.body
    const data1 = await Store.findOne({}, {}, { sort: { $natural: -1}})
    const data2 = await StoreTransaction.findOne({}, {}, { sort: { $natural: -1}})
    const computeCode = (data) => {
        let mycode = []
        if(!data){
         mycode.push('SOOO1')
         return mycode[0]
        }else{
            let {storeNo} = data
            let code1 = storeNo.replace(/[^\d.]/g, '')
            let code2 = parseInt(code1)
            let code3 =(code2 + 1).toString().padStart(code1.length, '0')
            let coder = storeNo.replace(code1, code3)
            mycode.push(coder)
            return mycode[0]
        }
    }
    const computeTrans = (data) => {
        let myTrans = []
        if(!data){
        myTrans.push('STOOO1')
         return myTrans[0]
        }else{
            let {transNo} = data
            let code1 = transNo.replace(/[^\d.]/g, '')
            let code2 = parseInt(code1)
            let code3 =(code2 + 1).toString().padStart(code1.length, '0')
            let coder = transNo.replace(code1, code3)
            myTrans.push(coder)
            return myTrans[0]
        }
    }
    const emptyFields = []
    if(!itemId){
        emptyFields.push('itemId')
    }
    if(!cost){
        emptyFields.push('cost')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(!quantity){
        emptyFields.push('quantity')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'all field must be filled', emptyFields})
    }
    const itemData = await Item.findOne({_id: itemId})
    try{
        const store = new Store({
            itemId: itemData,
            storeNo: computeCode(data1), 
            cost: cost,
            price: price,
            markup: price - cost,
            quantity: quantity,
            status: 'Active',
            createdBy: createdBy})
        const storeTrans = new StoreTransaction({
            itemId: itemData,
            storeId: store,
            transType: 'IN',
            transNo: await computeTrans(data2), 
            cost: cost,
            price: price,
            markup: price - cost,
            quantity: quantity,
            totalCost: quantity * cost,
            status: 'Active',
            createdBy: createdBy
        })
        await store.save()
        await storeTrans.save()
        res.status(200).json(store)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

const updateStore = async (req, res) => {
    const {id} = req.params
    const {itemId, price, cost, quantity, createdBy} = req.body
    const data2 = await StoreTransaction.findOne({}, {}, { sort: { $natural: -1}})
    const computeTrans = (data) => {
        let myTrans = []
        if(!data){
        myTrans.push('STOOO1')
         return myTrans[0]
        }else{
            let {transNo} = data
            let code1 = transNo.replace(/[^\d.]/g, '')
            let code2 = parseInt(code1)
            let code3 =(code2 + 1).toString().padStart(code1.length, '0')
            let coder = transNo.replace(code1, code3)
            myTrans.push(coder)
            return myTrans[0]
        }
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'store does not exist'})
    }
    const storeInfo = await Store.findOne({_id: id})
    const itemData = await Item.findOne({_id: itemId})
    try{
        const storeTrans = new StoreTransaction({
            itemId: itemData,
                storeId: storeInfo,
                transType: 'IN',
                transNo: await computeTrans(data2), 
                cost: cost,
                price: price,
                markup: price - cost,
                quantity: quantity,
                totalCost: quantity * cost,
                status: 'Active',
                createdBy: createdBy
        })
            storeTrans.save()
    }catch(error){
        return res.status(400).json({error: error.message})
    }
    const store =await Store.findOneAndUpdate({_id: id}, {
        price: price,
        cost: cost,
        quantity : (parseInt(storeInfo.quantity) - (quantity * -1)),
        markup: price - cost
    })
    if(!store){
        return res.status(400).json({error: 'no such store'})
    }
    res.status(200).json(store)
    console.log('done')
}


const issue = async (req, res) => {
    const {id} = req.params
    const {itemId, price, cost, quantity, updatedBy} = req.body
    const data2 = await StoreTransaction.findOne({}, {}, { sort: { $natural: -1}})
    const computeTrans = (data) => {
        let myTrans = []
        if(!data){
        myTrans.push('STOOO1')
         return myTrans[0]
        }else{
            let {transNo} = data
            let code1 = transNo.replace(/[^\d.]/g, '')
            let code2 = parseInt(code1)
            let code3 =(code2 + 1).toString().padStart(code1.length, '0')
            let coder = transNo.replace(code1, code3)
            myTrans.push(coder)
            return myTrans[0]
        }
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'store does not exist'})
    }
    const storeInfo = await Store.findOne({_id: id})
    const itemData = await Item.findOne({_id: itemId})
    if(storeInfo.quantity < quantity){
        return res.status(400).json('you can not issue more than what you have')
    }
    try{
        const storeTrans = new StoreTransaction({
            itemId: itemData,
                storeId: storeInfo,
                transType: 'OUT',
                transNo: await computeTrans(data2), 
                cost: cost,
                price: price,
                markup: price - cost,
                quantity: quantity,
                totalCost: quantity * cost,
                status: 'Active',
                createdBy: updatedBy
        })
            storeTrans.save()
    }catch(error){
        return res.status(400).json({error: error.message})
    }
    const store =await Store.findOneAndUpdate({_id: id}, {
        quantity : (storeInfo.quantity - quantity),
        updatedBy: updatedBy
    })
    await Item.findOneAndUpdate({_id: itemData._id}, {
        price: price,
        cost: cost,
        quantity: itemData.quantity - (quantity * -1),
        available: itemData.available - (quantity * -1),
    })
    if(!store){
        return res.status(400).json({error: 'no such store'})
    }
    res.status(200).json(store)
}

const deleteStore = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such store'})
    }
    const store = await Store.findOneAndDelete({_id: id})
    if(!store){
        return res.status(400).json({error: 'no such store'})
    }
    res.status(200).json(store)
}

module.exports = {getStores, createStore, updateStore, issue, deleteStore}

