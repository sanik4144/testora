const mongoose = require('mongoose');

const connect = ()=>{
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connect;