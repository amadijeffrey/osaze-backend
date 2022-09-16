const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    designer: String,
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    status:{
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
})

const Request = mongoose.model('Request', requestSchema)
module.exports = Request