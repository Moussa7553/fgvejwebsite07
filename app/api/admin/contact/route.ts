import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Contact from "@/models/Contact"
import { obtenirUtilisateurActuel } from "@/app/actions/authentification"

// GET /api/admin/contact - Get a single contact
export async function GET(request: Request) {
  try {
    // Check authentication
    const utilisateur = await obtenirUtilisateurActuel()
    if (!utilisateur || utilisateur.role !== "administrateur") {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { message: "ID requis" },
        { status: 400 }
      )
    }

    await connectToDatabase()
    const contact = await Contact.findById(id)

    if (!contact) {
      return NextResponse.json(
        { message: "Contact non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json(contact)
  } catch (erreur) {
    console.error("Erreur lors de la récupération du contact:", erreur)
    return NextResponse.json(
      { message: "Erreur lors de la récupération du contact" },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/contact - Update a contact
export async function PATCH(request: Request) {
  try {
    // Check authentication
    const utilisateur = await obtenirUtilisateurActuel()
    if (!utilisateur || utilisateur.role !== "administrateur") {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        { message: "ID requis" },
        { status: 400 }
      )
    }

    await connectToDatabase()
    const contact = await Contact.findByIdAndUpdate(
      id,
      { ...updates },
      { new: true }
    )

    if (!contact) {
      return NextResponse.json(
        { message: "Contact non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json(contact)
  } catch (erreur) {
    console.error("Erreur lors de la mise à jour du contact:", erreur)
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour du contact" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/contact - Delete a contact
export async function DELETE(request: Request) {
  try {
    // Check authentication
    const utilisateur = await obtenirUtilisateurActuel()
    if (!utilisateur || utilisateur.role !== "administrateur") {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { message: "ID requis" },
        { status: 400 }
      )
    }

    await connectToDatabase()
    const contact = await Contact.findByIdAndDelete(id)

    if (!contact) {
      return NextResponse.json(
        { message: "Contact non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Contact supprimé avec succès" })
  } catch (erreur) {
    console.error("Erreur lors de la suppression du contact:", erreur)
    return NextResponse.json(
      { message: "Erreur lors de la suppression du contact" },
      { status: 500 }
    )
  }
} 