const express = require('express')
const {getCart} = require('../controller/cartController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getCart)

module.exports = router
