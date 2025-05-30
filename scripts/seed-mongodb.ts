import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "../lib/mongodb"

// Modèles
import User from "../models/User"
import Project from "../models/Project"
import Contact from "../models/Contact"

async function seed() {
  try {
    console.log("Connexion à la base de données MongoDB...")
    await connectToDatabase()
    console.log("Connexion réussie!")

    // Vérifier si des données existent déjà
    const usersCount = await User.countDocuments()
    if (usersCount > 0) {
      console.log("La base de données contient déjà des données. Abandon du processus de seed.")
      return
    }

    console.log("Début de l'insertion des données...")

    // Créer un utilisateur administrateur
    const adminPassword = await bcrypt.hash("admin123", 10)
    const admin = await User.create({
      _id: uuidv4(),
      first_name: "Admin",
      last_name: "FGVEJ",
      email: "admin@fgvej.org",
      phone: "+223 XX XX XX XX",
      password: adminPassword,
      role: "admin",
      created_at: new Date(),
      updated_at: new Date(),
    })
    console.log("Utilisateur administrateur créé:", admin.email)

    // Créer quelques utilisateurs de test
    const userPassword = await bcrypt.hash("user123", 10)
    const users = []
    for (let i = 1; i <= 5; i++) {
      const user = await User.create({
        _id: uuidv4(),
        first_name: `Prénom${i}`,
        last_name: `Nom${i}`,
        email: `user${i}@example.com`,
        phone: `+223 XX XX XX ${i}${i}`,
        password: userPassword,
        entrepreneur_type: i % 2 === 0 ? "individual" : "startup",
        role: "user",
        created_at: new Date(),
        updated_at: new Date(),
      })
      users.push(user)
      console.log(`Utilisateur ${i} créé:`, user.email)
    }

    // Créer quelques projets de test
    const projectCategories = ["agriculture", "energy", "waste", "water"]
    const projectStatuses = ["pending", "reviewing", "approved", "rejected"]

    for (let i = 0; i < users.length; i++) {
      const projectsCount = Math.floor(Math.random() * 3) + 1 // 1 à 3 projets par utilisateur

      for (let j = 0; j < projectsCount; j++) {
        const project = await Project.create({
          _id: uuidv4(),
          user_id: users[i]._id,
          project_name: `Projet ${i + 1}-${j + 1}`,
          category: projectCategories[Math.floor(Math.random() * projectCategories.length)],
          description: `Description détaillée du projet ${i + 1}-${j + 1}. Ce projet vise à améliorer l'environnement...`,
          impact: `Impact écologique du projet ${i + 1}-${j + 1}: réduction des émissions de CO2, préservation des ressources...`,
          funding_amount: Math.floor(Math.random() * 90000000) + 10000000, // 10M à 100M FCFA
          timeline: Math.floor(Math.random() * 24) + 6, // 6 à 30 mois
          status: projectStatuses[Math.floor(Math.random() * projectStatuses.length)],
          created_at: new Date(),
          updated_at: new Date(),
        })
        console.log(`Projet ${i + 1}-${j + 1} créé pour l'utilisateur ${users[i].email}`)
      }
    }

    // Créer quelques messages de contact
    const subjects = ["information", "submission", "partnership", "other"]
    for (let i = 1; i <= 10; i++) {
      const contact = await Contact.create({
        _id: uuidv4(),
        name: `Contact ${i}`,
        email: `contact${i}@example.com`,
        phone: i % 2 === 0 ? `+223 XX XX XX ${i}${i}` : "",
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        message: `Message de contact ${i}. Ceci est un message de test pour démontrer la fonctionnalité de contact.`,
        status: i <= 5 ? "unread" : i <= 8 ? "read" : "responded",
        created_at: new Date(),
      })
      console.log(`Message de contact ${i} créé`)
    }

    console.log("Données insérées avec succès!")
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error)
  } finally {
    await mongoose.disconnect()
    console.log("Déconnexion de MongoDB")
    process.exit(0)
  }
}

seed()
