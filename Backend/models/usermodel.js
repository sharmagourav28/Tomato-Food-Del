import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  {
    minimize: false,
    timestamps: true, // Adds `createdAt` and `updatedAt` timestamps
  }
);

// The model name should be singular and capitalized
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
