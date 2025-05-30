import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Handshake, Building, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import NewsCard from "@/components/news-card"

export default function PartnershipsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Partenariats et Investissements</h1>
          <p className="text-xl max-w-3xl">
            Découvrez comment collaborer avec FGVEJ pour soutenir les jeunes entrepreneurs verts et contribuer à un
            avenir durable.
          </p>
        </div>
      </section>

      {/* Partnership Opportunities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-12">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Handshake className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold">Opportunités de Partenariat</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Unissez-vous à FGVEJ pour un Avenir Durable</h3>
              <p className="text-gray-700 mb-6">
                FGVEJ invite les banques, les institutions de financement, les entreprises, et les organisations de
                développement durable à rejoindre notre mission de soutien aux jeunes entrepreneurs verts. Grâce à des
                partenariats solides, nous contribuons ensemble à la transition écologique tout en favorisant
                l'innovation et la création d'emplois dans les secteurs verts.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg"
                alt="Partenariats FGVEJ"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Partenariats Bancaires</h3>
                <p className="text-gray-700">
                  FGVEJ collabore avec des banques pour réduire les risques financiers liés au financement des jeunes
                  entrepreneurs. En prenant en charge une partie de la garantie, FGVEJ permet aux banques de diversifier
                  leurs investissements tout en soutenant des projets à impact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Organisations de Développement Durable</h3>
                <p className="text-gray-700">
                  FGVEJ travaille avec des organisations nationales et internationales pour développer des solutions
                  durables qui favorisent l'impact social et écologique dans les communautés locales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Entreprises Privées</h3>
                <p className="text-gray-700">
                  En partenariat avec FGVEJ, les entreprises peuvent intégrer la durabilité dans leur modèle d'affaires
                  et répondre aux exigences en matière de responsabilité sociale (RSE).
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Engagement ESG (Environnemental, Social, Gouvernance)</h3>
            <p className="text-gray-700">
              En soutenant FGVEJ, les partenaires renforcent leur impact ESG en contribuant à des projets ayant des
              retombées positives sur l'environnement et les communautés.
            </p>
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-12">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold">Actualités et Événements</h2>
          </div>

          <h3 className="text-2xl font-semibold mb-6">
            Rejoignez nos Événements pour la Promotion de l'Entrepreneuriat Vert
          </h3>
          <p className="text-gray-700 mb-8 max-w-4xl">
            FGVEJ organise des événements et des ateliers pour échanger, sensibiliser et renforcer les collaborations
            autour de l'entrepreneuriat vert. Voici quelques événements à venir et récents :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <NewsCard
              title="Atelier de Sensibilisation pour les Partenaires Bancaires"
              description="Un événement destiné aux banques pour discuter des opportunités de financement durable avec FGVEJ."
              date="15 Juin 2024"
              href="/actualites/atelier-banques"
            />

            <NewsCard
              title="Rencontre des Partenaires FGVEJ"
              description="Un événement annuel rassemblant les investisseurs et partenaires pour partager les résultats des projets et discuter des futurs investissements."
              date="10 Décembre 2024"
              href="/actualites/rencontre-partenaires"
            />

            <NewsCard
              title="Conférence sur l'Entrepreneuriat Vert et les ODD"
              description="Une conférence en partenariat avec des agences de développement et des experts du secteur vert."
              date="20 Septembre 2024"
              href="/actualites/conference-odd"
            />
          </div>

          <div className="text-center mb-12">
            <h4 className="text-xl font-semibold mb-4">Vous souhaitez participer ?</h4>
            <p className="text-gray-700 mb-6">
              Consultez notre calendrier d'événements et inscrivez-vous pour découvrir comment FGVEJ collabore avec les
              acteurs de la finance durable pour un impact collectif.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/actualites/evenements">Voir le Calendrier des Événements</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How to Invest Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-12">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold">Comment Investir dans FGVEJ</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="order-2 lg:order-1 relative h-[300px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/Partnership-Firm.png"
                alt="Investir dans FGVEJ"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-semibold mb-6">Soutenez l'Émergence d'une Économie Verte en Afrique</h3>
              <p className="text-gray-700 mb-6">
                Les investissements dans FGVEJ permettent de soutenir des projets qui répondent aux défis
                environnementaux d'aujourd'hui. Nos investisseurs bénéficient de rapports réguliers sur l'impact de
                leurs contributions et peuvent suivre le développement des projets financés.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-6">Formes de Participation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">Investissements en Capital</h4>
                <p className="text-gray-700">
                  Contribution directe au capital de FGVEJ pour permettre un plus grand nombre de garanties et de
                  financements de projets verts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">Subventions Ciblées</h4>
                <p className="text-gray-700">
                  Financement destiné à des programmes spécifiques comme la formation en écologie ou le développement de
                  la plateforme numérique pour les entrepreneurs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">Partenariats Techniques et Financiers</h4>
                <p className="text-gray-700">
                  Apport de compétences et d'expertise pour améliorer les services offerts par FGVEJ et maximiser
                  l'impact des projets.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4">Contactez-nous pour en Savoir Plus</h4>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              FGVEJ est ouvert à toute forme de collaboration avec des investisseurs et partenaires désireux de faire
              partie du mouvement pour un développement durable en Afrique. Pour en savoir plus, contactez-nous dès
              aujourd'hui et discutons de la meilleure manière de contribuer ensemble à un avenir vert.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/contact">Nous Contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Logos Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Partenaires</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="relative h-16 w-full">
                  <Image
                    src={`/partner-logo-${i}.svg`}
                    alt={`Partenaire ${i}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
