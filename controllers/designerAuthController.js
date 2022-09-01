const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const {jwtSecretKey, jwtExpiry} = require('../config')


const signToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiry })
}

const createSendToken = (user, res) => {
  const token = signToken(user._id)

  res.status(201).json({ user, token })
}
 const isDesigner = async (req, res, next) => {
    try {
      // check if token exist
      let token
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
      }
      if (!token) return res.status(401).json({ message: 'You are not logged in. Login to get access' })
  
      // check if token is valid
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
      // check if user exist
      const foundUser = await User.findById(decoded.id)
      if (!foundUser) return res.status(401).json({ message: 'User with this token does not exist. Please log in again' })
  
      // check if user password has been changed
      if (foundUser.changedPasswordAfter(decoded.iat)) return res.status(401).json({ message: 'User recenly changed password. Please login again' })
      if (foundUser.role !== 'designer') return res.status(401).json({message: 'You dont have right permissions'})
  
      // grant access to user
      req.user = foundUser
      next()
    } catch (err) {
      if(err.name === 'TokenExpiredError' )return res.status(401).json({ message: 'Please login' })
      if(err.name === 'JsonWebTokenError' )return res.status(401).json({ message: 'Please login' })
      res.status(500).json({ message: 'something went wrong' })
    }
  }

 const signup = async (req, res) => {
    try{
      const { firstName, lastName, password, email, phone, brand, about, address, clothTypes} = req.body
      if (!firstName || firstName.trim() === '') return res.status(400).json('firstName Needed');
      if (!lastName || lastName.trim() === '') return res.status(400).json('lastName Needed');
      if (!email || email.trim() === '') return res.status(400).json('Email Needed');
      if (!phone || phone.trim() === '') return res.status(400).json('Phone number needed');
      if (!brand || brand === '') return res.status(400).json('brand needed');
      if (!about || about === '') return res.status(400).json('about needed');
      if (!address || address === '') return res.status(400).json('address needed');
      if (!clothTypes || clothTypes === '') return res.status(400).json('cloth types needed');

  
      const existingUser = await User.findOne({ firstName, lastName })
      if (existingUser) return res.json({ message: 'User with that username already exist' })
  
      const businessInfo = {brand, about, address, clothTypes}
      const userObject = { firstName, lastName, password, email, phone, role: 'designer', business_info: businessInfo }
      const user = await User.create(userObject)

  
      // login user, send jwt
      createSendToken(user, res)
    }catch(err){
      res.status(500).json({ message: 'something went wrong', err })

    }
  }

  module.exports = { isDesigner, signup}