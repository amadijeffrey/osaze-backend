const User = require('../models/user')
const Address = require('../models/address')
const Designer = require('../models/designer')
const jwt = require('jsonwebtoken')
const {jwtSecretKey, jwtExpiry} = require('../config')
const  cloudinary  = require('../helper/cloudinaryConfig')

const createToken = (id) => {
  return jwt.sign({ id}, jwtSecretKey, { expiresIn: jwtExpiry })
}


 const signup = async (req, res) => {
  try{
      const { firstName, lastName, password, email, phoneNumber, houseAddress,
      state, city, country,  brandName, brandInfo, brandLocation, sketch, 
      sew, businessPage, sketchSkill, sewSkill } = req.body

      if (!firstName || firstName.trim() === '') return res.status(400).json('firstName Needed');
      if (!lastName || lastName.trim() === '') return res.status(400).json('lastName Needed');
      if (!email || email.trim() === '') return res.status(400).json('Email Needed');
      if (!phoneNumber || phoneNumber.trim() === '') return res.status(400).json('phoneNumber  needed');
      if (!brandName || brandName === '') return res.status(400).json('brandName needed');
      if (!brandInfo || brandInfo === '') return res.status(400).json('brandInfo needed');
      if (!state || state === '') return res.status(400).json('state needed');
      if (!city || city === '') return res.status(400).json('city needed');
      if (!country || country === '') return res.status(400).json('country needed');
      if (!houseAddress || houseAddress === '') return res.status(400).json('houseAddress needed');
      if (!brandLocation || brandLocation === '') return res.status(400).json('brand location needed');


      const existingUser = await User.findOne({ firstName, lastName, email })
      if (existingUser) return res.json({ message: 'User already exist' })

      const userObject = { firstName, lastName, password, email, phoneNumber, role: 'designer' }
      const user = await User.create(userObject)

      const address = await Address.create({
        houseAddress, 
        state,
        city,
        country
      })
  
      let url 
      if(req.file){
       const data =  await cloudinary.uploader.upload(req.file.path)
       url = data.url
      }else{
        url = ''
      }

     const businessInfo =  {
        brandName,
        brandInfo,
        brandLocation,
        sketch,
        sew,
        businessPage,
        sketchSkill,
        sewSkill,
        imgUrl: url
      }
   
      const designer = await Designer.create({
        userId: user._id,
        userObject: user,
        address: address,
        businessInfo
      })

      const token =  createToken(user._id)
  
      res.status(200).json({status: 'success', user: designer, token})

    }catch(err){
      if(err.name === 'MongoServerError' )return res.status(401).json({ message: 'use a different email.' })
      res.status(500).json({ message: 'something went wrong' })

    }
  }

  module.exports = {signup}