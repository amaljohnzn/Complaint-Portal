const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Email already exists" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000;

  user = await User.create({ name, email, password, otp, otpExpires });

  await sendEmail(email, "Verify Your Account", `Your OTP is ${otp}`);

  res.json({ message: "OTP sent to email. Please verify your account." });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.isVerified) return res.json({ message: "Already verified" });
  if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
  if (user.otpExpires < Date.now()) return res.status(400).json({ message: "OTP expired" });

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.json({ message: "Account verified successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.isVerified) return res.status(400).json({ message: "Account not verified" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role)
  });
};



exports.registerAdmin = async (req, res) => {
  console.log("📥 Incoming admin registration request...");

  try {
    const { name, email, password } = req.body;
    console.log("📌 Request Body:", req.body);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    console.log("🔍 Existing Admin Check:", existingAdmin ? "Found" : "Not Found");

    if (existingAdmin) {
      console.log("❌ Admin already exists");
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create admin
    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
      isVerified: true // Skipping OTP for admin registration
    });

    console.log("✅ Admin created successfully:", admin);

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error("🔥 Error in registerAdmin:", error.message);
    res.status(500).json({ message: error.message });
  }
};
