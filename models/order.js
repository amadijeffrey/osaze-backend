const mongoose = require('mongoose')

const orderSchema = new  mongoose.Schema({
    trackingId: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    date_delivered: {
        type: Date,
    },
   items:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
      }
    ],
   status:{
    type: String,
    enum: ['order placed', 'shipped', 'delivered', 'cancelled'],
    default: 'order placed'
   },
   amount_paid: Number
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order