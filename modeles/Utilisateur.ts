import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const SchemaUtilisateur = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  prenom: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telephone: {
    type: String,
  },
  mot_de_passe: {
    type: String,
    required: true,
  },
  type_entrepreneur: {
    type: String,
  },
  role: {
    type: String,
    enum: ["utilisateur", "administrateur"],
    default: "utilisateur",
  },
  date_creation: {
    type: Date,
    default: Date.now,
  },
  date_modification: {
    type: Date,
    default: Date.now,
  },
})

// Mettre à jour le champ date_modification avant chaque sauvegarde
SchemaUtilisateur.pre("save", function (next) {
  this.date_modification = new Date()
  next()
})

export default mongoose.models.Utilisateur || mongoose.model("Utilisateur", SchemaUtilisateur)
