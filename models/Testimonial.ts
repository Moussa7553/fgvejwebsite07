import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const TestimonialSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  project: {
    type: String,
  },
  image_path: {
    type: String,
  },
  is_published: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema)
