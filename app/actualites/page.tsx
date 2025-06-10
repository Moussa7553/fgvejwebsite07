import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Actualités - FGVEJ",
  description: "Dernières actualités de FGVEJ",
}

export default function ActualitesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Actualités</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-sm text-gray-500 mb-2">12 Mars 2024</div>
          <h2 className="text-xl font-semibold mb-4">Lancement du Programme de Formation</h2>
          <p className="text-gray-600 mb-4">
            FGVEJ lance un nouveau programme de formation pour les jeunes entrepreneurs dans le domaine des énergies renouvelables.
          </p>
          <a href="#" className="text-green-600 hover:text-green-700">
            Lire la suite →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-sm text-gray-500 mb-2">5 Mars 2024</div>
          <h2 className="text-xl font-semibold mb-4">Partenariat avec les Banques Locales</h2>
          <p className="text-gray-600 mb-4">
            FGVEJ renforce ses partenariats avec les banques locales pour faciliter l'accès au financement.
          </p>
          <a href="#" className="text-green-600 hover:text-green-700">
            Lire la suite →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-sm text-gray-500 mb-2">1 Mars 2024</div>
          <h2 className="text-xl font-semibold mb-4">Succès des Projets Financés</h2>
          <p className="text-gray-600 mb-4">
            Découvrez les succès des premiers projets financés par FGVEJ et leur impact sur l'environnement.
          </p>
          <a href="#" className="text-green-600 hover:text-green-700">
            Lire la suite →
          </a>
        </div>
      </div>
    </div>
  )
} 