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
    unique : true
  },
  
  username: {
    type: String,
    required: true,
    unique : true
  },
  
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
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false,
    default: " "
  },
  countryCode: {
    type: String,
    required: false,
    default:""
  },
  phoneNumber: {
    type: String,
    required: false,
    default:""
  },
  
}, { timestamps: true });

const user = mongoose.model('user', userSchema);
module.exports = user;