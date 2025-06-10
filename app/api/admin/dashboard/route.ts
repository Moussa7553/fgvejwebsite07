import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Projet from "@/models/Project"
import Contact from "@/models/Contact"
import Notification from "@/models/Notification"

export async function GET() {
  try {
    const conn = await connectToDatabase()
    if (!conn) {
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      )
    }

    // Fetch recent projects
    const recentProjects = await Projet.find()
      .sort({ date_creation: -1 })
      .limit(5)
      .select("titre categorie statut date_creation")

    // Fetch recent contact messages
    const recentContacts = await Contact.find()
      .sort({ date_creation: -1 })
      .limit(5)
      .select("nom email sujet message statut date_creation")

    // Fetch unread notifications
    const unreadNotifications = await Notification.find({ is_read: false })
      .sort({ created_at: -1 })
      .limit(5)

    // Get counts
    const totalProjects = await Projet.countDocuments()
    const totalContacts = await Contact.countDocuments()
    const pendingProjects = await Projet.countDocuments({ statut: "en_attente" })
    const unreadMessages = await Contact.countDocuments({ statut: "non_lu" })

    return NextResponse.json({
      recentProjects,
      recentContacts,
      unreadNotifications,
      stats: {
        totalProjects,
        totalContacts,
        pendingProjects,
        unreadMessages,
      },
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json(
      { error: "Error fetching dashboard data" },
      { status: 500 }
    )
  }
} 