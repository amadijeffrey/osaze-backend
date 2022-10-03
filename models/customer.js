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
        bust: Number,
        shoulderLength: Number,
        frontWaistLength: Number,
        backWaistLength: Number,
        armLength: Number,
        waist: Number,
        hip: Number,
        hipDip: Number,
        thigh: Number,
        ankle: Number,
        inseam: Number,
        outseam: Number,
        crotchDepth: Number
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
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