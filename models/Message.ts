import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const MessageSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["unread", "read", "responded"],
    default: "unread",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  responded_at: {
    type: Date,
  },
})

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)
