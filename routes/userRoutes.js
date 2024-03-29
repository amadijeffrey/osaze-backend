const router = require('express').Router()
const {  login, isLoggedIn, forgotPassword, resetPassword, updatePassword } = require('../controllers/userAuthController')
const { getProfile, updateMe, updateBodyProfile, viewOrder, getAllOrders} = require('../controllers/userController')
const {signup} = require('../controllers/customerAuthController')

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)
router.patch('/updatepassword', isLoggedIn, updatePassword)
router.patch('/updateaccount', isLoggedIn, updateMe)
router.patch('/updatebodydata', isLoggedIn, updateBodyProfile)
router.get('/getProfile', isLoggedIn, getProfile)
router.get('/order/:id', isLoggedIn, viewOrder)
router.get('/orders/', isLoggedIn, getAllOrders)


module.exports = router