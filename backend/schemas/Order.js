const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },

  userId: {
    type: String,
    ref: "User",
    required: true
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
      },

      price: Number
    }
  ],

  subtotal: {
    type: Number,
    required: true
  },

  shippingCharge: {
    type: Number,
    default: 0
  },

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled"
    ],
    default: "pending"
  },

  address: {
    type: String,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: ["cod", "card", "bkash", "nagad", "stripe"],
    default: "cod"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);