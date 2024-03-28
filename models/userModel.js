import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username must have some value"],
      trim: true,
      minLength: [5, "Username must have atleast 5 characters"],
    },
    email: {
      type: String,
      required: [true, "email must have some value"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must have some value"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password must have some value"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
