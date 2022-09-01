const Product = require('../models/product')
const  cloudinary = require('cloudinary').v2;
const {availableCurrencies, convertFromUSD} = require('../helper/currencyHelper')
const {cloudName, apiKey, apiSecret} = require('../config')

cloudinary.config({ 
    cloud_name: cloudName, 
    api_key: apiKey, 
    api_secret: apiSecret,
    secure: true
  });

const createProduct = async(req, res) => {
  try{
    const {name, category, description, price, subCategory} = req.body
    const { brand } = req.user.business_info
    const data = await cloudinary.uploader.upload(req.file.path)
    
   const prices =  availableCurrencies.map(currency => {
                return new Price(currency, convertFromUSD(price,currency.label))
            })   

    const productData = {name, category, description, prices, imageId: data.public_id, image: data.url, brand, subCategory}
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

module.exports = {createProduct, }