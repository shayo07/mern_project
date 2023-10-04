const Store = require('../model/StockSales/store')
const Item = require('../model/items')
const StoreTransaction = require('../model/StockSales/storeTransaction')
const mongoose = require('mongoose')

const getStoreTransaction = async (req, res) => {
    const storeTrans = await StoreTransaction.find({}).populate('itemId').populate('storeId')
    res.status(200).json(storeTrans)
}



const updateStoreTransaction = async (req, res) => {
    const {id} = req.params
    const {price, cost, quantity, updatedBy} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'storeTransaction does not exist'})
    }
    const transInfo = await StoreTransaction.findOne({_id: id})
    const storeInfo = await Store.findOne({_id: transInfo.storeId})
    if(transInfo.transType == 'IN'){
        const diff = (transInfo.quantity - quantity) * -1
        if(((storeInfo.quantity - (diff * -1)) <= 0) && (quantity < transInfo.quantity)){
            return res.status(400).json({error: 'that is bellow store'})
        }
        const storeTrans =await StoreTransaction.findOneAndUpdate({_id: id}, {
            price: price,
            cost: cost,
            quantity: (transInfo.quantity - (diff * -1)),
            totalCost: (transInfo.cost * (transInfo.quantity - (diff * -1)))
        })
        const store = await Store.findOneAndUpdate({_id: transInfo.storeId}, {
            quantity: (storeInfo.quantity - (diff * -1))
        })
        if(!storeTrans){
            return res.status(400).json({error: 'no such storeTransaction'})
        }
        res.status(200).json(storeTrans)

    }else{
        const diff = (transInfo.quantity - quantity) * -1
        if(((storeInfo.quantity - diff) <= 0) && (transInfo.quantity < quantity)){
            return res.status(400).json({error: 'that is bellow store'})
        }
        const storeTrans =await StoreTransaction.findOneAndUpdate({_id: id}, {
            price: price,
            cost: cost,
            quantity: (transInfo.quantity - (diff * -1)),
            totalCost: (transInfo.cost * (transInfo.quantity - (diff * -1)))
        })
        const store = await Store.findOneAndUpdate({_id: transInfo.storeId}, {
            quantity: (storeInfo.quantity - (diff))
        })
        const item = await Item.findOneAndUpdate({_id: transInfo.itemId}, {
            quantity: (transInfo.quantity - (diff * -1)),
            available: (transInfo.quantity - (diff * -1))
        })
        if(!storeTrans){
            return res.status(400).json({error: 'no such storeTransaction'})
        }
        res.status(200).json(storeTrans)

    }
    
}

const deleteStoretransaction = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such storeTransaction'})
    }
    const transInfo = await StoreTransaction.findOne({_id: id})
    const storeInfo = await Store.findOne({_id: transInfo.storeId})
    if(transInfo.transType === 'IN'){
        const store = await Store.findOneAndUpdate({_id: transInfo.storeId}, {
            quantity: storeInfo.quantity - transInfo.quantity
        })
        const storeTrans = await StoreTransaction.findOneAndDelete({_id: id})
        if(!storeTrans){
            return res.status(400).json({error: 'no such storeTransaction'})
        }
        res.status(200).json(storeTrans)
    }else{
        const store = await Store.findOneAndUpdate({_id: transInfo.storeId}, {
            quantity: storeInfo.quantity - (transInfo.quantity * -1)
        })
        const storeTrans = await StoreTransaction.findOneAndDelete({_id: id})
        if(!storeTrans){
            return res.status(400).json({error: 'no such storeTransaction'})
        }
        res.status(200).json(storeTrans)
        }
    

    
}

module.exports = {getStoreTransaction, updateStoreTransaction, deleteStoretransaction}

