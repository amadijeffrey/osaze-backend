const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userObject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    bodyProfile: {
        type: Object
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem'
        }
    ],
    messages: [
        {
            type:String
        }
    ],
})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer