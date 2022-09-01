const router = require('express').Router()
const { signup, login, isLoggedIn, forgotPassword, resetPassword, updatePassword } = require('../controllers/userAuthController')
const { updateMe, updateBodyProfile } = require('../controllers/userController')

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)
router.patch('/updatepassword', isLoggedIn, updatePassword)
router.patch('/updateaccount', isLoggedIn, updateMe)
router.patch('/updatebodydata', isLoggedIn, updateBodyProfile)


module.exports = router