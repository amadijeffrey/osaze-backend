const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory:{
        type: String,
        required: true
    },
    prices: [
         {
            type: Object
         }
    ],
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    imageId: String,
    sizes: [
       {
        type: String
       } 
    ]
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product