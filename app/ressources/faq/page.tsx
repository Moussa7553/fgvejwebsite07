import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - FGVEJ",
  description: "Questions fréquemment posées sur FGVEJ",
}

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Questions Fréquemment Posées</h1>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Qui peut bénéficier du fonds de garantie ?</h2>
          <p className="text-gray-600">
            Le fonds de garantie est destiné aux jeunes entrepreneurs maliens âgés de 18 à 35 ans, porteurs de projets écologiques et durables.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quels types de projets sont éligibles ?</h2>
          <p className="text-gray-600">
            Les projets éligibles doivent avoir un impact positif sur l'environnement et contribuer au développement durable. Cela inclut les projets dans les domaines des énergies renouvelables, de l'agriculture durable, de la gestion des déchets, etc.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Comment soumettre un projet ?</h2>
          <p className="text-gray-600">
            Vous pouvez soumettre votre projet en remplissant le formulaire en ligne disponible dans la section "Soumettre un projet". Assurez-vous d'avoir tous les documents requis avant de commencer.
          </p>
        </div>
      </div>
    </div>
  )
} 