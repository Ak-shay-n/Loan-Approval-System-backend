const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Correctly Import and Use Routes
const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");

app.use("/api/users", authRoutes);
app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

// 404 Error Handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
