const express = require("express");
const db = require("./models"); // Ensure models/index.js is properly configured
const identifyRoutes = require("./routes/identify");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware - Use only express.json()
app.use(express.json());

// ✅ Route for /identify
app.use("/identify", identifyRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Server is running! 🚀");
});

// ✅ Sync database
db.sequelize
  .sync({ alter: true }) // Automatically update database if needed
  .then(() => {
    console.log("📚 Database connected successfully!");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
