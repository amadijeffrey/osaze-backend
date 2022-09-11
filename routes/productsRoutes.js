const router = require('express').Router()
const { getFeaturedProducts, getProduct, getProductsUnderCategory,
     searchForProduct } = require('../controllers/productController')

router.get('/featured', getFeaturedProducts)
router.get('/category', getProductsUnderCategory)
router.get('/search', searchForProduct)
router.get('/:id', getProduct)





module.exports = router