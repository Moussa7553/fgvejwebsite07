import mongoose from "mongoose"

const URI_MONGODB = process.env.URI_MONGODB || "mongodb://localhost:27017/fgvej"

let isConnected = false

export async function connecterBaseDeDonnees() {
  if (isConnected) {
    console.log("Utilisation de la connexion MongoDB existante")
    return mongoose.connection
  }

  try {
    console.log("Tentative de connexion à MongoDB...")

    const conn = await mongoose.connect(URI_MONGODB, {
      bufferCommands: false,
    })

    isConnected = true
    console.log("Connexion MongoDB établie avec succès")

    return conn.connection
  } catch (erreur) {
    console.error("Erreur de connexion MongoDB:", erreur)
    return null
  }
}

/* Version précédente sauvegardée
import mongoose from 'mongoose';

const URI_MONGODB = process.env.URI_MONGODB || "mongodb://localhost:27017/fgvej_db"

if (!URI_MONGODB) {
  throw new Error("Veuillez définir la variable d'environnement URI_MONGODB")
}

declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null }
}

let cache = (global as any).mongoose

if (!cache) {
  cache = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cache.conn) {
    return cache.conn
  }

  if (!cache.promise) {
    const options = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    try {
      cache.promise = mongoose.connect(URI_MONGODB, options)
      const mongooseInstance = await cache.promise
      cache.conn = mongooseInstance.connection
      return cache.conn
    } catch (error) {
      cache.promise = null
      throw error
    }
  }

  try {
    cache.conn = await cache.promise
  } catch (e) {
    cache.promise = null
    throw e
  }

  return cache.conn
}

export async function testerConnexion() {
  try {
    const conn = await connectToDatabase()
    if (!conn) {
      throw new Error("La connexion n'a pas été établie")
    }
    console.log("Connexion à MongoDB réussie")
    return true
  } catch (erreur) {
    console.error("Échec de la connexion à MongoDB:", erreur)
    return false
  }
}

export const connecterBaseDeDonnees = connectToDatabase
*/
