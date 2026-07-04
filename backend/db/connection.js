const mongoose = require('mongoose');

const connect = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    const host = process.env.MONGO_URI?.match(/@([^/?]+)/)?.[1];

    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      console.error(`MongoDB connection failed: could not resolve ${host || "the configured host"}.`);
      console.error("Check MONGO_URI in .env, your Atlas cluster status, and whether your network/DNS allows mongodb+srv SRV lookups.");
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

module.exports = connect;
