const Cart = require('../model/StockSales/cart')
const mongoose = require('mongoose')

const getCart = async (req, res) => {
    const cart = await Cart.find({}).populate('customerId')
    res.status(200).json(cart)
}



module.exports = {getCart}

