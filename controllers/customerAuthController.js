const User = require('../models/user')
const Address = require('../models/address')
const Customer = require('../models/customer')
const jwt = require('jsonwebtoken')
const {jwtSecretKey, jwtExpiry} = require('../config')




createToken = (id) => {
    return jwt.sign({ id}, jwtSecretKey, { expiresIn: jwtExpiry })
  }
  
const signup = async (req, res) => {
    try{
      const { firstName, lastName, password, email, phone, country, state, houseAddress, city  } = req.body
      if (!firstName || firstName.trim() === '') return res.status(400).json('firstName Needed');
      if (!lastName || lastName.trim() === '') return res.status(400).json('lastName Needed');
      if (!email || email.trim() === '') return res.status(400).json('Email Needed');
      if (!phone || phone.trim() === '') return res.status(400).json('Phone number needed');
  
      const existingUser = await User.findOne({ firstName, lastName })
      if (existingUser) return res.json({ message: 'User with that username already exist' })
  
      const userObject = { firstName, lastName, password, email, phone }
      const user = await User.create(userObject)
  
      const address = await Address.create({
        houseAddress, 
        state,
        city,
        country
      })
  
      const customer = await Customer.create({
        userId: user._id,
        userObject: user,
        address: address
      })
      const token =  createToken(user._id)
  
      res.status(200).json({status: 'success', customer, token})
    }catch(err){
        res.status(500).json({message: 'something went wrong',err: err.name})
    }
}
  
  module.exports = {signup}