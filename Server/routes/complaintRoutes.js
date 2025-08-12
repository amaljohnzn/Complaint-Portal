const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const upload = require("../middleware/upload"); 
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require("../controllers/complaintController");

const router = express.Router();

//router.post("/", protect, createComplaint);
//router.post("/", protect, upload.single("image"), createComplaint);
router.post("/", protect, upload.single("photo"), createComplaint);

router.get("/my", protect, getMyComplaints);
router.get("/", protect, isAdmin, getAllComplaints);
router.put("/:id/status", protect, isAdmin,updateComplaintStatus);
//router.get("/:id/status", protect, getComplaintStatus);



module.exports = router;

