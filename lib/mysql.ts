import mysql from "mysql2/promise"

// Configuration de la connexion MySQL
const configBD = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_UTILISATEUR || "root",
  password: process.env.MYSQL_MOT_DE_PASSE || "",
  database: process.env.MYSQL_BASE_DE_DONNEES || "fgvej_db",
  port: Number(process.env.MYSQL_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Création du pool de connexions
const pool = mysql.createPool(configBD)

// Fonction pour exécuter des requêtes SQL
export async function requete(sql: string, params: any[] = []) {
  try {
    const [resultats] = await pool.execute(sql, params)
    return resultats
  } catch (erreur) {
    console.error("Erreur de requête SQL:", erreur)
    throw erreur
  }
}

// Fonction pour tester la connexion à la base de données
export async function testerConnexion() {
  try {
    const connexion = await pool.getConnection()
    console.log("Connexion à MySQL réussie")
    connexion.release()
    return true
  } catch (erreur) {
    console.error("Échec de la connexion à MySQL:", erreur)
    return false
  }
}

export default { requete, testerConnexion }
