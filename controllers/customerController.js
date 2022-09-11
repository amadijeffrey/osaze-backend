const Customer = require('../models/customer')
const CartItem = require('../models/cartItem')
const Order = require('../models/order')
const Request = require('../models/request')

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
        const allOrders = Order.find({customer: req.user.userId})
        res.status(200).json({status: 'success', allOrders})

    }catch(err){
      res.status(500).json({ message: 'something went wrong'})

    }
}
   
const viewOrder = async (req, res) => {
    try{
    const {id} = req.params
    const foundOrder = Order.findById(id)
    if(!foundOrder) return res.status(404).json({status: 'fail' , message: 'order not found'})  
    
    res.status(200).json({foundOrder})
    }catch(err){
    res.status(500).json({ message: 'something went wrong'})

    }
}

const addProductToCart = async (req, res) => {
    try{
        const { name, image, price, size, qty, brandName, currency, custom, customDesign, fabric} = req.body
        const product = {
            name,
            image,
            price,
            size,
            qty,
            brandName,
            currency,
            custom,
            customDesign,
            fabric
        }
        const newCartItem = await CartItem.create(product)
        req.user.cart.push(newCartItem)
        req.user.save()
      
        res.status(201).json({status: 'success', newCartItem})

    }catch(err){
        res.status(500).json({ message: 'something went wrong' })
    }
}

const updateCartItem = async(req,res) => {
    try{
        const { id } = req.params
        const { qty } = req.body
        const customer = await Customer.findById(req.user._id)

        const updatedCartItem = await CartItem.findByIdAndUpdate(id,{qty}, {new:true} )
        customer.cart.push(updatedCartItem)
        customer.save()
        res.status(201).json({status: 'success', updatedCartItem})

    }catch(err){
        res.status(500).json({ message: 'something went wrong' })
    }
}
   
const removeCartItem = async(req,res) => {
    try{
        const { id } = req.params
        await CartItem.findByIdAndRemove(id)
        res.status(201).json({status: 'success', id})

    }catch(err){
        res.status(500).json({ message: 'something went wrong' })
    }
}

const cartCheckOut = async (req, res) => {
    try{
        const customer = await Customer.findById(req.user._id)
        console.log(customer)
        const { reference} = req.body
        // req.user.cart.forEach( async (cartItem) => {
        //   const [order] = await Promise.all([
        //         Order.create({
        //             ref: reference,
        //             designer: cartItem.brandName,
        //             item: cartItem._id,
        //             customer: req.user.userId,
        //             billingAddress: req.user.address,
        //         }),
        //         Request.create({
        //             designer: cartItem.brandName,
        //             item: cartItem._id
        //         })
        //     ])
        //     customer.orders.push(order)
        // })
        [1,2,3,4].forEach(el => {
            
        })

        customer.save()

        res.status(200).json({ status: 'success', message: 'Your order has been received. It would be shipped soon.' })

    }catch(err){
        res.status(500).json({ message: 'something went wrong' })
    }
}



  module.exports = {updateBodyProfile, viewOrder, getAllOrdersForCustomer, 
    addProductToCart, updateCartItem, removeCartItem, cartCheckOut ,} 