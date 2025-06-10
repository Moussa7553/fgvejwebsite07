"use server"

import { connectToDatabase } from "@/lib/mongodb"
import Contact from "@/models/Contact"
import Notification from "@/models/Notification"
import { v4 as uuidv4 } from "uuid"

export async function envoyerFormulaire(formData: FormData) {
  try {
    const nom = formData.get("nom") as string
    const email = formData.get("email") as string
    const telephone = formData.get("telephone") as string
    const sujet = formData.get("sujet") as string
    const message = formData.get("message") as string

    console.log("Données reçues:", {
      nom,
      email,
      telephone,
      sujet,
      message
    })

    if (!nom || !email || !telephone || !sujet || !message) {
      console.log("Validation échouée - Champs manquants:", {
        nom: !!nom,
        email: !!email,
        telephone: !!telephone,
        sujet: !!sujet,
        message: !!message
      })
      return { success: false, message: "Veuillez remplir tous les champs" }
    }

    await connectToDatabase()

    // Créer le contact
    const contact = await Contact.create({
      _id: uuidv4(),
      nom,
      email,
      telephone,
      sujet,
      message,
      statut: "non_lu",
      date_creation: new Date()
    })

    // Créer la notification
    await Notification.create({
      type: "contact",
      title: `Nouveau message de ${nom}`,
      message: `Message reçu de ${nom} (${email}) concernant "${sujet}"`,
      reference_id: contact._id,
      is_read: false,
      created_at: new Date()
    })

    return { success: true, message: "Message envoyé avec succès" }
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error)
    throw error
  }
}
