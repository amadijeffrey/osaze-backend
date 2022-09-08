const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const helmet = require('helmet')
const {port, DBURL } = require('./config')


const designersRoutes = require('./routes/designersRoutes')
const customersRoutes = require('./routes/customersRoutes')

const app = express()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/customer', customersRoutes)
app.use('/api/designer', designersRoutes)

mongoose.connect(DBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => console.log('DB connected '))

app.listen(port , () => {
  console.log('app is running')
})
