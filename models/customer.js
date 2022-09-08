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
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    bodyProfile: {
        bust: Number,
        shoulder_length: Number,
        front_waist_length: Number,
        back_waist_length: Number,
        arm_length: Number,
        waist: Number,
        hip: Number,
        hip_dip: Number,
        thigh: Number,
        ankle: Number,
        inseam: Number,
        outseam: Number,
        crotch_depth: Number
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