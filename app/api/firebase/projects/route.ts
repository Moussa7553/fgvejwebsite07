import { NextResponse } from "next/server"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { firebaseApp } from "@/lib/firebase-config"

const db = getFirestore(firebaseApp)

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "projects"))
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Erreur Firebase:", error)
    return NextResponse.json({ error: "Erreur Firebase" }, { status: 500 })
  }
}
