const router = require('express').Router()
const { model } = require('mongoose')
const productCtrl = require('../controllers/productCtrl')

//-----------2-------------

router.get('/products', productCtrl.getProducts)
router.patch('/products/:id', productCtrl.reviews)



module.exports = router