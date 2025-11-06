import mongoose from "mongoose";
//(freecodecamp.ord, 2024):

//creating the schema for the data 
const transSchema = new mongoose.Schema({
  transactionID: {type: Number, unique: true, required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  type: {type: String},
  amount: {type: Number},
  status: {type: String, default: "pending" },
  recipient: {type: String},
  description: {type: String}
});
//(freecodecamp.ord, 2024):


//(freecodecamp.ord, 2024):

const trans = mongoose.model('Transaction', transSchema);

export default trans;

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].