const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  size: String,
  custom: Object,
  customDesign: String,
  fabric: String,
  qty:Number,
  brandName: String,
  currency: String
})

const CartItem = mongoose.model('CartItem', cartItemSchema)
module.exports = CartItem