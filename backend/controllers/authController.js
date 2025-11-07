import jwt from "jsonwebtoken";
import User from "../models/User.js";
//(freecodecamp.ord, 2024):

const jwtGeneration = (userID, userRole) =>
  jwt.sign({ id: userID, role: userRole }, process.env.tokenSecret, { expiresIn: "1h" });
//(freecodecamp.ord, 2024):

const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
//Regex for password and email validation(freecodecamp.ord, 2024):


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
      //Checks if empty(Microsoft, 2025)
  }

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
      // Checks email format(Microsoft, 2025)
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 6 characters and include a special symbol (!@#$%^&*)",
        // checks for validation(Microsoft, 2025)
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
        // checks in comparison to database (Microsoft, 2025)
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
        // checks in comparison to database (Microsoft, 2025)
    }

    const token = jwtGeneration(user._id, user.userRole);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.userFullName, email: user.email, role: user.userRole },
      //(Microsoft, 2025)
    });
  } catch (error) {
    console.log("Login error: " + error);
    res.status(500).json({ success: false, message: "Server error" });
    //(Microsoft, 2025)
  }
};


//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].
