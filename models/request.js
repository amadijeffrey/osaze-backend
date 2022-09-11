const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    designer: String,
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }
})

const Request = mongoose.model('Request', requestSchema)
module.exports = Request