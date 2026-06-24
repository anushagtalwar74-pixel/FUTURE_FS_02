const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("CRM Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});