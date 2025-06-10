import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Project from "@/models/Project"

export async function GET() {
  try {
    const conn = await connectToDatabase()
    if (!conn) {
      return new NextResponse("Erreur de connexion à la base de données", { status: 500 })
    }

    const projets = await Project.find()
    return NextResponse.json(projets)
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error)
    return new NextResponse("Erreur serveur", { status: 500 })
  }
}

