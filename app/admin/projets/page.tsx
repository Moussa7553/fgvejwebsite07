"use client"

import { useEffect, useState } from "react"
import { getProjects, updateProjectStatus } from "@/app/actions/projet"
import StatistiquesProjets from "@/app/components/StatistiquesProjets"
import RechercheProjets from "@/app/components/RechercheProjets"
import ExportCSV from "@/app/components/ExportCSV"
import GraphiquesProjets from "@/app/components/GraphiquesProjets"
import Notifications from "@/app/components/Notifications"
import { io } from "socket.io-client"
import UserStatsCharts from "@/app/components/UserStatsCharts"

interface Fichier {
  nom: string
  type: string
  taille: number
  url: string
}

interface Projet {
  _id: string
  nom: string
  email: string
  telephone: string
  titre: string
  description: string
  montant: number
  fichiers: Fichier[]
  statut: string
  date_creation: string
}

const STATUTS = ["en_attente", "en_cours", "approuve", "rejete"]

export default function AdminProjets() {
  const [projets, setProjets] = useState<Projet[]>([])
  const [projetsFiltres, setProjetsFiltres] = useState<Projet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  const [downloadingFiles, setDownloadingFiles] = useState<string | null>(null)

  const chargerProjets = async () => {
    try {
      const resultat = await getProjects()
      if (resultat.succes && resultat.projets) {
        const projets = resultat.projets as Projet[]
        setProjets(projets)
        setProjetsFiltres(projets)
      } else {
        setError(resultat.message || "Erreur inconnue")
      }
    } catch (err) {
      setError("Erreur lors du chargement des projets")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    chargerProjets()
  }, [])

  useEffect(() => {
    // Connexion au serveur Socket.IO
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001")
    
    // Rejoindre la salle des administrateurs
    socket.emit("rejoindre_admin")

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleFiltresChange = (filtres: any) => {
    let resultats = [...projets]

    // Filtre par recherche
    if (filtres.recherche) {
      const recherche = filtres.recherche.toLowerCase()
      resultats = resultats.filter(projet => 
        projet.titre.toLowerCase().includes(recherche) ||
        projet.nom.toLowerCase().includes(recherche) ||
        projet.email.toLowerCase().includes(recherche)
      )
    }

    // Filtre par statut
    if (filtres.statut) {
      resultats = resultats.filter(projet => projet.statut === filtres.statut)
    }

    // Filtre par montant
    if (filtres.montantMin) {
      resultats = resultats.filter(projet => projet.montant >= Number(filtres.montantMin))
    }
    if (filtres.montantMax) {
      resultats = resultats.filter(projet => projet.montant <= Number(filtres.montantMax))
    }

    // Filtre par date
    if (filtres.dateDebut) {
      const dateDebut = new Date(filtres.dateDebut)
      resultats = resultats.filter(projet => new Date(projet.date_creation) >= dateDebut)
    }
    if (filtres.dateFin) {
      const dateFin = new Date(filtres.dateFin)
      resultats = resultats.filter(projet => new Date(projet.date_creation) <= dateFin)
    }

    setProjetsFiltres(resultats)
  }

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    setUpdatingStatus(projectId)
    try {
      const resultat = await updateProjectStatus(projectId, newStatus)
      if (resultat.succes) {
        // Mettre à jour la liste des projets
        await chargerProjets()
      } else {
        setError(resultat.message)
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut")
    } finally {
      setUpdatingStatus(null)
    }
  }

  const telechargerTousLesFichiers = async (projet: Projet) => {
    setDownloadingFiles(projet._id)
    try {
      for (const fichier of projet.fichiers) {
        const response = await fetch(fichier.url)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fichier.nom
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (err) {
      setError("Erreur lors du téléchargement des fichiers")
    } finally {
      setDownloadingFiles(null)
    }
  }

  if (loading) return <div className="p-4">Chargement des projets...</div>
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projets Soumis</h1>
        <div className="flex items-center gap-4">
          <Notifications />
          <ExportCSV projets={projetsFiltres} />
        </div>
      </div>
      
      {/* Statistiques */}
      <div className="mb-8">
        <StatistiquesProjets />
      </div>

      {/* Graphiques */}
      <div className="mb-8">
        <GraphiquesProjets />
      </div>

      {/* User Stats Charts */}
      <div className="mb-8">
        <UserStatsCharts />
      </div>

      {/* Recherche et filtres */}
      <div className="mb-8">
        <RechercheProjets onFiltresChange={handleFiltresChange} />
      </div>

      <div className="grid gap-4">
        {projetsFiltres.map((projet) => (
          <div key={projet._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{projet.titre}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Nom:</strong> {projet.nom}</p>
                <p><strong>Email:</strong> {projet.email}</p>
                <p><strong>Téléphone:</strong> {projet.telephone}</p>
                <p><strong>Montant:</strong> {projet.montant.toLocaleString()} FCFA</p>
                <div className="flex items-center gap-2">
                  <strong>Statut:</strong>
                  <select
                    value={projet.statut}
                    onChange={(e) => handleStatusChange(projet._id, e.target.value)}
                    disabled={updatingStatus === projet._id}
                    className="border rounded px-2 py-1"
                  >
                    {STATUTS.map((statut) => (
                      <option key={statut} value={statut}>
                        {statut.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                  {updatingStatus === projet._id && (
                    <span className="text-sm text-gray-500">Mise à jour...</span>
                  )}
                </div>
                <p><strong>Date:</strong> {new Date(projet.date_creation).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Description:</h3>
                <p className="mb-4">{projet.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Fichiers:</h3>
                  {projet.fichiers.length > 0 && (
                    <button
                      onClick={() => telechargerTousLesFichiers(projet)}
                      disabled={downloadingFiles === projet._id}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                      {downloadingFiles === projet._id ? "Téléchargement..." : "Tout télécharger"}
                    </button>
                  )}
                </div>
                <ul className="list-disc pl-5">
                  {projet.fichiers.map((fichier, index) => (
                    <li key={index} className="mb-2">
                      <a 
                        href={fichier.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {fichier.nom}
                      </a>
                      <span className="text-gray-500 ml-2">
                        ({(fichier.taille / 1024).toFixed(2)} KB)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 