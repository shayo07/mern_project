const express = require('express')
const {getOrderItem} = require('../controller/orderItemController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getOrderItem)

module.exports = router
