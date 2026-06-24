const express = require("express");
const router = express.Router();

// 🔥 TEMP DEMO LOGIN (GUARANTEED WORK)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN:", email, password);

  if (email === "admin@crm.com" && password === "admin123") {
    return res.json({
      token: "demo-token",
      user: {
        name: "Anusha",
        email,
        role: "Admin"
      }
    });
  }

  return res.status(400).json({ msg: "Invalid credentials" });
});

module.exports = router;