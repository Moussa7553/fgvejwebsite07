"use client"

import { useEffect, useState } from "react"
import { getProjects } from "@/app/actions/projet"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

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

export default function GraphiquesProjets() {
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
            stats.projetsParStatut[projet.statut as keyof typeof stats.projetsParStatut]++
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

  if (loading) return <div className="p-4">Chargement des graphiques...</div>
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>
  if (!statistiques) return null

  // Configuration du graphique en barres pour les montants
  const donneesMontants = {
    labels: ['En attente', 'En cours', 'Approuvés', 'Rejetés'],
    datasets: [
      {
        label: 'Montant (FCFA)',
        data: [
          statistiques.montantParStatut.en_attente,
          statistiques.montantParStatut.en_cours,
          statistiques.montantParStatut.approuve,
          statistiques.montantParStatut.rejete
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  // Configuration du graphique en camembert pour les projets
  const donneesProjets = {
    labels: ['En attente', 'En cours', 'Approuvés', 'Rejetés'],
    datasets: [
      {
        data: [
          statistiques.projetsParStatut.en_attente,
          statistiques.projetsParStatut.en_cours,
          statistiques.projetsParStatut.approuve,
          statistiques.projetsParStatut.rejete
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Graphiques des Projets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Graphique des montants */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Montants par Statut</h3>
          <div className="h-64">
            <Bar
              data={donneesMontants}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.raw?.toLocaleString()} FCFA`
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Graphique des projets */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Répartition des Projets</h3>
          <div className="h-64">
            <Pie
              data={donneesProjets}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 