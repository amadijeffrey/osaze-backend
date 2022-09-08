const Customer = require('../models/customer')

const updateBodyProfile =  async (req, res) => {
    try{
        const updatedCustomer = await Customer.findByIdAndUpdate(req.user._id,
        {bodyProfile:req.body},
        { new: true }).populate('address')
        .populate('userObject').exec()
        res.status(201).json({ status: 'success', updatedCustomer })

    }catch(err){
        res.status(500).json({ message: 'something went wrong'})
    }
}
   
const getAllOrdersForCustomer = async (req, res) => {
    try{
    const allOrders = req.user.orders
    res.status(200).json({status: 'success', allOrders})

    }catch(err){
    res.status(500).json({ message: 'something went wrong'})

    }
}
   
const viewOrder = async (req, res) => {
    try{
    const {id} = req.params
    const foundOrder = req.user.orders.find(order => order.ref === id)
    if(!foundOrder) return res.status(404).json({status: 'fail' , message: 'order not found'})  
    
    res.status(200).json({foundOrder})
    }catch(err){
    res.status(500).json({ message: 'something went wrong'})

    }
}
   
  module.exports = {updateBodyProfile, viewOrder, getAllOrdersForCustomer } 