const mongoose = require('mongoose')

const designerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userObject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    businessInfo: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'BusinessInfo'
      },
    requests: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
        }
      ]
})

const Designer = mongoose.model('Designer', designerSchema)
module.exports = Designer