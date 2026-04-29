const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },

  images: [
    {
      url: String,
      publicId: String,
      alt: String
    }
  ],

  category: {
    type: String,
    default: "Product",
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);