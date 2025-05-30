import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const ProjectSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  user_id: {
    type: String,
    required: true,
    ref: "User",
  },
  project_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  impact: {
    type: String,
    required: true,
  },
  funding_amount: {
    type: Number,
    required: true,
  },
  timeline: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "reviewing", "approved", "rejected"],
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
})

// Mettre à jour le champ updated_at avant chaque sauvegarde
ProjectSchema.pre("save", function (next) {
  this.updated_at = new Date()
  next()
})

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
