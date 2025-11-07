import express from "express";
import cors  from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import authRoutes from "./routes/authRoutes.js"
//(freecodecamp.ord, 2024):

//allowing us to access frontend port from .env file
dotenv.config();
//(freecodecamp.ord, 2024):

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

//middleware
app.use(helmet());
app.use(cors({origin: "https://localhost:" + process.env.frontEndPort, credentials: true}));
//allowing program to req and res json files
app.use(express.json());
//(freecodecamp.ord, 2024):
app.use(limiter);
app.use(mongoSanitize());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get('/', (req,res) => res.send("banking portal is running :D"));
//(freecodecamp.ord, 2024):

export default app;

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].