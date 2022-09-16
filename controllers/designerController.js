const Product = require('../models/product')
const Request = require('../models/request')
const {availableCurrencies, convertFromUSD} = require('../helper/currencyHelper')
const  cloudinary  = require('../helper/cloudinaryConfig')
const Designer = require('../models/designer')
const BusinessInfo = require('../models/businessInfo')

const createProduct = async(req, res) => {
  try{
    const {name, category, description, price, subCategory, sizes, customization} = req.body
    const { brandName } = req.user.businessInfo


    const data = await cloudinary.uploader.upload(req.files['image'][0].path, {folder: 'products'})
    const image = data.secure_url

    const fabrics = []
    req.files['fabrics'].forEach(async (fabric) => {
      const {secure_url} = await cloudinary.uploader.upload(fabric.path,{folder: 'products'})
      fabrics.push(secure_url)
    })

    
   const prices =  availableCurrencies.map(currency => {
                return new Price(currency, convertFromUSD(price,currency.label))
            })   

    const productData = {name, category, description, prices, imageId: data.public_id, image, brandName, subCategory,
      customization, sizes, fabrics}
    const newProduct = await Product.create(productData)

     res.status(200).json({status: 'success', newProduct})
   }catch(err){
    res.status(500).json({ message: 'something went wrong', err: err.name})
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
    const updatedBusinessInfo = await BusinessInfo.findByIdAndUpdate(req.user.businessInfo._id, req.body,
    { new: true })

    const updatedDesigner = await Designer.findByIdAndUpdate(req.user._id, 
      {businessInfo: updatedBusinessInfo},
      {new: true }).populate('userObject').populate('businessInfo').exec()

    res.status(201).json({ status: 'success', user: updatedDesigner })

  }catch(err){
      res.status(500).json({ message: 'something went wrong', err: err.name})
  }
}

const getAllRequests = async(req, res) => {
  try{
  const allRequests = await Request.find({ designer: req.user.businessInfo.brandName}).populate('item').exec()
  res.status(200).json({status: 'success', allRequests})

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

// {
// 	"description": "Model is wearing a size small Silk fabric with Invisible back zipper, detachable train, One Sleeve and high slit on left leg etc.",
// 	"name": "pink trad",
// 	"sizes": ["xl", "l", "s", "m"],
// 	"price": 25,
// 	"category": "men",
// 	"brandName": "wigs by kezor",
// 	"fabrics": [
// 			{"lastModified": 1663095204120,
// "name": "images.jpeg",
// "size": 3428,
// "type": "image/jpeg"
// },
// 		{"lastModified": 1663095254105,
// "name": "images1.jpeg",
// "size": 10093,
// "type": "image/jpeg"
// },
// 		{"lastModified": 1663095304125,
// "name": "images2.jpeg",
// "size": 13428,
// "type": "image/jpeg"
// }
// 	],
// 	"image": {"lastModified": 1663095204120,
// "name": "images4.jpeg",
// "size": 34298,
// "type": "image/jpeg"
// }
	
// }