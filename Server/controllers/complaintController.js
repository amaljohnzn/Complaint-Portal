const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      location,
      submittedBy: req.user._id,
      photoUrl: req.file ? req.file.path : null
    });

    res.status(201).json({
      success: true,
      data: complaint
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find().populate("submittedBy", "name email");
  res.json(complaints);
};



exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ submittedBy: req.user.id })
      .sort({ dateSubmitted: -1 }); // show newest first

    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// Update complaint status and message
exports.updateComplaintStatus = async (req, res) => {
  console.log("📥 Incoming status update request");

  try {
    const { status, statusMessage } = req.body;
    console.log("📌 Request Body:", req.body);

    const complaint = await Complaint.findById(req.params.id);
    console.log("🔍 Complaint Found:", complaint ? complaint._id : "Not Found");

    if (!complaint) {
      console.log("❌ Complaint not found");
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status || complaint.status;
    complaint.statusMessage = statusMessage || complaint.statusMessage;

    await complaint.save();

    console.log("✅ Complaint status updated:", complaint);

    res.json({
      message: "Complaint status updated successfully",
      complaint
    });
  } catch (error) {
    console.error("🔥 Error updating complaint:", error.message);
    res.status(500).json({ message: error.message });
  }
};
