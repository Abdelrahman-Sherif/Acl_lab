const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  isAdmin:{
  type:Boolean,
  required: false,
  default: false,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
  ,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  passportNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  countryCode: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  
}, { timestamps: true });

const user = mongoose.model('user', userSchema);
module.exports = user;