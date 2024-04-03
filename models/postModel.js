import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [5, "Title must have atleast 5 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minLength: [5, "Description must have atleast 5 characters"],
    },
    file: {
      type: String,
      required: [true, "File is required"],
    },
    path: {
      type: String,
    },
    tags: {
      type: [String],
      required: [true, "Tags is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Posts = model("Posts", postSchema);

export default Posts;
