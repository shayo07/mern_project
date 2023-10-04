const {getCategory, createCategory, updateCategory, deleteCategory} = require('../controller/categoryController')
const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getCategory)
router.post('/', createCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router