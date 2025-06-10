import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Projet from "@/models/Project"

export async function GET() {
  try {
    const conn = await connectToDatabase()
    if (!conn) {
      return new NextResponse("Erreur de connexion à la base de données", { status: 500 })
    }

    const projets = await Projet.find()
      .sort({ date_creation: -1 })
      .select("titre description montant statut date_creation")

    return NextResponse.json(projets)
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error)
    return new NextResponse("Erreur lors de la récupération des projets", { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, statut } = await request.json()

    if (!id || !statut) {
      return new NextResponse("ID et statut requis", { status: 400 })
    }

    const conn = await connectToDatabase()
    if (!conn) {
      return new NextResponse("Erreur de connexion à la base de données", { status: 500 })
    }

    const projet = await Projet.findByIdAndUpdate(
      id,
      { 
        statut,
        date_modification: new Date()
      },
      { new: true }
    )

    if (!projet) {
      return new NextResponse("Projet non trouvé", { status: 404 })
    }

    return NextResponse.json(projet)
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet:", error)
    return new NextResponse("Erreur lors de la mise à jour du projet", { status: 500 })
  }
}