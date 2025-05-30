import { NextResponse } from 'next/server'
import { testerConnexion } from '@/lib/mongodb'

export async function GET() {
  try {
    const result = await testerConnexion()
    return NextResponse.json({ success: result })
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur de connexion à MongoDB' },
      { status: 500 }
    )
  }
} 