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
        brand: String,
        about: String,
        clothTypes: String,
        businessLocation: String,
        sketch: String,
        makeClothes: String,
        businessPage: String,
        sketchSkill: Number,
        sewingSkill: Number,
        imgUrl: String
      }
})

const Designer = mongoose.model('Designer', designerSchema)
module.exports = Designer