const mongoose = require('mongoose')

const businessInfoSchema = new mongoose.Schema({
    brandName: String,
    brandInfo: String,
    brandLocation: String,
    sketch: String,
    sew: String,
    businessPage: String,
    sketchSkill: String,
    sewSkill: String,
    imgUrl: String
})

const BusinessInfo = mongoose.model('BusinessInfo', businessInfoSchema)
module.exports = BusinessInfo