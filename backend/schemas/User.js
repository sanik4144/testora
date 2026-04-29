const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  city:{
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  },
  agreedToTerms: {
    type: Boolean,
    required: true
  }
}, { timestamps:true })

module.exports = mongoose.model('User', userSchema);