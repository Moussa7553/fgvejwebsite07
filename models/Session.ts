import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const SessionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  user_id: {
    type: String,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Session || mongoose.model("Session", SessionSchema)
