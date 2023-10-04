const express = require('express')
const {getBrand, createBrand, updateBrand, deleteBrand} = require('../controller/brandController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/', getBrand)

router.post('/', createBrand)

router.patch('/:id', updateBrand)

router.delete('/:id', deleteBrand)

module.exports = router