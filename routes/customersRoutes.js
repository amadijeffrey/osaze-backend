const router = require('express').Router()
const {  login, isLoggedIn, forgotPassword, resetPassword, updatePassword } = require('../controllers/userAuthController')
const { getProfile, updateAccount} = require('../controllers/userController')
const {signup} = require('../controllers/customerAuthController')
const { updateBodyProfile, viewOrder, getAllOrdersForCustomer, addProductToCart, 
    updateCartItem, removeCartItem, cartCheckOut, } = require('../controllers/customerController')

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)
router.patch('/updatepassword', isLoggedIn, updatePassword)
router.patch('/updateaccount', isLoggedIn, updateAccount)
router.patch('/updatebodyprofile', isLoggedIn, updateBodyProfile)
router.get('/getProfile', isLoggedIn, getProfile)
router.get('/order/:id', isLoggedIn, viewOrder)
router.get('/orders', isLoggedIn, getAllOrdersForCustomer)
router.post('/cart/add', isLoggedIn, addProductToCart)
router.post('/cart/checkout', isLoggedIn, cartCheckOut )
router.patch('/cart/:id', isLoggedIn, updateCartItem)
router.patch('/cart/:id', isLoggedIn, removeCartItem)

module.exports = router