const User = require('../models/user')
const Customer = require('../models/customer')
const Designer = require('../models/designer')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
// const sendEmail = require('../utils/email')
const crypto = require('crypto')
const {jwtSecretKey, jwtExpiry} = require('../config')


const createToken = (id) => {
  return jwt.sign({ id}, jwtSecretKey, { expiresIn: jwtExpiry })
}

const login = async (req, res) => {
  try{
      const { email, password } = req.body

      // check if user exist
      if (!email || !password) return res.status(400).json('Please provide email and password')
      const foundUser = await User.findOne({ email })

      // check if password is correct
      if (!foundUser || !await foundUser.correctPassword(password, foundUser.password)) {
        return res.status(401).json({ message: 'Incorrect username or password' })
      }

      const token =  createToken(foundUser._id)

      if (foundUser.role === 'customer'){
        const customer = await Customer.findOne({userId: foundUser._id}).populate('userObject')
        .populate('cart').populate('orders').exec()
        
        res.status(200).json({status: 'success', user: customer, token})
      }

      if(foundUser.role === 'designer'){
        const designer = await Designer.findOne({userId: foundUser._id}).populate('userObject')
        .populate('requests').populate('businessInfo').exec()
      
        res.status(200).json({status: 'success', user: designer, token})
      }
  }catch(err){
    res.status(500).json({ message: 'something went wrong' })
  }
}

const isLoggedIn = async (req, res, next) => {
  try {
    // check if token exist
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) return res.status(401).json({ message: 'You are not logged in. Login to get access' })

    // check if token is valid
    const decoded = await promisify(jwt.verify)(token, jwtSecretKey)
    // check if user exist
    const foundUser = await User.findById(decoded.id)
    if (!foundUser) return res.status(401).json({ message: 'User with this token does not exist. Please log in again' })

    // check if user password has been changed
    if (foundUser.changedPasswordAfter(decoded.iat)) return res.status(401).json({ message: 'User recently changed password. Please login again' })

    // set different users
    if(foundUser.role === 'customer'){
      const customer = await Customer.findOne({userId: foundUser._id}).populate('userObject')
      .populate('cart').populate('orders').exec()
      if(!customer) return res.status(401).json({ message: 'this customer account does not exist' })
      req.user = customer
      next()
    }
    if(foundUser.role === 'designer'){
      const designer = await Designer.findOne({userId: foundUser._id}).populate('userObject').populate('businessInfo')
      .populate('requests').exec()
      if(!designer) return res.status(401).json({ message: 'this designer account does not exist' })
      req.user = designer
      next()
    }
    // if(foundUser.role === 'employee'){
    //   const designer = Designer.findOne({userId: foundUser._id})
    //   if(!designer) return res.status(401).json({ message: 'this designer account does not exist' })
    //   req.user = designer
    //   next()
    // }
    // if(foundUser.role === 'designer'){
    //   const designer = Designer.findOne({userId: foundUser._id})
    //   if(!designer) return res.status(401).json({ message: 'this designer account does not exist' })
    //   req.user = designer
    //   next()
    // }
    
  } catch (err) {
    if(err.name === 'TokenExpiredError' )return res.status(400).json({ message: 'Please login' })
    if(err.name === 'JsonWebTokenError' )return res.status(400).json({ message: 'Please login' })
    res.status(500).json({ message: 'something went wrong' })
    }
}


const forgotPassword = async (req, res) => {
  // check if user exist
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(404).json({ message: 'User with that email doesnt exist.' })

  // generate a random token
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  const resetUrl = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`

  const message = `Forgot your password? Send a patch request with your new password to the url 
  included in this mail: ${resetUrl}. \n If you didnt forget your password, please ignore this mail. `

  // send token to email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token(valid for 10 mins)',
      message
    })

    res.status(200).json({
      status: 'success',
      message: 'Token sent succesfully'
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    res.status(500).json({ message: err })
  }
}

const resetPassword = async (req, res) => {
  // get user based on token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetTokenExpires: { $gt: Date.now() } })

  // if user exist and token has not expired,set new password
  if (!user) return res.status(400).json({ message: 'invalid token or token has expired' })
  user.password = req.body.password
  user.passwordResetToken = undefined
  user.passwordResetTokenExpires = undefined
  await user.save()

  // login user, send JWT
  const token = createToken(user, res)
}

const updatePassword = async (req, res) => {
  try{
  // get user from collection
  const foundUser = await User.findById(req.user.userId)
  if (!foundUser) return res.status(404).json({ message: 'User not found. Please log in again' })

  // check if posted password is correct
  const candidatePassword = req.body.currentPassword
  const correctPassword = await foundUser.correctPassword(candidatePassword, foundUser.password)
  if (!correctPassword) return res.status(401).json({ message: 'Incorrect password. You are not the current loggedin user' })

  // set new password
  foundUser.password = req.body.newPassword
  await foundUser.save()

  // login user, send JWT
  const token =  createToken(foundUser._id)
  res.status(201).json({status: 'success', foundUser, token})

  }catch(err){
    res.status(500).json({ message: 'something went wrong' })
  }
}

module.exports = { login, isLoggedIn, forgotPassword, resetPassword, updatePassword }
