const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Admin:{
  type:Boolean,
  required: true,
  default: false,
  },

  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true,
  },
  BornIn: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  
  PhoneNumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

const user = mongoose.model('user', userSchema);
module.exports = user;