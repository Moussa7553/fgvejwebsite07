import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Notification from "@/models/Notification"

export async function GET() {
  try {
    const conn = await connectToDatabase()
    if (!conn) {
      return new NextResponse("Erreur de connexion à la base de données", { status: 500 })
    }

    // Get unread notifications
    const notifications = await Notification.find({ is_read: false })
      .sort({ date_creation: -1 })
      .limit(50)

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error)
    return new NextResponse("Erreur lors de la récupération des notifications", { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { notificationId } = await request.json()

    if (!notificationId) {
      return new NextResponse("ID de notification manquant", { status: 400 })
    }

    const conn = await connectToDatabase()
    if (!conn) {
      return new NextResponse("Erreur de connexion à la base de données", { status: 500 })
    }

    // Mark notification as read
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { is_read: true },
      { new: true }
    )

    if (!notification) {
      return new NextResponse("Notification non trouvée", { status: 404 })
    }

    return NextResponse.json(notification)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la notification:", error)
    return new NextResponse("Erreur lors de la mise à jour de la notification", { status: 500 })
  }
} 