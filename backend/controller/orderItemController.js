const OrderItem = require('../model/StockSales/orderItem')
const mongoose = require('mongoose')

const getOrderItem = async (req, res) => {
    const orderItem = await OrderItem.find({}).populate('customerId')
    res.status(200).json(orderItem)
}



module.exports = {getOrderItem}

