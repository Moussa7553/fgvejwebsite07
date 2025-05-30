import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const ResourceSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["guide", "video", "faq"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  file_path: {
    type: String,
    required: true,
  },
  thumbnail_path: {
    type: String,
  },
  duration: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Resource || mongoose.model("Resource", ResourceSchema)
