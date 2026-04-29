const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');

const cartSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },

  userId: {
    type: String,
    ref: "User",
    required: true,
    unique: true
  },

  items: [
    {
      productId: {
        type: String,
        ref: "Product",
        required: true
      },

      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);