const express = require('express')
const {getItems, createItem, updateItem, deleteItem} = require('../controller/itemController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getItems)
router.post('/', createItem)
router.patch('/:id', updateItem)
router.delete('/:id', deleteItem)

module.exports = router
