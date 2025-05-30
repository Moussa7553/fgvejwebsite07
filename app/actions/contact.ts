"use server"

import { connecterBaseDeDonnees } from "@/lib/mongodb"
import Contact from "@/modeles/Contact"
import { v4 as uuidv4 } from "uuid"

export async function envoyerFormulaire(donnees: {
  nom: string
  email: string
  telephone?: string
  sujet: string
  message: string
}) {
  try {
    // Valider les données
    if (!donnees.nom || !donnees.email || !donnees.sujet || !donnees.message) {
      return { 
        succes: false, 
        message: "Veuillez remplir tous les champs obligatoires" 
      }
    }

    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(donnees.email)) {
      return { 
        succes: false, 
        message: "Veuillez entrer une adresse email valide" 
      }
    }

    // Établir la connexion à la base de données
    const conn = await connecterBaseDeDonnees()
    if (!conn) {
      return { 
        succes: false, 
        message: "Erreur de connexion à la base de données" 
      }
    }

    const { nom, email, telephone, sujet, message } = donnees

    // Créer le nouveau contact
    const nouveauContact = await Contact.create({
      _id: uuidv4(),
      nom,
      email,
      telephone: telephone || "",
      sujet,
      message,
      statut: "non_lu",
      date_creation: new Date(),
    })

    if (!nouveauContact) {
      return { 
        succes: false, 
        message: "Erreur lors de la création du message" 
      }
    }

    console.log("Message de contact créé:", nouveauContact)

    return { 
      succes: true, 
      message: "Message envoyé avec succès" 
    }
  } catch (erreur) {
    console.error("Erreur lors de l'envoi du message:", erreur)
    
    // Gérer les erreurs spécifiques
    if (erreur instanceof Error) {
      if (erreur.name === 'ValidationError') {
        return { 
          succes: false, 
          message: "Données invalides. Veuillez vérifier les informations saisies." 
        }
      }
      if (erreur.name === 'MongoServerError') {
        return { 
          succes: false, 
          message: "Erreur de serveur. Veuillez réessayer plus tard." 
        }
      }
    }
    
    return { 
      succes: false, 
      message: "Une erreur est survenue lors de l'envoi du message" 
    }
  }
}
