"use client"

import { useEffect, useState } from "react"
import { getProjects } from "@/app/actions/projet"

interface Statistiques {
  totalProjets: number
  projetsParStatut: {
    en_attente: number
    en_cours: number
    approuve: number
    rejete: number
  }
  montantTotal: number
  montantParStatut: {
    en_attente: number
    en_cours: number
    approuve: number
    rejete: number
  }
}

export default function StatistiquesProjets() {
  const [statistiques, setStatistiques] = useState<Statistiques | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const chargerStatistiques = async () => {
      try {
        const resultat = await getProjects()
        if (resultat.succes && resultat.projets) {
          const projets = resultat.projets

          // Calculer les statistiques
          const stats: Statistiques = {
            totalProjets: projets.length,
            projetsParStatut: {
              en_attente: 0,
              en_cours: 0,
              approuve: 0,
              rejete: 0
            },
            montantTotal: 0,
            montantParStatut: {
              en_attente: 0,
              en_cours: 0,
              approuve: 0,
              rejete: 0
            }
          }

          projets.forEach((projet: any) => {
            // Compter les projets par statut
            stats.projetsParStatut[projet.statut as keyof typeof stats.projetsParStatut]++
            
            // Calculer les montants
            stats.montantTotal += projet.montant
            stats.montantParStatut[projet.statut as keyof typeof stats.montantParStatut] += projet.montant
          })

          setStatistiques(stats)
        } else {
          setError(resultat.message || "Erreur inconnue")
        }
      } catch (err) {
        setError("Erreur lors du chargement des statistiques")
      } finally {
        setLoading(false)
      }
    }

    chargerStatistiques()
  }, [])

  if (loading) return <div className="p-4">Chargement des statistiques...</div>
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>
  if (!statistiques) return null

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Statistiques des Projets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projets par statut */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Projets par Statut</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>En attente:</span>
              <span className="font-medium">{statistiques.projetsParStatut.en_attente}</span>
            </div>
            <div className="flex justify-between">
              <span>En cours:</span>
              <span className="font-medium">{statistiques.projetsParStatut.en_cours}</span>
            </div>
            <div className="flex justify-between">
              <span>Approuvés:</span>
              <span className="font-medium">{statistiques.projetsParStatut.approuve}</span>
            </div>
            <div className="flex justify-between">
              <span>Rejetés:</span>
              <span className="font-medium">{statistiques.projetsParStatut.rejete}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{statistiques.totalProjets}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Montants par statut */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Montants par Statut</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>En attente:</span>
              <span className="font-medium">{statistiques.montantParStatut.en_attente.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>En cours:</span>
              <span className="font-medium">{statistiques.montantParStatut.en_cours.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Approuvés:</span>
              <span className="font-medium">{statistiques.montantParStatut.approuve.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Rejetés:</span>
              <span className="font-medium">{statistiques.montantParStatut.rejete.toLocaleString()} FCFA</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{statistiques.montantTotal.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 