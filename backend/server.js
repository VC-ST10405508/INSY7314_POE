import connectDB from './config/database.js';
import app from './app.js';
import https  from "https"
import fs from 'fs';
import dotenv from "dotenv";
import transactionRoutes from "./routes/transRoutes.js";

dotenv.config();

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;

//these dont exist yet still need to add
const sslKeyPath = 'ssl/key.pem';
const sslCertPath = 'ssl/cert.pem';

//whitelisting the certificate keys
if (!fs.existsSync(sslKeyPath) || !fs.existsSync(sslCertPath)) {
  console.error('SSL certificates not found. Please generate them or check paths.');
  //ending start of server if unable to read.
  process.exit(1);
}

//adding them to the options
const options = {
  key: fs.readFileSync(sslKeyPath),
  cert: fs.readFileSync(sslCertPath),
};
//(freecodecamp.ord, 2024):

//creating a goto to start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log('Database connected successfully');
    
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Server running at https://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};
//(freecodecamp.ord, 2024):


startServer();

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].