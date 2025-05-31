import { NextResponse } from "next/server"
import { connecterBaseDeDonnees } from "@/lib/mongodb"
import Projet from "@/modeles/Projet"

export async function GET() {
  try {
    const conn = await connecterBaseDeDonnees()
    if (!conn) {
      return new NextResponse("Erreur de connexion à la base de données", { status: 500 })
    }

    const projets = await Projet.find()
    return NextResponse.json(projets)
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error)
    return new NextResponse("Erreur serveur", { status: 500 })
  }
}