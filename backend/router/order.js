const express = require('express')
const {cashout, getOrder, updateOrder, deleteOrder} = require('../controller/orderController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', cashout)
router.post('/', getOrder)
router.patch('/:id', updateOrder)
router.delete('/:id', deleteOrder)

module.exports = router
