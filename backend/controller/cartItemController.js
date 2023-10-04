const CartItem = require('../model/StockSales/cartItem')
const Cart = require('../model/StockSales/cart')
const Item = require('../model/items')
const mongoose = require('mongoose')


const getCartItem = async (req, res) => {
    const cartitem = await CartItem.find({deletedBy: null}).populate('itemId').populate('cartId')
    res.status(200).json(cartitem)
}

const search = async (req, res) => {
    const item = await Item.find({})
    res.status(200).json(item)
}

const createCartItem = async (req, res) => {
    const cartData = await Cart.findOne({deletedBy: null})
    const {itemId, quantity} = req.body
    if(!cartData){
        const {customerId} = req.body
        const emptyFields = []
        const mycode = []
        if(!customerId){
            emptyFields.push('customer')
        }
        if(emptyFields.length > 0){
            return res.status(400).json({error: 'all field must be filled', emptyFields})
        }

        let data = await Cart.findOne({}, {}, { sort: { $natural: -1}})
        if(!data){
        mycode.push('CR00001')
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
            const cart = new Cart({
                customerId: customerId,
                cartNo: mycode[0],
                createdBy: createdBy})
            await cart.save()
            res.status(200).json(cart)
        }catch(error){
            console.log(error)
            res.status(400).json({error: error.message})
        }
    }else{
        const emptyFields = []
        if(!itemId){
            emptyFields.push('itemId')
        }
        if(!quantity){
            emptyFields.push('quantity')
        }
        if(emptyFields.length > 0){
            return res.status(400).json({error: 'all field must be filled', emptyFields})
        }
        const itemData = await Item.findOne({_id: itemId})
        try{
            const cartItem = new CartItem({
                itemId: itemData,
                cartId: cartData, 
                unitCost: itemData.cost,
                unitPrice: itemData.price,
                markup: itemData.cost - itemData.price,
                quantity: quantity,
                totalPrice: itemData.cost * quantity,
                discount: itemData.discount,
                netPrice: (itemData.price * quantity) - (itemData.discount * quantity),
                createdBy: createdBy})
            await cartItem.save()
            const cart = await Cart.findOneAndUpdate({_id: cartData._id}, {
                gross: cartData.gross + cartItem.netPrice,
                net: (cartData.gross + cartItem.netPrice) - (cartData.promo + cartData.discount)
            })
            res.status(200).json(store)
        }catch(error){
            console.log(error)
            res.status(400).json({error: error.message})
        }
    }
    

}

const updateCartItem = async (req, res) => {
    const {id} = req.params
    const {quantity, unitPrice, discount} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'cartItem does not exist'})
    }
    const cartItem =await CartItem.findOneAndUpdate({_id: id}, {
        quantity: quantity,
        totalPrice: quantity * unitPrice,
        netPrice: (unitPrice * quantity) - (discount * quantity),
    })
    const cartData = await Cart.findOne({deletedBy: null})
    const grossValue = cartData.gross + (cartItem.netPrice -((unitPrice * quantity) - (discount * quantity)))
    const cart = await Cart.findOneAndUpdate({_id: cartData._id}, {
        gross: grossValue,
        net: (cartItem.netPrice -((unitPrice * quantity) - (discount * quantity)))  + cartData.net
    })
    if(!cart){
        return res.status(400).json({error: 'no such Cart'})
    }
    res.status(200).json(store)
}

const deleteCartItem = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such CartItem'})
    }
    const cartData = await Cart.findOne({deletedBy: null})
    const cartItemToRemove = await CartItem.findOne({_id:id})
    const updateCart = await Cart.findOneAndUpdate({_id: cartData._id}, {
        gross: cartData.gross - cartItemToRemove.netPrice,
        net: cartData.net - cartItemToRemove.netPrice
    })
    const store = await CartItem.findOneAndDelete({_id: id})
    if(!store){
        return res.status(400).json({error: 'no such store'})
    }
    res.status(200).json(store)
}

module.exports = {getCartItem, search, createCartItem, updateCartItem, deleteCartItem}

