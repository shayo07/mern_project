const express = require('express')
const {getStores, createStore, updateStore, issue, deleteStore} = require('../controller/storeController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getStores)

router.post('/', createStore)

router.patch('/:id', updateStore)
router.post('/issue/:id', issue)

router.delete('/:id', deleteStore)

module.exports = router