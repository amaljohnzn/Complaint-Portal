const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  photoUrl: { type: String },
  location: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "In Progress", "Resolved", "Rejected"], 
    default: "Pending" 
  },
  statusMessage: { type: String }, // NEW FIELD
  dateSubmitted: { type: Date, default: Date.now },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Complaint", complaintSchema);
