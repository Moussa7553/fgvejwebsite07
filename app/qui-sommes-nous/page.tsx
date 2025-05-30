import { Card, CardContent } from "@/components/ui/card"
import { Target, Award } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PageQuiSommesNous() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section Héro */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Qui Sommes-Nous ?</h1>
          <p className="text-xl max-w-3xl">
            Découvrez l'histoire, la mission et les valeurs du Fonds de Garantie Verte pour les Jeunes Entrepreneurs
            (FGVEJ).
          </p>
        </div>
      </section>

      {/* Section Histoire et Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <p className="text-gray-700 mb-6">
                Créé pour répondre aux défis écologiques actuels, le Fonds de Garantie Verte pour les Jeunes
                Entrepreneurs (FGVEJ) est né d'un engagement fort envers le développement durable et l'entrepreneuriat.
                FGVEJ s'est fixé comme mission de soutenir les jeunes entrepreneurs de 18 à 35 ans qui souhaitent
                développer des projets ayant un impact positif sur l'environnement, en facilitant leur accès aux
                financements et aux ressources nécessaires.
              </p>
              <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
              <p className="text-gray-700 mb-6">
                Nous croyons que la transition vers une économie verte commence par les initiatives locales. La mission
                de FGVEJ est de lever les obstacles financiers rencontrés par les jeunes entrepreneurs verts, en leur
                offrant des garanties de prêt, un accompagnement stratégique et une formation en pratiques écologiques.
                Ensemble, nous œuvrons pour un futur plus durable et plus inclusif.
              </p>
              <div className="bg-green-700 hover:bg-green-800 text-white rounded-lg p-6 transition-all duration-300 shadow-lg">
                <Button asChild className="bg-white text-green-700 hover:bg-gray-100 hover:text-green-800 mt-4">
                  <Link href="/nos-services">En Savoir Plus Sur Nos Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/Qui sommes nous img.jpg"
                alt="FGVEJ Mission"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Objectifs et Valeurs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Objectifs et Valeurs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">Objectifs</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <p>
                      <strong>Faciliter l'accès au financement :</strong> En prenant en charge les frais de garantie,
                      nous permettons aux jeunes entrepreneurs d'obtenir des prêts sans les frais additionnels qui
                      freinent souvent leur développement.
                    </p>
                  </li>
                  <li className="flex">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <p>
                      <strong>Promouvoir des projets écologiques :</strong> FGVEJ sélectionne des projets ayant un
                      impact écologique mesurable pour contribuer à la protection de l'environnement.
                    </p>
                  </li>
                  <li className="flex">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <p>
                      <strong>Créer des emplois durables :</strong> En soutenant l'entrepreneuriat vert, nous
                      participons à la création d'emplois responsables, favorisant le développement économique local.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">Valeurs</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <p>
                      <strong>Engagement écologique :</strong> FGVEJ soutient les initiatives qui visent la préservation
                      de l'environnement et la réduction des émissions de carbone.
                    </p>
                  </li>
                  <li className="flex">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <p>
                      <strong>Inclusion et accessibilité :</strong> Nous croyons que chaque jeune entrepreneur doit
                      pouvoir accéder aux financements, indépendamment de sa situation socio-économique.
                    </p>
                  </li>
                  <li className="flex">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <p>
                      <strong>Innovation et durabilité :</strong> Nous encourageons les projets innovants qui intègrent
                      des pratiques durables pour répondre aux défis écologiques.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Équipe et Gouvernance */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Équipe et Gouvernance</h2>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Une Équipe Engagée pour un Avenir Durable</h3>
            <p className="text-gray-700 mb-8 max-w-4xl">
              Notre équipe est composée d'experts dans les domaines de la finance, de la durabilité, et de
              l'accompagnement des entrepreneurs. Nous mettons notre expertise au service des jeunes entrepreneurs pour
              les aider à réaliser leurs projets écologiques avec succès.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/Screenshot 2025-05-22 094056.png"
                      alt="Président de la SAS"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Président de la SAS</h4>
                  <p className="text-gray-600">
                    Assure la direction globale de FGVEJ, en veillant à l'accomplissement de sa mission et en
                    représentant le fonds auprès des partenaires et investisseurs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt="Directeur Financier et Opérationnel"
                      fill
                      sizes="(max-width: 768px) 160px, 160px"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Directeur Financier et Opérationnel</h4>
                  <p className="text-gray-600">
                    Responsable de la gestion financière, des relations avec les banques, et du respect des critères de
                    garantie.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt="Spécialiste en Développement Durable"
                      fill
                      sizes="(max-width: 768px) 160px, 160px"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Spécialiste en Développement Durable</h4>
                  <p className="text-gray-600">
                    Chargé d'évaluer l'impact écologique des projets, de conseiller les entrepreneurs sur les meilleures
                    pratiques vertes, et de garantir l'alignement avec les objectifs de durabilité de FGVEJ.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt="Équipe de Suivi et d'Accompagnement"
                      fill
                      sizes="(max-width: 768px) 160px, 160px"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Équipe de Suivi et d'Accompagnement</h4>
                  <p className="text-gray-600">
                    Accompagne les entrepreneurs dans la structuration de leurs projets et assure un suivi tout au long
                    de leur développement pour optimiser leur réussite.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Notre Conseil Consultatif</h3>
            <p className="text-gray-700 max-w-4xl">
              Composé d'experts en finance verte, en entrepreneuriat, et en développement durable, le Conseil
              Consultatif conseille et oriente FGVEJ dans ses décisions stratégiques. Leur expérience est essentielle
              pour assurer la pérennité et l'impact de nos actions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
