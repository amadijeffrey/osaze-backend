const Product = require('../models/product')
const {availableCurrencies, convertFromUSD} = require('../helper/currencyHelper')
const  cloudinary  = require('../helper/cloudinaryConfig')

const createProduct = async(req, res) => {
  try{
    const {name, category, description, price, subCategory, sizes} = req.body
    const { brand } = req.user.businessInfo
    const data = await cloudinary.uploader.upload(req.file.path)
    
   const prices =  availableCurrencies.map(currency => {
                return new Price(currency, convertFromUSD(price,currency.label))
            })   

    const productData = {name, category, description, prices, imageId: data.public_id, image: data.url, brand, subCategory, sizes}
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

module.exports = {createProduct, updateBusinessInfo }