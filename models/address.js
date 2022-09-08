const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  houseAddress: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  }
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;