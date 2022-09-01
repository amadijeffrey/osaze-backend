const User = require('../models/user')

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((objectKey) => {
    if (allowedFields.includes(objectKey)) {
      newObj[objectKey] = obj.objectKey
    }
  })
  return newObj
}


const updateMe = async (req, res) => {
  try{
  // check if the posted data has password field
  if (req.body.password) return res.status(401).json({ message: 'This is not for password update' })

  // filter out the neccesaary data
  const filteredObject = filterObj(req.body, 'firstName','lastName', 'phone', 'email')

  // update user
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObject, { new: true, runValidators: true })

  res.status(201).json({ updatedUser })
  }catch(err){
    res.status(500).json({ message: 'something went wrong'})

  }
}

const updateBodyProfile =  async (req, res) => {
 try{
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true })
  res.status(201).json({ updatedUser })

 }catch(err){
  res.status(500).json({ message: 'something went wrong'})
 }
}
module.exports = { updateMe, updateBodyProfile }
