import { type NextRequest, NextResponse } from "next/server"
import { query } from "./db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

const JWT_SECRET = process.env.JWT_SECRET || "votre_cle_secrete_jwt_tres_securisee"
const JWT_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days in seconds

// Types
export interface User {
  id: string
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
export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
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

// Middleware pour vérifier l'authentification
export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.json({ error: "Token invalide" }, { status: 401 })
  }

  return decoded
}

// Fonction pour créer un utilisateur
export async function createUser(userData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  entrepreneurType: string
}) {
  try {
    const id = uuidv4()
    const { firstName, lastName, email, phone, password, entrepreneurType } = userData

    // Vérifier si l'utilisateur existe déjà
    const existingUsers = await query("SELECT id FROM users WHERE email = ?", [email])
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return { success: false, message: "Un utilisateur avec cet email existe déjà" }
    }

    // Hacher le mot de passe
    const hashedPassword = await hashPassword(password)

    await query(
      `INSERT INTO users (id, first_name, last_name, email, phone, password, entrepreneur_type) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, firstName, lastName, email, phone, hashedPassword, entrepreneurType],
    )

    return { success: true, message: "Inscription réussie" }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return { success: false, message: "Une erreur est survenue lors de l'inscription" }
  }
}

// Fonction pour connecter un utilisateur
export async function loginUser(email: string, password: string) {
  try {
    const users = await query("SELECT id, password, first_name, last_name, role FROM users WHERE email = ?", [email])

    if (!Array.isArray(users) || users.length === 0) {
      return { success: false, message: "Email ou mot de passe incorrect" }
    }

    const user = users[0] as any
    const passwordMatch = await verifyPassword(password, user.password)

    if (!passwordMatch) {
      return { success: false, message: "Email ou mot de passe incorrect" }
    }

    const userObj: User = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: email,
      role: user.role,
    }

    const token = generateToken(userObj)

    // Enregistrer la session
    const sessionId = uuidv4()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 jours

    await query("INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)", [
      sessionId,
      user.id,
      token,
      expiresAt,
    ])

    return {
      success: true,
      user: userObj,
      token,
      message: "Connexion réussie",
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return { success: false, message: "Une erreur est survenue lors de la connexion" }
  }
}

// Fonction pour déconnecter un utilisateur
export async function logoutUser(token: string) {
  try {
    await query("DELETE FROM sessions WHERE token = ?", [token])
    return { success: true, message: "Déconnexion réussie" }
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
    return { success: false, message: "Une erreur est survenue lors de la déconnexion" }
  }
}

// Fonction pour récupérer l'utilisateur actuel
export async function getCurrentUser(token: string) {
  try {
    const decoded = verifyToken(token)
    if (!decoded) {
      return null
    }

    const users = await query("SELECT id, first_name, last_name, email, role FROM users WHERE id = ?", [decoded.id])
    if (!Array.isArray(users) || users.length === 0) {
      return null
    }

    const user = users[0] as any
    return {
      id: user.id,
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
