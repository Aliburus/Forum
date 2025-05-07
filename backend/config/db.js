const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbUrl = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB bağlantısı başarılı!");

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB bağlantı hatası:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB bağlantısı kesildi");
    });
  } catch (err) {
    console.log("MongoDB bağlantı hatası:", err.message);
  }
};

module.exports = connectDB;
