import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Projet from "@/models/Project"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  console.log("Tentative de téléchargement du fichier avec l'ID:", id)
  
  try {
    const conn = await connectToDatabase()
    if (!conn) {
      console.error("Échec de la connexion à la base de données")
      return new NextResponse("Erreur de connexion à la base de données", { status: 500 })
    }

    // Trouver le projet qui contient le fichier
    const projet = await Projet.findOne({
      "fichiers.url": `/api/fichiers/${id}`
    })

    if (!projet) {
      console.log("Aucun projet trouvé contenant le fichier avec l'ID:", id)
      return new NextResponse("Fichier non trouvé", { status: 404 })
    }

    console.log("Projet trouvé:", {
      id: projet._id,
      titre: projet.titre,
      nombreFichiers: projet.fichiers.length
    })

    // Trouver le fichier correspondant
    const fichier = projet.fichiers.find((f: { url: string }) => f.url === `/api/fichiers/${id}`)

    if (!fichier) {
      console.log("Fichier non trouvé dans le projet pour l'URL:", `/api/fichiers/${id}`)
      return new NextResponse("Fichier non trouvé", { status: 404 })
    }

    if (!fichier.contenu) {
      console.log("Le fichier trouvé n'a pas de contenu:", fichier.nom)
      return new NextResponse("Contenu du fichier non disponible", { status: 404 })
    }

    console.log("Fichier trouvé:", {
      nom: fichier.nom,
      type: fichier.type,
      taille: fichier.taille
    })

    // Retourner le fichier
    return new NextResponse(fichier.contenu, {
      headers: {
        "Content-Type": fichier.type,
        "Content-Disposition": `inline; filename="${fichier.nom}"`,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier:", error)
    return new NextResponse("Erreur lors de la récupération du fichier", { status: 500 })
  }
} 