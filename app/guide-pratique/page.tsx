import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileText, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function GuidePratiquePage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Guide Pratique</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que vous devez savoir pour soumettre votre projet et obtenir un financement
          </p>
        </div>

        {/* Étapes de soumission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Étapes de soumission de votre projet</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Préparation",
                description: "Rassemblez tous les documents nécessaires",
                icon: FileText,
              },
              {
                step: "2",
                title: "Soumission",
                description: "Remplissez le formulaire en ligne",
                icon: Users,
              },
              {
                step: "3",
                title: "Évaluation",
                description: "Notre équipe examine votre dossier",
                icon: Clock,
              },
              {
                step: "4",
                title: "Décision",
                description: "Réponse sous 30 jours ouvrables",
                icon: CheckCircle,
              },
            ].map((etape, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <etape.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Étape {etape.step}</CardTitle>
                  <CardDescription className="font-semibold">{etape.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{etape.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Documents requis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Documents requis</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-600">Documents obligatoires</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Plan d'affaires détaillé",
                    "Étude de faisabilité",
                    "Budget prévisionnel",
                    "CV du porteur de projet",
                    "Copie de la pièce d'identité",
                    "Justificatif de domicile",
                    "Attestation de formation (si applicable)",
                  ].map((doc, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-600">Documents complémentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Lettres de recommandation",
                    "Preuves d'expérience",
                    "Partenariats existants",
                    "Études de marché",
                    "Autorisations légales",
                    "Photos du projet",
                    "Témoignages clients",
                  ].map((doc, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-5 h-5 border-2 border-green-500 rounded mr-3"></div>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conseils pratiques */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Conseils pour réussir votre candidature</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Soyez précis",
                description: "Décrivez clairement votre projet, ses objectifs et son impact environnemental.",
                tips: ["Utilisez des données chiffrées", "Expliquez la valeur ajoutée", "Montrez l'innovation"],
              },
              {
                title: "Préparez votre budget",
                description: "Un budget détaillé et réaliste renforce la crédibilité de votre projet.",
                tips: ["Détaillez chaque poste", "Justifiez les montants", "Prévoyez une marge"],
              },
              {
                title: "Montrez votre engagement",
                description: "Démontrez votre passion et votre détermination à réussir.",
                tips: ["Partagez votre vision", "Montrez vos compétences", "Prouvez votre motivation"],
              },
            ].map((conseil, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{conseil.title}</CardTitle>
                  <CardDescription>{conseil.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {conseil.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-6">
            {[
              {
                question: "Quel est le montant maximum de financement ?",
                reponse: "Le montant varie selon le type de projet, généralement entre 500 000 et 10 000 000 FCFA.",
              },
              {
                question: "Combien de temps prend l'évaluation ?",
                reponse:
                  "L'évaluation complète prend entre 15 et 30 jours ouvrables après réception du dossier complet.",
              },
              {
                question: "Puis-je soumettre plusieurs projets ?",
                reponse:
                  "Oui, mais nous recommandons de se concentrer sur un projet à la fois pour maximiser vos chances.",
              },
              {
                question: "Y a-t-il des frais de dossier ?",
                reponse: "Non, la soumission et l'évaluation de votre dossier sont entièrement gratuites.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.reponse}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à soumettre votre projet ?</h3>
          <p className="text-gray-600 mb-8">Suivez notre guide et maximisez vos chances d'obtenir un financement</p>
          <Link
            href="/soumettre-projet"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Soumettre mon projet
          </Link>
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
