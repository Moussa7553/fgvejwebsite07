import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const TemplateSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file_type: {
    type: String,
    required: true,
  },
  file_size: {
    type: Number,
    required: true,
  },
  file_path: {
    type: String,
    required: true,
  },
  download_count: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Template || mongoose.model("Template", TemplateSchema)
