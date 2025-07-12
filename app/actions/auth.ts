"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"

const JWT_SECRET = process.env.JWT_SECRET || "votre_cle_secrete_jwt_tres_securisee"
const JWT_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days in seconds

// Types
export interface UserType {
  _id: string
  first_name: string
  last_name: string
  email: string
  role: "user" | "admin"
}

// Fonction pour hacher un mot de passe
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

// Fonction pour vérifier un mot de passe
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Fonction pour générer un token JWT
export async function generateToken(user: UserType): Promise<string> {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

// Fonction pour vérifier un token JWT
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Action pour l'inscription
export async function registerAction(formData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  entrepreneurType: string
}) {
  try {
    await connectToDatabase()
    const { firstName, lastName, email, phone, password, entrepreneurType } = formData

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { success: false, message: "Un utilisateur avec cet email existe déjà" }
    }

    // Hacher le mot de passe
    const hashedPassword = await hashPassword(password)

    // Créer un nouvel utilisateur
    const newUser = await User.create({
      _id: uuidv4(),
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      password: hashedPassword,
      entrepreneur_type: entrepreneurType,
    })

    console.log("Utilisateur créé avec succès:", newUser)

    return { success: true, message: "Inscription réussie" }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return { success: false, message: "Une erreur est survenue lors de l'inscription" }
  }
}

// Action pour la connexion
export async function loginAction(formData: {
  email: string
  password: string
  rememberMe: boolean
}) {
  try {
    await connectToDatabase()
    const { email, password, rememberMe } = formData

    // Trouver l'utilisateur par email
    const user = await User.findOne({ email })
    if (!user) {
      return { success: false, message: "Email ou mot de passe incorrect" }
    }

    // Vérifier le mot de passe
    const passwordMatch = await verifyPassword(password, user.password)
    if (!passwordMatch) {
      return { success: false, message: "Email ou mot de passe incorrect" }
    }

    // Créer un objet utilisateur pour le token
    const userObj: UserType = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    }

    // Générer un token JWT
    const token = await generateToken(userObj)

    // Définir le cookie d'authentification
    const cookieStore = cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24, // 7 jours ou 1 jour
      path: "/",
    })

    return { success: true, user: userObj, message: "Connexion réussie" }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return { success: false, message: "Une erreur est survenue lors de la connexion" }
  }
}

// Action pour la déconnexion
export async function logoutAction() {
  const cookieStore = cookies()
  cookieStore.delete("token")
  redirect("/")
}

// Fonction pour récupérer l'utilisateur actuel
export async function getCurrentUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return null
  }

  try {
    const decoded = verifyToken(token)
    if (!decoded) {
      return null
    }

    await connectToDatabase()
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return null
    }

    return {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return null
  }
}

// Fonction pour récupérer tous les utilisateurs (pour les statistiques)
export async function getAllUsers() {
  try {
    await connectToDatabase();
    const users = await User.find({}, "_id first_name last_name email role created_at");
    return { success: true, users };
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return { success: false, message: "Une erreur est survenue lors de la récupération des utilisateurs" };
  }
}
