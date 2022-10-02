const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    brandName: {
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
    subCategory: 
        {
         type: String
        } 
     ,
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
    imageIds: [
        {
         type: String
        }
    ],
    sizes: [
       {
        type: String
       } 
    ],
    fabrics: [
        {
         type: String
        } 
    ],
    customization: [
        {
         type: String
        } 
    ]
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product