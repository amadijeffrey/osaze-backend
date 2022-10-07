const Customer = require('../models/customer')
const CartItem = require('../models/cartItem')
const Order = require('../models/order')
const Request = require('../models/request')

const updateBodyProfile =  async (req, res) => {
    try{
        const {bodyProfile} = req.body
         for(const properties in bodyProfile){
            bodyProfile[properties] = Number(bodyProfile[properties])
         }

        const updatedCustomer = await Customer.findByIdAndUpdate(req.user._id,
        {bodyProfile},
        { new: true })
        .populate('userObject').populate('cart').exec()
        res.status(201).json({ status: 'success', user: updatedCustomer })

    }catch(err){
        res.status(500).json({ message: 'something went wrong', err})
    }
}
   
const getAllOrdersForCustomer = async (req, res) => {
    try{
        const allOrders = await Order.find({customer: req.user.userId}).populate('item').exec()
        res.status(200).json({status: 'success', allOrders})

    }catch(err){
      res.status(500).json({ message: 'something went wrong', err})

    }
}


   
const viewOrder = async (req, res) => {
    try{
        const {id} = req.params
        const foundOrder = await Order.findById(id)
        if(!foundOrder) return res.status(404).json({status: 'fail' , message: 'order not found'})  
        
        res.status(200).json({foundOrder})
    }catch(err){
        res.status(500).json({ message: 'something went wrong', err})
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
      
        res.status(200).json({status: 'success', newCartItem})

    }catch(err){
        res.status(500).json({ message: 'something went wrong', err })
    }
}

const updateCartItem = async(req,res) => {
    try{
        const { id } = req.params
        const { qty } = req.body

        const updatedCartItem = await CartItem.findByIdAndUpdate(id,{qty}, {new:true} )
        req.user.cart.push(updatedCartItem)
        req.user.save()
        res.status(201).json({status: 'success', updatedCartItem})

    }catch(err){
        res.status(500).json({ message: 'something went wrong', err })
    }
}
   
const removeCartItem = async(req,res) => {
    try{
        const { id } = req.params
        await CartItem.findByIdAndRemove(id)
        res.status(201).json({status: 'success', id})

    }catch(err){
        res.status(500).json({ message: 'something went wrong', err })
    }
}

const cartCheckOut =  (req, res) => {
    try{
        const { reference} = req.body
        req.user.cart.forEach( (cartItem) => {
          Promise.all([
                Order.create({
                    ref: reference,
                    designer: cartItem.brandName,
                    item: cartItem._id,
                    customer: req.user.userId,
                    billingAddress: {
                        houseAddress: req.user.userObject.houseAddress,
                        country: req.user.userObject.country,
                        state: req.user.userObject.state,
                        city: req.user.userObject.city,
                    },
                }),
                Request.create({
                    designer: cartItem.brandName,
                    item: cartItem._id
                })
            ])
          
        })
        req.user.cart = []
        req.user.save()

        res.status(200).json({ status: 'success', message: 'Your order has been received. It would be shipped soon.' })

    }catch(err){
        res.status(500).json({ message: 'something went wrong', err })
    }
}

function returnPromise(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('order created')
        },3000)
    })
}


  module.exports = {updateBodyProfile, viewOrder, getAllOrdersForCustomer, 
    addProductToCart, updateCartItem, removeCartItem, cartCheckOut} 