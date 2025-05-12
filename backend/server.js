const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const pollRoutes = require("./routes/pollsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL, // React frontend URL'si
    credentials: true, // Cookie'lerin gönderilmesini sağlamak
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api", adminRoutes);
app.use("/api", commentRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", pollRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
