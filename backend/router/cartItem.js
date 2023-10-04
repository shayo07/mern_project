const express = require('express')
const {getCartItem, search, createCartItem, updateCartItem, deleteCartItem} = require('../controller/cartItemController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getCartItem)
router.get('/search/:toSearch', search)
router.post('/', createCartItem)
router.patch('/:id', updateCartItem)
router.delete('/:id', deleteCartItem)

module.exports = router
