const User = require('../models/user')
const Address = require('../models/address')
const Customer = require('../models/customer')
const jwt = require('jsonwebtoken')
const {jwtSecretKey, jwtExpiry} = require('../config')

const createToken = (id) => {
    return jwt.sign({ id}, jwtSecretKey, { expiresIn: jwtExpiry })
  }
  
const signup = async (req, res) => {
    try{
      const { firstName, lastName, password, email, phoneNumber, country, state, houseAddress, city  } = req.body
      if (!firstName || firstName.trim() === '') return res.status(400).json('firstName Needed');
      if (!lastName || lastName.trim() === '') return res.status(400).json('lastName Needed');
      if (!email || email.trim() === '') return res.status(400).json('Email Needed');
      if (!phoneNumber || phoneNumber.trim() === '') return res.status(400).json('phoneNumber  needed');
      if (!state || state.trim() === '') return res.status(400).json('state needed');
      if (!city || city.trim() === '') return res.status(400).json('city needed');
      if (!country || country.trim() === '') return res.status(400).json('country needed');
      if (!houseAddress || houseAddress.trim() === '') return res.status(400).json('houseAddress needed');
  
      const existingUser = await User.findOne({ firstName, lastName, email })
      if (existingUser) return res.json({ message: 'User already exist' })
  
      const userObject = { firstName, lastName, password, email, phoneNumber, houseAddress, state,  city, country }
      const user = await User.create(userObject)
  
      const bodyProfile = new BodyProfile()
      const customer = await Customer.create({
        userId: user._id,
        userObject: user,
        bodyProfile
      })

      const token =  createToken(user._id)
  
      res.status(200).json({status: 'success', user: customer, token})
    }catch(err){
      if(err.name === 'MongoServerError' )return res.status(401).json({ message: 'use a different email.', err })
        res.status(500).json({message: 'something went wrong'})
    }
}
  
class BodyProfile{
  constructor(){
    this.bust = 0
    this.shoulderLength = 0
    this.frontWaistLength = 0
    this.backWaistLength = 0
    this.armLength = 0
    this.waist = 0
    this.hip = 0
    this.hipDip = 0
    this.thigh = 0
    this.ankle = 0
    this.inseam = 0
    this.outseam = 0
    this.crotchDepth = 0
  }
}
  module.exports = {signup}