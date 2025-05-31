import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Info, DollarSign } from "lucide-react"
import Link from "next/link"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-green-600">
              FGVEJ
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-600">
                Accueil
              </Link>
              <Link href="/nos-services" className="text-gray-600 hover:text-green-600">
                Services
              </Link>
              <Link href="/soumettre-projet" className="text-gray-600 hover:text-green-600">
                Soumettre un projet
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Toutes les informations officielles sur nos critères, processus et conditions de financement
          </p>
        </div>

        {/* Critères d'éligibilité */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Critères d'éligibilité</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-600 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Critères obligatoires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { critere: "Âge", detail: "Entre 18 et 35 ans" },
                    { critere: "Nationalité", detail: "Malien ou résident légal" },
                    { critere: "Projet", detail: "Axé sur l'environnement/développement durable" },
                    { critere: "Innovation", detail: "Solution innovante ou amélioration significative" },
                    { critere: "Viabilité", detail: "Modèle économique viable et durable" },
                    { critere: "Impact", detail: "Impact positif mesurable sur l'environnement" },
                  ].map((item, index) => (
                    <li key={index} className="border-l-4 border-green-500 pl-4">
                      <div className="font-semibold text-gray-900">{item.critere}</div>
                      <div className="text-gray-600">{item.detail}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  Critères préférentiels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { critere: "Formation", detail: "Formation en entrepreneuriat ou domaine technique" },
                    { critere: "Expérience", detail: "Expérience préalable dans le secteur" },
                    { critere: "Partenariats", detail: "Collaborations avec d'autres organisations" },
                    { critere: "Équipe", detail: "Équipe multidisciplinaire compétente" },
                    { critere: "Marché", detail: "Étude de marché approfondie" },
                    { critere: "Financement", detail: "Contribution personnelle ou co-financement" },
                  ].map((item, index) => (
                    <li key={index} className="border-l-4 border-orange-500 pl-4">
                      <div className="font-semibold text-gray-900">{item.critere}</div>
                      <div className="text-gray-600">{item.detail}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Types de financement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types de financement disponibles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: "Subvention",
                montant: "500K - 2M FCFA",
                description: "Financement non remboursable pour les projets à fort impact social",
                avantages: ["Pas de remboursement", "Accompagnement inclus", "Formation gratuite"],
                badge: "Populaire",
              },
              {
                type: "Prêt à taux préférentiel",
                montant: "1M - 5M FCFA",
                description: "Prêt à taux réduit avec période de grâce",
                avantages: ["Taux avantageux", "Période de grâce", "Remboursement flexible"],
                badge: "Recommandé",
              },
              {
                type: "Garantie bancaire",
                montant: "2M - 10M FCFA",
                description: "Garantie pour faciliter l'accès au crédit bancaire",
                avantages: ["Accès facilité", "Montants élevés", "Partenariat bancaire"],
                badge: "Premium",
              },
            ].map((financement, index) => (
              <Card key={index} className="relative">
                {financement.badge && (
                  <Badge className="absolute -top-2 -right-2 bg-green-600">{financement.badge}</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{financement.type}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-gray-900">{financement.montant}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{financement.description}</p>
                  <ul className="space-y-2">
                    {financement.avantages.map((avantage, avIndex) => (
                      <li key={avIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>{avantage}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Processus d'évaluation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Processus d'évaluation</h2>
          <div className="space-y-6">
            {[
              {
                phase: "Phase 1 - Pré-sélection",
                duree: "5 jours",
                description: "Vérification des critères d'éligibilité et complétude du dossier",
                criteres: ["Âge et nationalité", "Complétude du dossier", "Secteur d'activité", "Innovation apparente"],
              },
              {
                phase: "Phase 2 - Évaluation technique",
                duree: "10 jours",
                description: "Analyse approfondie du projet par nos experts sectoriels",
                criteres: ["Faisabilité technique", "Viabilité économique", "Impact environnemental", "Équipe projet"],
              },
              {
                phase: "Phase 3 - Comité de sélection",
                duree: "7 jours",
                description: "Présentation devant le comité et décision finale",
                criteres: ["Présentation orale", "Défense du projet", "Questions-réponses", "Délibération"],
              },
              {
                phase: "Phase 4 - Notification",
                duree: "3 jours",
                description: "Communication de la décision et modalités de financement",
                criteres: [
                  "Notification officielle",
                  "Conditions de financement",
                  "Planning de décaissement",
                  "Suivi prévu",
                ],
              },
            ].map((phase, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-green-600">{phase.phase}</CardTitle>
                      <CardDescription>{phase.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{phase.duree}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {phase.criteres.map((critere, cIndex) => (
                      <div key={cIndex} className="flex items-center">
                        <Info className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm">{critere}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conditions de remboursement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Conditions de remboursement</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-600 flex items-center">
                  <DollarSign className="w-6 h-6 mr-2" />
                  Modalités générales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Taux d'intérêt</h4>
                    <p className="text-gray-600">2% à 5% selon le type de financement</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Période de grâce</h4>
                    <p className="text-gray-600">6 à 12 mois selon le projet</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Durée de remboursement</h4>
                    <p className="text-gray-600">2 à 5 ans maximum</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Garanties</h4>
                    <p className="text-gray-600">Selon le montant et le profil</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-600">Accompagnement inclus</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Suivi mensuel du projet",
                    "Formation en gestion d'entreprise",
                    "Mise en réseau avec d'autres entrepreneurs",
                    "Accompagnement technique spécialisé",
                    "Aide à la commercialisation",
                    "Support administratif et légal",
                  ].map((service, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Besoin de plus d'informations ?</h3>
          <p className="text-gray-600 mb-8">Notre équipe est là pour répondre à toutes vos questions</p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/contact"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Nous contacter
            </Link>
            <Link
              href="/guide-pratique"
              className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Guide pratique
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">FGVEJ</h3>
            <p className="text-gray-400 mb-8">Fonds de Garantie pour les Jeunes Entrepreneurs Verts</p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white">
                Accueil
              </Link>
              <Link href="/guide-pratique" className="text-gray-400 hover:text-white">
                Guide
              </Link>
              <Link href="/documentation" className="text-gray-400 hover:text-white">
                Documentation
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
