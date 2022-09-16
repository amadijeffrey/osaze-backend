const User = require('../models/user')
const Customer = require('../models/customer')
const Designer = require('../models/designer')
const Address = require('../models/address')

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((objectKey) => {
    if (allowedFields.includes(objectKey)) {
      newObj[objectKey] = obj[objectKey]
    }
  })
  return newObj
}

const getProfile = (req,res) => {
try{
  if(req.user.userObject.role === 'customer'){
    res.status(201).json({status: 'success', user: req.user })
  }
  if(req.user.userObject.role === 'designer'){
    res.status(201).json({status: 'success', user: req.user })
  }
}catch(err){
  res.status(500).json({ message: 'something went wrong'})
}
}

const updateAccount = async (req, res) => {
  try{
  // check if the posted data has password field
  if (req.body.password) return res.status(401).json({ message: 'This is not the password update route.' })

  // filter out the neccesaary data
  const filteredObject = filterObj(req.body, 'firstName','lastName', 'phone', 'email',
                                     'houseAddress', 'country', 'city', 'state' )
  
   // update user
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, filteredObject, { new: true, runValidators: true })

  if(updatedUser.role === 'customer'){
    const updatedCustomer = await Customer.findByIdAndUpdate(req.user._id,
      {userObject: updatedUser},
      {new: true}
      ).populate('userObject').exec()
    res.status(201).json({status: 'success', user: updatedCustomer })
  }

  if(updatedUser.role === 'designer'){
    const updatedDesigner = await Designer.findByIdAndUpdate(req.user._id,
      {userObject: updatedUser},
      {new: true}
      ).populate('userObject').populate('businessInfo').exec()
    res.status(201).json({status: 'success', user: updatedDesigner })
  }
  
  }catch(err){
    res.status(500).json({ message: 'something went wrong'})
  }
}



const deleteUser = (req, res) => {
   
}



module.exports = { updateAccount,  getProfile,}
