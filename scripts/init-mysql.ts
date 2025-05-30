import mysql from "mysql2/promise"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

// Configuration de la connexion MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  port: Number(process.env.MYSQL_PORT || "3306"),
  multipleStatements: true,
}

async function initializeDatabase() {
  let connection

  try {
    console.log("Connexion à MySQL...")
    connection = await mysql.createConnection(dbConfig)
    console.log("Connexion réussie!")

    // Créer la base de données si elle n'existe pas
    console.log("Création de la base de données...")
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE || "fgvej_db"} 
      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `)
    console.log(`Base de données ${process.env.MYSQL_DATABASE || "fgvej_db"} créée ou déjà existante.`)

    // Utiliser la base de données
    await connection.query(`USE ${process.env.MYSQL_DATABASE || "fgvej_db"};`)

    // Créer les tables
    console.log("Création des tables...")

    // Table des utilisateurs
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        entrepreneur_type VARCHAR(50),
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `)
    console.log("Table users créée.")

    // Table des projets
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        project_name VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        impact TEXT NOT NULL,
        funding_amount DECIMAL(15, 2) NOT NULL,
        timeline INT NOT NULL,
        status ENUM('pending', 'reviewing', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `)
    console.log("Table projects créée.")

    // Table des messages de contact
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status ENUM('unread', 'read', 'responded') DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log("Table contacts créée.")

    // Vérifier si des données existent déjà
    const [rows] = await connection.query("SELECT COUNT(*) as count FROM users;")
    const count = (rows as any)[0].count

    if (count > 0) {
      console.log("La base de données contient déjà des données. Abandon du processus de seed.")
      return
    }

    // Insérer des données de test
    console.log("Insertion des données de test...")

    // Créer un utilisateur administrateur
    const adminPassword = await bcrypt.hash("admin123", 10)
    await connection.query(
      `
      INSERT INTO users (id, first_name, last_name, email, phone, password, role)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `,
      [uuidv4(), "Admin", "FGVEJ", "admin@fgvej.org", "+223 XX XX XX XX", adminPassword, "admin"],
    )
    console.log("Utilisateur administrateur créé.")

    // Créer quelques utilisateurs de test
    const userPassword = await bcrypt.hash("user123", 10)
    const userIds = []

    for (let i = 1; i <= 5; i++) {
      const userId = uuidv4()
      userIds.push(userId)

      await connection.query(
        `
        INSERT INTO users (id, first_name, last_name, email, phone, password, entrepreneur_type, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `,
        [
          userId,
          `Prénom${i}`,
          `Nom${i}`,
          `user${i}@example.com`,
          `+223 XX XX XX ${i}${i}`,
          userPassword,
          i % 2 === 0 ? "individual" : "startup",
          "user",
        ],
      )
      console.log(`Utilisateur ${i} créé.`)
    }

    // Créer quelques projets de test
    const projectCategories = ["agriculture", "energy", "waste", "water"]
    const projectStatuses = ["pending", "reviewing", "approved", "rejected"]

    for (let i = 0; i < userIds.length; i++) {
      const projectsCount = Math.floor(Math.random() * 3) + 1 // 1 à 3 projets par utilisateur

      for (let j = 0; j < projectsCount; j++) {
        await connection.query(
          `
          INSERT INTO projects (id, user_id, project_name, category, description, impact, funding_amount, timeline, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
          [
            uuidv4(),
            userIds[i],
            `Projet ${i + 1}-${j + 1}`,
            projectCategories[Math.floor(Math.random() * projectCategories.length)],
            `Description détaillée du projet ${i + 1}-${j + 1}. Ce projet vise à améliorer l'environnement...`,
            `Impact écologique du projet ${i + 1}-${j + 1}: réduction des émissions de CO2, préservation des ressources...`,
            Math.floor(Math.random() * 90000000) + 10000000, // 10M à 100M FCFA
            Math.floor(Math.random() * 24) + 6, // 6 à 30 mois
            projectStatuses[Math.floor(Math.random() * projectStatuses.length)],
          ],
        )
        console.log(`Projet ${i + 1}-${j + 1} créé.`)
      }
    }

    // Créer quelques messages de contact
    const subjects = ["information", "submission", "partnership", "other"]
    for (let i = 1; i <= 10; i++) {
      await connection.query(
        `
        INSERT INTO contacts (id, name, email, phone, subject, message, status)
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
        [
          uuidv4(),
          `Contact ${i}`,
          `contact${i}@example.com`,
          i % 2 === 0 ? `+223 XX XX XX ${i}${i}` : "",
          subjects[Math.floor(Math.random() * subjects.length)],
          `Message de contact ${i}. Ceci est un message de test pour démontrer la fonctionnalité de contact.`,
          i <= 5 ? "unread" : i <= 8 ? "read" : "responded",
        ],
      )
      console.log(`Message de contact ${i} créé.`)
    }

    console.log("Données insérées avec succès!")
  } catch (error) {
    console.error("Erreur:", error)
  } finally {
    if (connection) {
      await connection.end()
      console.log("Connexion fermée.")
    }
    process.exit(0)
  }
}

initializeDatabase()
