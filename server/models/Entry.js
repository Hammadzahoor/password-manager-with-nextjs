const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    url: { type: String },
    notes: { type: String },
    status: { type: String, default: "Healthy" },
    risk: { type: String, default: "Low" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
