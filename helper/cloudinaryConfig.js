const  cloudinary = require('cloudinary').v2
const {cloudName, apiKey, apiSecret} = require('../config')

 cloudinary.config({ 
    cloud_name: cloudName, 
    api_key: apiKey, 
    api_secret: apiSecret,
    secure: true
  });

module.exports = cloudinary