const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    designer: String,
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    },
    status:{
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
})

const Request = mongoose.model('Request', requestSchema)
module.exports = Request