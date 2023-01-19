const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_DB_CONNECT_STRING,
      () => {
        console.log("connected to mongo db");
      }
    );
    return conn;
  } catch (error) {
    console.log(`Error while connecting DB :  ${error} `);
    return null;
  }
};

module.exports = connectDB;
