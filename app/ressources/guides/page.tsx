import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guides Pratiques - FGVEJ",
  description: "Guides pratiques pour les jeunes entrepreneurs",
}

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Guides Pratiques</h1>
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Guide de Création d'Entreprise</h2>
          <p className="text-gray-600 mb-4">
            Ce guide vous accompagne dans les étapes essentielles de la création de votre entreprise verte.
          </p>
          <a href="#" className="text-green-600 hover:text-green-700">
            Télécharger le guide →
          </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Guide de Financement</h2>
          <p className="text-gray-600 mb-4">
            Découvrez les différentes options de financement disponibles pour votre projet écologique.
          </p>
          <a href="#" className="text-green-600 hover:text-green-700">
            Télécharger le guide →
          </a>
        </div>
      </div>
    </div>
  )
} 