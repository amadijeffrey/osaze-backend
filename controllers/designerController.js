const Product = require('../models/product')
const Request = require('../models/request')
const {availableCurrencies, convertFromUSD} = require('../helper/currencyHelper')
const  cloudinary  = require('../helper/cloudinaryConfig')

const createProduct = async(req, res) => {
  try{
    const {name, category, description, price, subCategory, sizes, fabrics} = req.body
    const { brandName } = req.user.businessInfo
    const data = await cloudinary.uploader.upload(req.file.path)
    
   const prices =  availableCurrencies.map(currency => {
                return new Price(currency, convertFromUSD(price,currency.label))
            })   

    const productData = {name, category, description, prices, imageId: data.public_id, image: data.url, brandName, subCategory, sizes, fabrics}
    const newProduct = await Product.create(productData)

     res.status(200).json({status: 'success', newProduct})
   }catch(err){
    res.status(500).json({ message: 'something went wrong', err })
    }
}

class Price{
  constructor(currency, amount){
      this.currency = currency,
      this.amount = amount
  }
}

const updateBusinessInfo = async(req, res) => {
  try{
    const updatedDesigner = await Designer.findByIdAndUpdate(req.user._id,
    {businessInfo:req.body},
    { new: true }).populate('address').populate('userObject').exec()
    res.status(201).json({ status: 'success', updatedDesigner })

  }catch(err){
      res.status(500).json({ message: 'something went wrong'})
  }
}

const getAllRequests = async(req, res) => {
  try{
  const allRequests = await Request.find({ designer: req.user.businessInfo.brandName}).populate('item').exec()
  res.status(201).json({status: 'success', allRequests})

  }catch(err){
    res.status(500).json({ message: 'something went wrong'})
  }
}

const allSales = async(req, res) => {
  try{
  const allRequests = await Request.find({ designer: req.user.businessInfo.brandName}).populate('item').exec()
  const defaultCurrency = '$'
  const total = []
  allRequests.forEach(order => {
    if(order.item.currency === defaultCurrency){
      total.push(order.item.price)
    }
    if(order.item.currency === '€'){
      total.push(order.item.price)
    }
    if(order.item.currency === '₦'){
      total.push((order.item.price / 422.20).toFixed(2))
    }
    if(order.item.currency === '£'){
      total.push((order.item.price / 0.85).toFixed(2))
    }
  })
  
  res.status(201).json({status: 'success', allRequests})

  }catch(err){
    res.status(500).json({ message: 'something went wrong'})
  }
}

module.exports = {createProduct, updateBusinessInfo, getAllRequests, allSales} 