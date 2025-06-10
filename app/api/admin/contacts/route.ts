import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Contact from "@/models/Contact"
import { obtenirUtilisateurActuel } from "@/app/actions/authentification"

// GET /api/admin/contacts - Get all contacts
export async function GET() {
  try {
    // Check authentication
    const utilisateur = await obtenirUtilisateurActuel()
    if (!utilisateur || utilisateur.role !== "administrateur") {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    await connectToDatabase()
    const contacts = await Contact.find()
      .sort({ date_creation: -1 })
      .select("nom email telephone sujet message statut date_creation")

    return NextResponse.json(contacts)
  } catch (erreur) {
    console.error("Erreur lors de la récupération des contacts:", erreur)
    return NextResponse.json(
      { message: "Erreur lors de la récupération des contacts" },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/contacts - Update contact status
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

    const { id, statut } = await request.json()

    if (!id || !statut) {
      return NextResponse.json(
        { message: "ID et statut requis" },
        { status: 400 }
      )
    }

    await connectToDatabase()
    const contact = await Contact.findByIdAndUpdate(
      id,
      { statut },
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

// DELETE /api/admin/contacts - Delete a contact
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