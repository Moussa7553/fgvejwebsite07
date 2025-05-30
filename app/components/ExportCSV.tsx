"use client"

interface Projet {
  _id: string
  nom: string
  email: string
  telephone: string
  titre: string
  description: string
  montant: number
  statut: string
  date_creation: string
}

interface Props {
  projets: Projet[]
}

export default function ExportCSV({ projets }: Props) {
  const exporterCSV = () => {
    // Préparer les en-têtes
    const enTetes = [
      "ID",
      "Nom",
      "Email",
      "Téléphone",
      "Titre",
      "Description",
      "Montant (FCFA)",
      "Statut",
      "Date de création"
    ]

    // Préparer les données
    const lignes = projets.map(projet => [
      projet._id,
      projet.nom,
      projet.email,
      projet.telephone,
      projet.titre,
      projet.description,
      projet.montant,
      projet.statut,
      new Date(projet.date_creation).toLocaleDateString()
    ])

    // Créer le contenu CSV
    const contenuCSV = [
      enTetes.join(","),
      ...lignes.map(ligne => ligne.map(cellule => `"${cellule}"`).join(","))
    ].join("\n")

    // Créer le blob et le lien de téléchargement
    const blob = new Blob([contenuCSV], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const lien = document.createElement("a")
    lien.href = url
    lien.setAttribute("download", `projets_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(lien)
    lien.click()
    document.body.removeChild(lien)
    window.URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={exporterCSV}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Exporter en CSV
    </button>
  )
} 