import express from "express";
import jwt from "jsonwebtoken";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.tokenSecret);
    console.log("✅ AUTH Middleware decoded:", decoded); // 🔍 Debug line
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};


// ✅ Add Transaction endpoint
router.post("/add", authenticate, async (req, res) => {
  try {
    // ✅ Generate a random 6-digit transaction ID
    const randomID = Math.floor(100000 + Math.random() * 900000);

    const newTx = new Transaction({
      transactionID: randomID,       // ✅ Automatically generated
      userId: req.user.id,           // ✅ Pulled from token
      amount: req.body.amount,
      type: req.body.type || "payment",
      status: "pending",             // ✅ Always pending by default
      recipient: req.body.recipient || "N/A",
      description: req.body.description
    });

    await newTx.save();
    res.status(201).json({ message: "Transaction added successfully" });
  } catch (err) {
    console.error("Transaction add error:", err);
    res.status(400).json({ message: err.message });
  }
});


// ✅ Fetch logged-in user's transactions
router.get("/my", authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin-only route (view all users' transactions)
router.get("/all", authenticate, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  try {
    const allTx = await Transaction.find()
      .populate("userId", "userFullName email"); // include user info
    res.json(allTx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
