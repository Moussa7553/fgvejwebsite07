"use client"

import { useState } from "react"

interface Filtres {
  recherche: string
  statut: string
  montantMin: string
  montantMax: string
  dateDebut: string
  dateFin: string
}

interface Props {
  onFiltresChange: (filtres: Filtres) => void
}

export default function RechercheProjets({ onFiltresChange }: Props) {
  const [filtres, setFiltres] = useState<Filtres>({
    recherche: "",
    statut: "",
    montantMin: "",
    montantMax: "",
    dateDebut: "",
    dateFin: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const nouveauxFiltres = { ...filtres, [name]: value }
    setFiltres(nouveauxFiltres)
    onFiltresChange(nouveauxFiltres)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Rechercher et Filtrer</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Recherche par texte */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recherche
          </label>
          <input
            type="text"
            name="recherche"
            value={filtres.recherche}
            onChange={handleChange}
            placeholder="Rechercher par titre, nom..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Filtre par statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            name="statut"
            value={filtres.statut}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="en_cours">En cours</option>
            <option value="approuve">Approuvé</option>
            <option value="rejete">Rejeté</option>
          </select>
        </div>

        {/* Filtre par montant */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Montant min
            </label>
            <input
              type="number"
              name="montantMin"
              value={filtres.montantMin}
              onChange={handleChange}
              placeholder="Min"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Montant max
            </label>
            <input
              type="number"
              name="montantMax"
              value={filtres.montantMax}
              onChange={handleChange}
              placeholder="Max"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Filtre par date */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date début
            </label>
            <input
              type="date"
              name="dateDebut"
              value={filtres.dateDebut}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date fin
            </label>
            <input
              type="date"
              name="dateFin"
              value={filtres.dateFin}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 