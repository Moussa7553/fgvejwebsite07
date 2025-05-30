import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const SchemaContact = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
  },
  sujet: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ["non_lu", "lu", "repondu"],
    default: "non_lu",
  },
  date_creation: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Contact || mongoose.model("Contact", SchemaContact)
