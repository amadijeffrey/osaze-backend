const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const helmet = require('helmet')
const cors = require('cors')
const {port, DBURL } = require('./config')


const designersRoutes = require('./routes/designersRoutes')
const customersRoutes = require('./routes/customersRoutes')
const productsRoutes = require('./routes/productsRoutes')

const app = express()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}))
app.use('/api/customer', customersRoutes)
app.use('/api/designer', designersRoutes)
app.use('/api/products', productsRoutes)

mongoose.connect(DBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => console.log('DB connected '))

app.get('/health', (req,res) => {
  res.status(200).json({message: 'ok'})
})

app.listen(port , () => {
  console.log('app is running')
})
