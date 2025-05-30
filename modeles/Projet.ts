import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

// Définir le schéma pour les fichiers
const FichierSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  taille: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  contenu: {
    type: Buffer,
    required: true
  }
}, { _id: false })

const SchemaProjet = new mongoose.Schema({
  _id: {
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
  },
  telephone: {
    type: String,
    required: true,
  },
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  fichiers: {
    type: [FichierSchema],
    required: true,
    default: []
  },
  statut: {
    type: String,
    enum: ["en_attente", "en_cours", "approuve", "rejete"],
    default: "en_attente",
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
SchemaProjet.pre("save", function (next) {
  this.date_modification = new Date()
  next()
})

export default mongoose.models.Projet || mongoose.model("Projet", SchemaProjet)
