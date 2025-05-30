import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const FaqSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  order_index: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Faq || mongoose.model("Faq", FaqSchema)
