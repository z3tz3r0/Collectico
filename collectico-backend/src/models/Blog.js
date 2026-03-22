import { Schema, model } from "mongoose";

const BlogSchema = new Schema({
  
  topic: { type: String, required: true, trim: true, maxlength: 50 },
  title: { type: String, required: true, trim: true, maxlength: 50 },
  detail: { type: String, required: true, trim: true },
  mainImage: { type: String, required: true, trim: true },
  
  images: [{
    image: { type: String, required: true, trim: true },
  }],

  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const Blog = model("Blog", BlogSchema);
