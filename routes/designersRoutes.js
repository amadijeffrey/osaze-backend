const router = require('express').Router()
const { isLoggedIn, login, forgotPassword, resetPassword, updatePassword } = require('../controllers/userAuthController')
const { signup} = require('../controllers/designerAuthController.js')
const { updateAccount, getProfile, updateAddress } = require('../controllers/userController')
const {createProduct, updateBusinessInfo, getAllRequests} = require('../controllers/designerController')
const upload  = require('../helper/multer')


router.post('/signup', upload.single('image'), signup)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)
router.patch('/updatepassword', isLoggedIn, updatePassword)
router.patch('/updateaddress', isLoggedIn, updateAddress)
router.get('/getProfile', isLoggedIn, getProfile)
router.patch('/updateaccount', isLoggedIn, updateAccount)
router.patch('/updatebusinessinfo', isLoggedIn, updateBusinessInfo)
router.post('/createproduct', isLoggedIn, upload.single('image'), createProduct)
router.get('/requests', isLoggedIn, getAllRequests)

module.exports = router
