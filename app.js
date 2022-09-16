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

var whitelist = ['http://localhost:3000', 'https://osaze.netlify.app', 'https://osaze.org' ]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 

}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/customer', customersRoutes)
app.use('/api/designer', designersRoutes)
app.use('/api/products', productsRoutes)

mongoose.connect(DBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => console.log('DB connected '))

app.listen(port , () => {
  console.log('app is running')
})
