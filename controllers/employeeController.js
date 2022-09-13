const Order = require('../models/order'
)
const getAllOrders = async ( res) => {
    try{
    const allOrders = await Order.find({}).populate('billingAddress')
    .populate('item').populate('customer').exec()
  
    res.status(201).json({status: 'success', allOrders})
    }catch(err){
        res.status(500).json({ message: 'something went wrong' })
    }
  }

 const updateOrderStatus =  async (req,res ) => {
    try{

    }catch(err){
        
    }
 }

  module.exports = { getAllOrders }