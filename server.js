const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to database
connectDB().catch((err) => {
    console.error("❌ Database Connection Error:", err.message);
    process.exit(1); // Exit process on DB connection failure
});

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");

// Use routes
app.use("/api/users", authRoutes);
app.use("/api/loans", loanRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});

// 404 Route Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({ message: "❌ Route Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack);
    res.status(500).json({ message: "❌ Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
