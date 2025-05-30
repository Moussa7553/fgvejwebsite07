import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Configuration
const UPLOAD_DIR = process.env.UPLOAD_DIR || "public/uploads"
const MAX_FILE_SIZE = Number.parseInt(process.env.MAX_FILE_SIZE || "10485760") // 10MB par défaut

// Types de fichiers autorisés
const ALLOWED_FILE_TYPES = {
  "application/pdf": ".pdf",
  "application/vnd.ms-powerpoint": ".ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/ogg": ".ogv",
}

// Fonction pour vérifier si un type de fichier est autorisé
export function isAllowedFileType(mimeType: string): boolean {
  return Object.keys(ALLOWED_FILE_TYPES).includes(mimeType)
}

// Fonction pour obtenir l'extension à partir du type MIME
export function getExtensionFromMimeType(mimeType: string): string {
  return ALLOWED_FILE_TYPES[mimeType as keyof typeof ALLOWED_FILE_TYPES] || ""
}

// Fonction pour créer le répertoire d'upload s'il n'existe pas
export function ensureUploadDir(subDir = ""): string {
  const dir = path.join(process.cwd(), UPLOAD_DIR, subDir)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return dir
}

// Fonction pour sauvegarder un fichier
export async function saveFile(
  file: File,
  subDir = "",
): Promise<{ success: boolean; filePath?: string; error?: string }> {
  try {
    // Vérifier la taille du fichier
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `La taille du fichier dépasse la limite autorisée de ${MAX_FILE_SIZE / 1024 / 1024} MB`,
      }
    }

    // Vérifier le type de fichier
    if (!isAllowedFileType(file.type)) {
      return {
        success: false,
        error: "Type de fichier non autorisé",
      }
    }

    // Créer le répertoire d'upload
    const uploadDir = ensureUploadDir(subDir)

    // Générer un nom de fichier unique
    const fileExtension = getExtensionFromMimeType(file.type)
    const fileName = `${uuidv4()}${fileExtension}`
    const filePath = path.join(subDir, fileName)
    const fullPath = path.join(uploadDir, fileName)

    // Lire le contenu du fichier
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Écrire le fichier
    fs.writeFileSync(fullPath, buffer)

    return {
      success: true,
      filePath: `/${UPLOAD_DIR}/${filePath}`.replace(/\\/g, "/"),
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du fichier:", error)
    return {
      success: false,
      error: "Une erreur est survenue lors de la sauvegarde du fichier",
    }
  }
}

// Fonction pour supprimer un fichier
export function deleteFile(filePath: string): boolean {
  try {
    const fullPath = path.join(process.cwd(), filePath.startsWith("/") ? filePath.slice(1) : filePath)

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
      return true
    }

    return false
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier:", error)
    return false
  }
}

// Fonction pour obtenir les informations d'un fichier
export function getFileInfo(filePath: string): { exists: boolean; size?: number; type?: string } {
  try {
    const fullPath = path.join(process.cwd(), filePath.startsWith("/") ? filePath.slice(1) : filePath)

    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath)
      const ext = path.extname(fullPath).toLowerCase()

      // Mapper l'extension au type MIME
      const mimeTypes: Record<string, string> = {
        ".pdf": "application/pdf",
        ".ppt": "application/vnd.ms-powerpoint",
        ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ".doc": "application/msword",
        ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ".xls": "application/vnd.ms-excel",
        ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".mp4": "video/mp4",
        ".webm": "video/webm",
        ".ogv": "video/ogg",
      }

      return {
        exists: true,
        size: stats.size,
        type: mimeTypes[ext] || "application/octet-stream",
      }
    }

    return { exists: false }
  } catch (error) {
    console.error("Erreur lors de la récupération des informations du fichier:", error)
    return { exists: false }
  }
}
