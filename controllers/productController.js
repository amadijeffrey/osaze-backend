const Product = require('../models/product')
const User = require('../models/user')

const getFeaturedProducts = async ( req, res) => {
    try{
        const allProducts = await Product.find()
        if(!allProducts)return res.status(404).json({status: 'fail', message: 'products not found'})

        const featuredProducts = []

        for(let i = 0; i < 10; i++){
            const randomIndex = Math.floor(Math.random() * allProducts.length)
            featuredProducts.push(allProducts[randomIndex])
        }
        res.status(200).json({status: 'success', featuredProducts})
    } catch(err){
        res.status(500).json({ message: 'something went wrong' })
    }
}

const getProduct = async (req, res) => {
    try{
        const { id } = req.params
        const foundProduct = await Product.findById(id)
        if(!foundProduct)return res.status(404).json({status: 'fail' , message: 'product not found'})
        const listOfProducts = await Product.find({category: foundProduct.category})

        for(let i = 0; i < 4; i++){
            const randomIndex = Math.floor(Math.random() * listOfProducts.length)
            foundProduct.similarProducts.push(listOfProducts[randomIndex])
        }

        res.status(200).json({status: 'success', foundProduct})
    } catch(err){
        res.status(500).json({ message: 'something went wrong' })
    }
}

const getProductsUnderCategory = async (req, res) => {
    try{
        const { category } = req.query
        const actualCategory = decodeURIComponent(category)
        const foundProducts = await Product.find({category: actualCategory})
        if(foundProducts.length === 0 )return res.status(404).json({status: 'fail', message: 'products with that category not found'})
        res.status(200).json({status: 'success', foundProducts})
    } catch(err){
        res.status(500).json({ message:'something went wrong'})
    }
}



const searchForProduct = async (req, res) => {
    try{
        const { name } = req.query
        if(!name) return
        const regex = new RegExp(name, 'i')
        const foundProduct = await Product.find({name: {$regex: regex}})
        if(!foundProduct.length === 0)return res.status(404).json({status: 'fail', message: 'no product matches that name'})
        res.status(200).json({ status: 'success', foundProduct })
    } catch(err){
        res.status(500).json({ message: 'something went wrong' })
    }
}




module.exports = { getFeaturedProducts, getProduct, getProductsUnderCategory, searchForProduct,}