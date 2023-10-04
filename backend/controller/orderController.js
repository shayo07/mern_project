const Cart = require('../model/StockSales/cart')
const Order = require('../model/StockSales/order')
const CartItem = require('../model/StockSales/cartItem')
const OrderItem = require('../model/StockSales/orderItem')
const mongoose = require('mongoose')
const orderItem = require('../model/StockSales/orderItem')


//cashout cart
const cashout = async (req, res) => {
    try{
        const cart = await Cart.findOne({deletedBy: null})
    const order = new Order({
        customerId: cart.customerId,
        orderNo: 'odr',
        subTotal: cart.gross,
        itemDiscount: cart.discount,
        tax: 0,
        shipping: 0,
        total: cart.net,
        promo: 0,
        discount: 0,
        grandTotal: cart.net,
        paid: 0,
        balance: cart.net,
        status: 'UNPAID'
    })
    await order.save()
    const cartItem = await CartItem.find({deletedBy: null})
    for (let index = 0; index < cartItem.length; index++) {
        const orderItem = new OrderItem({
            orderId: order._id,
            itemId: cartItem[index].itemId,
            unitCost: cartItem[index].unitCost,
            unitPrice: cartItem[index].unitPrice,
            quantity: cartItem[index].quantity,
            totalPrice: cartItem[index].totalPrice,
            discount: cartItem[index].discount,
            netPrice: cartItem[index].netPrice,
            markup:  cartItem[index].markup,
            totalMarkup: cartItem[index].markup * cartItem.quantity,
            status: cartItem[index].status
        })
        orderItem.save()
    }

    const cart1 = await Cart.findOneAndUpdate({deletedBy: null}, {deletedBy: 1})
    const cartItem1 = await CartItem.findOneAndUpdate({deletedBy: null}, {
        deletedBy: 1
    })
    res.status(200).json(cart1)
    res.status(200).json(cartItem1)

    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}



const getOrder = async (req, res) => {
    const order = await Order.find({}).sort({createdBy: -1}) 
    res.status(200).json(order)
}



//update brand
const updateOrder = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such order'})
    }
    const order = await Order.findOneAndUpdate({_id: id}, { ...req.body})
    if(!order){
        return res.status(400).json({error: 'no such order'})
    }
    res.status(200).json(order)
}

//delete Brand
const deleteOrder = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such order'})
    }

    const order = await Order.findByIdAndDelete({_id: id})
    if(!order){
        return res.status(400).json({error: 'no such order'})
    }
    res.status(200).json(order)
}

module.exports = {cashout, getOrder, updateOrder, deleteOrder}