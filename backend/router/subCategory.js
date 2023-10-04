const {getSubCategory ,createSubCategory, updateSubCategory, deleteSubCategory} = require('../controller/subCategoryController')
const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getSubCategory)
router.post('/', createSubCategory)
router.patch('/:id', updateSubCategory)
router.delete('/:id', deleteSubCategory)

module.exports = router