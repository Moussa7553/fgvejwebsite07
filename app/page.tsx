import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Award, BarChart, BookOpen, Users } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import NewsCard from "@/components/news-card"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-20">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fonds de Garantie Verte pour les Jeunes Entrepreneurs
            </h1>
            <p className="text-xl mb-8">
              Soutenir les jeunes entrepreneurs engagés dans des projets écologiques et durables. Notre mission est de
              faciliter l'accès aux financements pour ces entrepreneurs en réduisant les obstacles financiers grâce à
              des garanties de prêt, un accompagnement stratégique, et une formation en pratiques écologiques.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/plateforme">Accéder à la Plateforme</Link>
              </Button>
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <Link href="/qui-sommes-nous">En Savoir Plus</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
      </section>

      {/* Points Forts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Points Forts du FGVEJ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-t-4 border-t-green-600">
              <CardContent className="pt-6">
                <div className="mb-4 bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Garantie de Prêts à Taux Zéro</h3>
                <p className="text-gray-600">
                  FGVEJ prend en charge les frais de garantie auprès du FGSP, qui couvre jusqu'à 50% du financement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <CardContent className="pt-6">
                <div className="mb-4 bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accompagnement Personnalisé</h3>
                <p className="text-gray-600">
                  Nos experts aident les entrepreneurs à élaborer des plans d'affaires solides et adaptés à leurs
                  projets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <CardContent className="pt-6">
                <div className="mb-4 bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Formation en Pratiques Écologiques</h3>
                <p className="text-gray-600">
                  Formation de 5 jours en pratiques durables, financée par nos partenaires.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <CardContent className="pt-6">
                <div className="mb-4 bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Impact Écologique et Social</h3>
                <p className="text-gray-600">
                  Contribution à la préservation de l'environnement tout en favorisant la création d'emplois.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Access Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Accès Rapide à la Plateforme des Entrepreneurs Verts</h2>
            <p className="text-xl mb-8">
              Vous êtes un jeune entrepreneur vert ? Accédez directement à notre plateforme pour découvrir les services,
              vous inscrire, et soumettre votre projet. Rejoignez une communauté d'entrepreneurs engagés pour un avenir
              durable.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/plateforme">Accéder à la Plateforme</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Témoignages</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Grâce à FGVEJ, j'ai pu lancer mon projet de gestion des déchets plastiques et contribuer à la réduction de la pollution dans ma communauté. Leur soutien financier et technique m'a permis de concrétiser mon rêve."
              author="Aïcha S."
              role="Entrepreneure verte"
              imageSrc="/placeholder.svg"
            />

            <TestimonialCard
              quote="Le programme de formation en écologie m'a donné les compétences nécessaires pour intégrer des pratiques durables dans mon entreprise agricole. Aujourd'hui, je produis plus tout en consommant moins d'eau."
              author="Moussa K."
              role="Agriculteur durable"
              imageSrc="/placeholder.svg"
            />

            <TestimonialCard
              quote="Sans les frais de garantie pris en charge par FGVEJ, je n'aurais jamais pu obtenir le financement pour mon projet d'énergie solaire. Maintenant, plus de 100 foyers dans mon village ont accès à l'électricité."
              author="Fatou D."
              role="Entrepreneur en énergie renouvelable"
              imageSrc="/placeholder.svg"
            />
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Actualités et Événements</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NewsCard
              title="Prochain Atelier de Sensibilisation"
              description="« Financer et lancer son projet vert », le 15 Juin 2024. Inscrivez-vous dès maintenant pour participer."
              date="15 Juin 2024"
              href="/actualites/atelier-sensibilisation"
            />

            <NewsCard
              title="Rencontre Annuelle des Partenaires"
              description="Décembre 2024 - Réunion des acteurs du secteur vert pour favoriser les synergies et développer de nouveaux partenariats."
              date="10 Décembre 2024"
              href="/actualites/rencontre-partenaires"
            />

            <NewsCard
              title="Lancement du Programme de Mentorat"
              description="FGVEJ lance un nouveau programme de mentorat pour connecter les jeunes entrepreneurs avec des experts du secteur vert."
              date="1 Juillet 2024"
              href="/actualites/programme-mentorat"
            />
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              <Link href="/actualites">
                Voir toutes les actualités
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à lancer votre projet vert ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez FGVEJ et bénéficiez d'un soutien financier et technique pour faire la différence dans votre
            communauté.
          </p>
          <Button asChild size="lg" className="bg-white text-green-900 hover:bg-gray-100">
            <Link href="/soumettre-projet">Déposer Votre Projet</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
