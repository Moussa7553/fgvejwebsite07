"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import jwt, { SignOptions } from "jsonwebtoken"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"

const JWT_SECRET = process.env.JWT_SECRET || "votre_cle_secrete_jwt_tres_securisee"
const JWT_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days in seconds

// Types
export interface TypeUtilisateur {
  _id: string
  prenom: string
  nom: string
  email: string
  role: "utilisateur" | "administrateur"
}

interface JWTPayload {
  id: string
  email: string
  role: string
}

// Fonction pour hacher un mot de passe
export async function hacherMotDePasse(motDePasse: string): Promise<string> {
  return await bcrypt.hash(motDePasse, 10)
}

// Fonction pour vérifier un mot de passe
export async function verifierMotDePasse(motDePasse: string, motDePasseHache: string): Promise<boolean> {
  return await bcrypt.compare(motDePasse, motDePasseHache)
}

// Fonction pour générer un token JWT
export async function genererToken(utilisateur: TypeUtilisateur): Promise<string> {
  const payload: JWTPayload = {
    id: utilisateur._id,
    email: utilisateur.email,
    role: utilisateur.role,
  }

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  }

  return jwt.sign(payload, JWT_SECRET, options)
}

// Fonction pour vérifier un token JWT
export async function verifierToken(token: string): Promise<JWTPayload | null> {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (erreur) {
    return null
  }
}

// Action pour l'inscription
export async function actionInscription(donnees: {
  prenom: string
  nom: string
  email: string
  telephone: string
  motDePasse: string
  typeEntrepreneur: string
}) {
  try {
    await connectToDatabase()
    const { prenom, nom, email, telephone, motDePasse, typeEntrepreneur } = donnees

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ email })
    if (utilisateurExistant) {
      return { succes: false, message: "Un utilisateur avec cet email existe déjà" }
    }

    // Hacher le mot de passe
    const motDePasseHache = await hacherMotDePasse(motDePasse)

    // Créer un nouvel utilisateur
    const nouvelUtilisateur = await User.create({
      _id: uuidv4(),
      prenom,
      nom,
      email,
      telephone,
      mot_de_passe: motDePasseHache,
      type_entrepreneur: typeEntrepreneur,
      role: "utilisateur",
      date_creation: new Date(),
      date_modification: new Date()
    })

    console.log("Utilisateur créé avec succès:", nouvelUtilisateur)

    return { succes: true, message: "Inscription réussie" }
  } catch (erreur) {
    console.error("Erreur lors de l'inscription:", erreur)
    return { succes: false, message: "Une erreur est survenue lors de l'inscription" }
  }
}

// Action pour la connexion
export async function actionConnexion(donnees: {
  email: string
  motDePasse: string
  seSouvenir: boolean
}) {
  try {
    await connectToDatabase()
    const { email, motDePasse, seSouvenir } = donnees

    // Trouver l'utilisateur par email
    const utilisateur = await User.findOne({ email })
    if (!utilisateur) {
      return { succes: false, message: "Email ou mot de passe incorrect" }
    }

    // Vérifier le mot de passe
    const motDePasseValide = await verifierMotDePasse(motDePasse, utilisateur.mot_de_passe)
    if (!motDePasseValide) {
      return { succes: false, message: "Email ou mot de passe incorrect" }
    }

    // Créer un objet utilisateur pour le token
    const objUtilisateur: TypeUtilisateur = {
      _id: utilisateur._id,
      prenom: utilisateur.prenom,
      nom: utilisateur.nom,
      email: utilisateur.email,
      role: utilisateur.role,
    }

    // Générer un token JWT
    const token = await genererToken(objUtilisateur)

    // Définir le cookie d'authentification
    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: seSouvenir ? 60 * 60 * 24 * 7 : 60 * 60 * 24, // 7 jours ou 1 jour
      path: "/",
    })

    return { succes: true, utilisateur: objUtilisateur, message: "Connexion réussie" }
  } catch (erreur) {
    console.error("Erreur lors de la connexion:", erreur)
    return { succes: false, message: "Une erreur est survenue lors de la connexion" }
  }
}

// Action pour la déconnexion
export async function actionDeconnexion() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  redirect("/")
}

// Fonction pour récupérer l'utilisateur actuel
export async function obtenirUtilisateurActuel() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return null
  }

  try {
    const decoded = await verifierToken(token)
    if (!decoded) {
      return null
    }

    await connectToDatabase()
    const utilisateur = await User.findById(decoded.id).select("-mot_de_passe")

    if (!utilisateur) {
      return null
    }

    return {
      _id: utilisateur._id,
      prenom: utilisateur.prenom,
      nom: utilisateur.nom,
      email: utilisateur.email,
      role: utilisateur.role,
    }
  } catch (erreur) {
    console.error("Erreur lors de la récupération de l'utilisateur:", erreur)
    return null
  }
}
