import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  entrepreneur_type: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
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
UserSchema.pre("save", function (next) {
  this.updated_at = new Date()
  next()
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
