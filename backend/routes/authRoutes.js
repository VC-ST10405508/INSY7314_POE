import express from "express";
import { register, login } from "../controllers/authController.js";
//(freecodecamp.ord, 2024):

//creating the express router var
const router = express.Router();
//(freecodecamp.ord, 2024):

//creating the login route
router.post("/register", register);
router.post("/login", login)
//(freecodecamp.ord, 2024):

export default router;

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].