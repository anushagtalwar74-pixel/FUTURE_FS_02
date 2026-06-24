const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// GET all
router.get("/", async (req, res) => {
    const leads = await Lead.find();
    res.json(leads);
});

// CREATE
router.post("/", async (req, res) => {
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
});

// UPDATE STATUS
router.put("/:id", async (req, res) => {
    const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(lead);
});

module.exports = router;