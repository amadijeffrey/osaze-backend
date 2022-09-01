const router = require('express').Router()
const { login, forgotPassword, resetPassword, updatePassword } = require('../controllers/userAuthController')
const { isDesigner, signup} = require('../controllers/designerAuthController.js')
const { updateMe } = require('../controllers/userController')
const {createProduct} = require('../controllers/designerController')
const upload  = require('../helper/multer')


router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)
router.patch('/updatepassword', isDesigner, updatePassword)
router.patch('/updateaccount', isDesigner, updateMe)
router.post('/createproduct', isDesigner, upload.single('image'), createProduct)

module.exports = router
