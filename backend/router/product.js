const {getProduct, createProduct, updateProduct, deleteProduct} = require('../controller/productController')
const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getProduct)
router.post('/', createProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router