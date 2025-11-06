import mongoose from "mongoose";
import bcrypt from "bcrypt";
//(freecodecamp.ord, 2024):

//creating the schema for the data 
const userSchema = new mongoose.Schema({
  userID: {type: Number, unique: true, required: true},
  userRole: {type:String, default: "user"},
  userFullName: {type:String, required:true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
//(freecodecamp.ord, 2024):

//hashing and salting password if they havent been hashed and salted yet
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//(freecodecamp.ord, 2024):

//
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
//(freecodecamp.ord, 2024):

const user = mongoose.model('User', userSchema);

export default user;

//Reference list:

//Microsoft. 2025. Regular Expression Language - Quick Reference, 18 June 2022. [Online]. Available at: https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference [Accessed 5 October 2025].
//freecodecamp.org. 2024. MERN Stack Tutorial with Deployment – Beginner's Course. [video online] Available at: https://www.youtube.com/watch?v=O3BUHwfHf84 [Accessed 5 October 2025].
