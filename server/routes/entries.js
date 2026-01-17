const express = require("express");
const Entry = require("../models/Entry");

const router = express.Router();

router.get("/", async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: -1 });
  res.json(entries);
});

router.get("/:id", async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }
  res.json(entry);
});

router.post("/", async (req, res) => {
  const { name, username, password, url, notes, status, risk } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ message: "name, username, password required" });
  }
  const entry = await Entry.create({ name, username, password, url, notes, status, risk });
  res.status(201).json(entry);
});

router.put("/:id", async (req, res) => {
  const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }
  res.json(entry);
});

router.delete("/:id", async (req, res) => {
  const entry = await Entry.findByIdAndDelete(req.params.id);
  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }
  res.json({ message: "Entry deleted" });
});

module.exports = router;
