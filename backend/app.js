import express from "express";
import cors  from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
//(freecodecamp.ord, 2024):

//allowing us to access frontend port from .env file
dotenv.config();
//(freecodecamp.ord, 2024):

const app = express();

//middleware
app.use(helmet());
app.use(cors({origin: "https://localhost:" + process.env.frontEndPort, credentials: true}));
//allowing program to req and res json files
app.use(express.json());
//(freecodecamp.ord, 2024):


app.use("/api/auth", authRoutes);

app.get('/', (req,res) => res.send("banking portal is running :D"));
//(freecodecamp.ord, 2024):

export default app;

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].