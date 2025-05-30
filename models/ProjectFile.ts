import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const ProjectFileSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  project_id: {
    type: String,
    required: true,
    ref: "Project",
  },
  file_name: {
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
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.ProjectFile || mongoose.model("ProjectFile", ProjectFileSchema)
