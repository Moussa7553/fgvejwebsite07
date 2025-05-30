import mysql from "mysql2/promise"

// Récupération des variables d'environnement
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "fgvej_db",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Création du pool de connexions
const pool = mysql.createPool(dbConfig)

// Fonction pour exécuter des requêtes SQL
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Erreur de requête SQL:", error)
    throw error
  }
}

// Fonction pour tester la connexion à la base de données
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("Connexion à la base de données réussie")
    connection.release()
    return true
  } catch (error) {
    console.error("Échec de la connexion à la base de données:", error)
    return false
  }
}

export default { query, testConnection }
