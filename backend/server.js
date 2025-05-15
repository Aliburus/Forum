const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // ← ekledik
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // cookie’yi cross-site’de de göndermeyi sağlar
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ← cookie-parser’ı middleware olarak ekle

connectDB();

app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
