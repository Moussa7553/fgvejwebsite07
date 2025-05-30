import mongoose from 'mongoose';
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import ProjectCard from "@/components/project-card"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Projets Financés et Témoignages</h1>
          <p className="text-xl max-w-3xl">
            Découvrez les projets soutenus par FGVEJ et les témoignages des entrepreneurs qui ont bénéficié de notre
            accompagnement.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Découvrez les Réalisations de FGVEJ</h2>

          <Tabs defaultValue="all" className="w-full mb-12">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">Tous les Projets</TabsTrigger>
                <TabsTrigger value="waste">Gestion des Déchets</TabsTrigger>
                <TabsTrigger value="agriculture">Agriculture Durable</TabsTrigger>
                <TabsTrigger value="energy">Énergies Renouvelables</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="Gestion des Déchets Plastiques"
                  location="Bamako, Mali"
                  category="Gestion des Déchets"
                  description="Ce projet vise la collecte et le recyclage des déchets plastiques pour réduire la pollution urbaine. Les plastiques recyclés sont transformés en matériaux de construction, contribuant ainsi à une économie circulaire."
                  impact={[
                    "Environ 50 tonnes de plastique recyclées par an",
                    "Réduction de l'empreinte carbone",
                    "Création de 15 emplois locaux",
                  ]}
                  imageSrc="/Dechets_Plastics.jpg"
                />

                <ProjectCard
                  title="Agriculture Durable et Économie d'Eau"
                  location="Région de Ségou"
                  category="Agriculture Durable"
                  description="Ce projet d'agriculture durable met en place des techniques d'irrigation goutte-à-goutte pour économiser l'eau tout en augmentant les rendements agricoles."
                  impact={[
                    "Réduction de la consommation d'eau de 30 %",
                    "Augmentation de la production agricole",
                    "Création de 10 emplois dans la communauté",
                  ]}
                  imageSrc="/Agricul_durable.jpeg"
                />

                <ProjectCard
                  title="Production d'Énergies Renouvelables"
                  location="Région de Kayes"
                  category="Énergies Renouvelables"
                  description="Installation de panneaux solaires dans les zones rurales pour fournir une source d'énergie propre et renouvelable aux habitants."
                  impact={[
                    "Alimentation de plus de 100 foyers en énergie solaire",
                    "Réduction des émissions de CO₂",
                    "Soutien à l'autonomie énergétique locale",
                  ]}
                  imageSrc="/Energie renouvelable.png"
                />

                <ProjectCard
                  title="Centre de Compostage Communautaire"
                  location="Sikasso, Mali"
                  category="Gestion des Déchets"
                  description="Création d'un centre de compostage qui transforme les déchets organiques en engrais naturel pour les agriculteurs locaux."
                  impact={[
                    "Traitement de 20 tonnes de déchets organiques par mois",
                    "Production d'engrais naturel pour 50 agriculteurs",
                    "Réduction des déchets mis en décharge",
                  ]}
                  imageSrc="/compostage-rivmo-capture-decran_uidjArI.jpg"
                />

                <ProjectCard
                  title="Ferme Aquaponique Urbaine"
                  location="Bamako, Mali"
                  category="Agriculture Durable"
                  description="Système aquaponique combinant l'élevage de poissons et la culture de légumes sans sol, économisant 90% d'eau par rapport à l'agriculture traditionnelle."
                  impact={[
                    "Production de légumes et de poissons toute l'année",
                    "Économie d'eau significative",
                    "Création de 8 emplois permanents",
                  ]}
                  imageSrc="/aquaponic.jpeg"
                />

                <ProjectCard
                  title="Éclairage Solaire pour Villages"
                  location="Région de Mopti"
                  category="Énergies Renouvelables"
                  description="Installation de lampadaires solaires dans 5 villages non connectés au réseau électrique, améliorant la sécurité et permettant des activités nocturnes."
                  impact={[
                    "Éclairage pour 5 villages et 2000 habitants",
                    "Amélioration de la sécurité nocturne",
                    "Extension des heures d'activité économique",
                  ]}
                  imageSrc="/village-lampadaire-solaire.jpg"
                />
              </div>
            </TabsContent>

            <TabsContent value="waste" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="Gestion des Déchets Plastiques"
                  location="Bamako, Mali"
                  category="Gestion des Déchets"
                  description="Ce projet vise la collecte et le recyclage des déchets plastiques pour réduire la pollution urbaine. Les plastiques recyclés sont transformés en matériaux de construction, contribuant ainsi à une économie circulaire."
                  impact={[
                    "Environ 50 tonnes de plastique recyclées par an",
                    "Réduction de l'empreinte carbone",
                    "Création de 15 emplois locaux",
                  ]}
                  imageSrc="/Dechets_Plastics.jpg"
                />

                <ProjectCard
                  title="Centre de Compostage Communautaire"
                  location="Sikasso, Mali"
                  category="Gestion des Déchets"
                  description="Création d'un centre de compostage qui transforme les déchets organiques en engrais naturel pour les agriculteurs locaux."
                  impact={[
                    "Traitement de 20 tonnes de déchets organiques par mois",
                    "Production d'engrais naturel pour 50 agriculteurs",
                    "Réduction des déchets mis en décharge",
                  ]}
                  imageSrc="/compostage-rivmo-capture-decran_uidjArI.jpg"
                />
              </div>
            </TabsContent>

            <TabsContent value="agriculture" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="Agriculture Durable et Économie d'Eau"
                  location="Région de Ségou"
                  category="Agriculture Durable"
                  description="Ce projet d'agriculture durable met en place des techniques d'irrigation goutte-à-goutte pour économiser l'eau tout en augmentant les rendements agricoles."
                  impact={[
                    "Réduction de la consommation d'eau de 30 %",
                    "Augmentation de la production agricole",
                    "Création de 10 emplois dans la communauté",
                  ]}
                  imageSrc="/Agricul_durable.jpeg"
                />

                <ProjectCard
                  title="Ferme Aquaponique Urbaine"
                  location="Bamako, Mali"
                  category="Agriculture Durable"
                  description="Système aquaponique combinant l'élevage de poissons et la culture de légumes sans sol, économisant 90% d'eau par rapport à l'agriculture traditionnelle."
                  impact={[
                    "Production de légumes et de poissons toute l'année",
                    "Économie d'eau significative",
                    "Création de 8 emplois permanents",
                  ]}
                  imageSrc="/aquaponic.jpeg"
                />
              </div>
            </TabsContent>

            <TabsContent value="energy" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="Production d'Énergies Renouvelables"
                  location="Région de Kayes"
                  category="Énergies Renouvelables"
                  description="Installation de panneaux solaires dans les zones rurales pour fournir une source d'énergie propre et renouvelable aux habitants."
                  impact={[
                    "Alimentation de plus de 100 foyers en énergie solaire",
                    "Réduction des émissions de CO₂",
                    "Soutien à l'autonomie énergétique locale",
                  ]}
                  imageSrc="/Energie renouvelable.png"
                />

                <ProjectCard
                  title="Éclairage Solaire pour Villages"
                  location="Région de Mopti"
                  category="Énergies Renouvelables"
                  description="Installation de lampadaires solaires dans 5 villages non connectés au réseau électrique, améliorant la sécurité et permettant des activités nocturnes."
                  impact={[
                    "Éclairage pour 5 villages et 2000 habitants",
                    "Amélioration de la sécurité nocturne",
                    "Extension des heures d'activité économique",
                  ]}
                  imageSrc="/village-lampadaire-solaire.jpg"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button asChild variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              <Link href="/projets-finances/tous">
                Voir tous les projets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ils Partagent Leur Expérience avec FGVEJ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Grâce à FGVEJ, j'ai pu lancer mon entreprise de recyclage des plastiques. Leur soutien financier et technique a été essentiel pour surmonter les obstacles initiaux. Aujourd'hui, je contribue à réduire la pollution plastique tout en créant des emplois dans ma communauté."
              author="Aïcha S."
              role="Projet de Recyclage des Déchets Plastiques"
              imageSrc="/placeholder.svg"
            />

            <TestimonialCard
              quote="FGVEJ m'a permis de réaliser mon rêve d'agriculture durable en m'aidant à obtenir un financement sans frais de garantie. Avec leurs conseils et leur formation en écologie, j'ai pu mettre en place des techniques qui économisent l'eau et augmentent mes rendements agricoles."
              author="Moussa K."
              role="Projet d'Agriculture Durable"
              imageSrc="/placeholder.svg"
            />

            <TestimonialCard
              quote="Le soutien de FGVEJ a été déterminant pour apporter l'électricité solaire dans mon village. Leur équipe m'a aidée à préparer mon projet et à obtenir le financement nécessaire. Aujourd'hui, plus de 100 foyers profitent d'une énergie propre."
              author="Fatou D."
              role="Énergie Solaire pour les Zones Rurales"
              imageSrc="/placeholder.svg"
            />
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              <Link href="/temoignages">
                Voir plus de témoignages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Inspiré par ces projets ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez FGVEJ et transformez votre idée en un projet écologique à impact positif. Bénéficiez de notre
            soutien financier et technique pour faire la différence.
          </p>
          <Button asChild size="lg" className="bg-white text-green-900 hover:bg-gray-100">
            <Link href="/soumettre-projet">Soumettre Votre Projet</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
