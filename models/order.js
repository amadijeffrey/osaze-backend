const mongoose = require('mongoose')

const orderSchema = new  mongoose.Schema({
    ref: {
        type: String,
        required: true
    },
    customer:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    designer: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    },
    date_delivered: {
        type: Date,
    },
    billingAddress: {
        houseAddress: String,
        country: String,
        city:  String,
        state: String
    },
   status:{
    type: String,
    enum: ['order placed', 'shipped', 'delivered', 'cancelled'],
    default: 'order placed'
   },
 
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order