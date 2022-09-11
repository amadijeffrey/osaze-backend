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
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    businessInfo: {
        brandName: String,
        brandInfo: String,
        brandLocation: String,
        sketch: String,
        sew: String,
        businessPage: String,
        sketchSkill: String,
        sewSkill: String,
        imgUrl: String
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