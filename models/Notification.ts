import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const NotificationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  type: {
    type: String,
    enum: ["project", "contact"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reference_id: {
    type: String,
    required: true,
  },
  is_read: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema) 