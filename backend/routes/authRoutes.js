import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { login } from "../controllers/authController.js";
//(freecodecamp.ord, 2024):

//creating the express router var
const router = express.Router();
//(freecodecamp.ord, 2024):

//creating the login route
router.post("/login", login)
//(freecodecamp.ord, 2024):
//Route to hash and salt a password
router.post("/hash-password", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required." });
    }

    const token = authHeader.split(" ")[1];

    // Verify and decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.tokenSecret);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    // Check that the user is an admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password is required." });
    }

    // Generate salt and hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    res.json({ hashedPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while hashing password." });
  }
});

export default router;

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].