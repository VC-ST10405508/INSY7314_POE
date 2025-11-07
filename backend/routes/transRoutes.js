import express from "express";
import jwt from "jsonwebtoken";
import Transaction from "../models/Transaction.js";

const router = express.Router();
//(freecodecamp.org. 2024)

//Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.tokenSecret);
    console.log("AUTH Middleware decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};
//(freecodecamp.org. 2024)


//Transaction endpoint
router.post("/add", authenticate, async (req, res) => {
  try {
    //Generate a random 6-digit transaction ID
    const randomID = Math.floor(100000 + Math.random() * 900000);

    const newTx = new Transaction({
      transactionID: randomID,
      userId: req.user.id,
      amount: req.body.amount,
      type: req.body.type || "payment",
      status: "pending",
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
//(freecodecamp.org. 2024)


//Fetch logged-in user's transactions
router.get("/my", authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//(freecodecamp.org. 2024)

//Admin-only route
router.get("/all", authenticate, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  try {
    const allTx = await Transaction.find()
      .populate("userId", "userFullName email");
    res.json(allTx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//(freecodecamp.org. 2024)


export default router;

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].