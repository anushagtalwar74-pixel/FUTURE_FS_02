const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// GET all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE lead
router.post("/", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE lead
router.put("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;