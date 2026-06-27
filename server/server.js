const express = require("express");
const cors = require("cors");

const app = express();

// ✅ MIDDLEWARE
app.use(cors({
  origin: "https://YOUR-RENDER-URL.onrender.com/api/login",
  credentials: true
}));

app.use(express.json());

// ✅ ROUTES (IMPORTANT)
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("CRM Backend Running 🚀");
});

// ✅ START SERVER
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});