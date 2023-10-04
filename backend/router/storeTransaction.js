const express = require('express')
const {getStoreTransaction, updateStoreTransaction, deleteStoretransaction}= require('../controller/storeTransactionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getStoreTransaction)

router.patch('/:id', updateStoreTransaction)

router.delete('/:id', deleteStoretransaction)

module.exports = router