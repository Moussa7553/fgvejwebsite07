import type React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, HelpCircle, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="faq">FAQ</section>
<section id="guides">Guides</section>
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Ressources et Documentation</h1>
          <p className="text-xl max-w-3xl">
            Accédez à des guides pratiques, des vidéos et des réponses à vos questions pour réussir votre projet
            écologique.
          </p>
        </div>
      </section>

      {/* Resources Navigation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="guides" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="videos">Vidéos</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
            </div>

            {/* Guides Tab */}
            <TabsContent value="guides" className="mt-0">
              <div className="flex items-center mb-8">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FileText className="h-6 w-6 text-green-600" />
                  <Link href="/ressources#guides">Guides</Link>
                </div>
                <h2 className="text-3xl font-bold">Guides et Fiches Pratiques</h2>
              </div>

              <p className="text-gray-700 mb-8 max-w-4xl">
                FGVEJ met à disposition des guides pratiques pour aider les jeunes entrepreneurs dans toutes les étapes
                de leur projet. Ces documents couvrent divers aspects de la création et de la gestion d'une entreprise
                écologique.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <ResourceCard
                  title="Guide de Création d'Entreprise Verte"
                  description="Étapes clés pour lancer un projet durable, du choix de l'idée à la gestion administrative."
                  icon={<FileText className="h-6 w-6 text-green-600" />}
                  downloadLink="/ressources/guides/creation-entreprise-verte.pdf"
                />

                <ResourceCard
                  title="Fiche Pratique : Élaborer un Plan d'Affaires"
                  description="Méthodologie pour rédiger un plan d'affaires solide et structuré, répondant aux critères de financement."
                  icon={<FileText className="h-6 w-6 text-green-600" />}
                  downloadLink="/ressources/guides/plan-affaires.pdf"
                />

                <ResourceCard
                  title="Manuel des Bonnes Pratiques Écologiques"
                  description="Recommandations pour intégrer des pratiques respectueuses de l'environnement dans son activité."
                  icon={<FileText className="h-6 w-6 text-green-600" />}
                  downloadLink="/ressources/guides/pratiques-ecologiques.pdf"
                />

                <ResourceCard
                  title="Guide de Financement et Garantie"
                  description="Informations détaillées sur le processus de garantie et d'accompagnement de FGVEJ, incluant les critères d'éligibilité."
                  icon={<FileText className="h-6 w-6 text-green-600" />}
                  downloadLink="/ressources/guides/financement-garantie.pdf"
                />

                <ResourceCard
                  title="Techniques d'Agriculture Durable"
                  description="Guide complet sur les méthodes d'agriculture économes en eau et respectueuses de l'environnement."
                  icon={<FileText className="h-6 w-6 text-green-600" />}
                  downloadLink="/ressources/guides/agriculture-durable.pdf"
                />

                <ResourceCard
                  title="Guide des Énergies Renouvelables"
                  description="Présentation des différentes solutions d'énergies renouvelables adaptées aux projets entrepreneuriaux."
                  icon={<FileText className="h-6 w-6 text-green-600" />}
                  downloadLink="/ressources/guides/energies-renouvelables.pdf"
                />
              </div>

              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  Tous ces guides sont disponibles en téléchargement gratuit pour les entrepreneurs inscrits sur notre
                  plateforme.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/auth/register">S'inscrire pour Accéder à Tous les Guides</Link>
                </Button>
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="mt-0">
              <div className="flex items-center mb-8">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold">Vidéos et Tutoriels</h2>
              </div>

              <p className="text-gray-700 mb-8 max-w-4xl">
                FGVEJ propose une série de vidéos pour aider les entrepreneurs à se former aux pratiques et aux
                exigences de l'entrepreneuriat vert. Chaque vidéo couvre un sujet spécifique et est animée par des
                experts du domaine.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <VideoCard
                  title="Introduction au Financement Vert"
                  description="Comprendre les financements et les garanties disponibles pour les projets verts."
                  duration="15:24"
                  thumbnailSrc="/placeholder.svg"
                  videoLink="/ressources/videos/introduction-financement"
                />

                <VideoCard
                  title="Rédaction de votre Plan d'Affaires"
                  description="Tutoriel étape par étape pour préparer un plan d'affaires adapté aux critères des investisseurs."
                  duration="23:10"
                  thumbnailSrc="/placeholder.svg"
                  videoLink="/ressources/videos/redaction-plan-affaires"
                />

                <VideoCard
                  title="Pratiques Écologiques Essentielles"
                  description="Vidéo de formation en techniques durables comme l'agriculture biologique, la gestion des déchets, et les énergies renouvelables."
                  duration="18:45"
                  thumbnailSrc="/placeholder.svg"
                  videoLink="/ressources/videos/pratiques-ecologiques"
                />

                <VideoCard
                  title="Témoignages d'Entrepreneurs Verts"
                  description="Des entrepreneurs soutenus par FGVEJ partagent leur expérience et leurs conseils."
                  duration="20:30"
                  thumbnailSrc="/placeholder.svg"
                  videoLink="/ressources/videos/temoignages"
                />

                <VideoCard
                  title="Techniques d'Irrigation Économes en Eau"
                  description="Présentation des méthodes d'irrigation goutte-à-goutte et autres techniques économes en eau."
                  duration="16:15"
                  thumbnailSrc="/placeholder.svg"
                  videoLink="/ressources/videos/irrigation"
                />

                <VideoCard
                  title="Installation de Panneaux Solaires"
                  description="Guide pratique pour l'installation et la maintenance de panneaux solaires pour les petites entreprises."
                  duration="25:40"
                  thumbnailSrc="/placeholder.svg"
                  videoLink="/ressources/videos/panneaux-solaires"
                />
              </div>

              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  Consultez notre bibliothèque de vidéos en accès libre pour les entrepreneurs inscrits sur notre
                  plateforme.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/auth/register">S'inscrire pour Accéder à Toutes les Vidéos</Link>
                </Button>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="mt-0">
              <div className="flex items-center mb-8">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <HelpCircle className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold">FAQ (Foire Aux Questions)</h2>
              </div>

              <p className="text-gray-700 mb-8 max-w-4xl">
                Nous avons rassemblé les questions les plus fréquemment posées pour vous aider à mieux comprendre les
                services de FGVEJ, les critères d'éligibilité, et le processus de garantie.
              </p>

              <div className="mb-12">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">
                      Quels types de projets sont éligibles à la garantie FGVEJ ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      FGVEJ soutient les projets à impact écologique dans les secteurs de l'agriculture durable, de
                      l'énergie renouvelable, de la gestion des déchets, et d'autres activités favorisant le
                      développement durable. Pour être éligible, votre projet doit contribuer à la réduction de
                      l'empreinte carbone ou à la protection de l'environnement, et vous devez être âgé entre 18 et 35
                      ans.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">
                      Comment postuler pour une garantie de prêt avec FGVEJ ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      Pour postuler, vous devez d'abord vous inscrire sur notre plateforme, puis soumettre votre projet
                      en remplissant le formulaire de demande et en téléchargeant votre plan d'affaires. Notre équipe
                      évaluera votre projet et vous contactera pour les étapes suivantes. Si vous avez besoin d'aide
                      pour préparer votre plan d'affaires, nous proposons également un service d'accompagnement.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">
                      Quelles sont les étapes de la formation en pratiques écologiques ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      La formation en pratiques écologiques est proposée aux entrepreneurs après l'obtention de leur
                      financement. Elle se déroule sur 5 jours et couvre des sujets comme la gestion durable des
                      ressources naturelles, les énergies renouvelables, l'efficacité énergétique, et les techniques
                      d'agriculture durable. Cette formation est financée par nos partenaires et est gratuite pour les
                      entrepreneurs financés par FGVEJ.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium">
                      Puis-je accéder aux services de FGVEJ si mon projet est en phase de démarrage ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      Oui, FGVEJ soutient les projets à différentes phases, y compris les projets en phase de démarrage.
                      Nous proposons un accompagnement pour vous aider à structurer votre idée et à élaborer un plan
                      d'affaires solide. Cependant, pour bénéficier de la garantie, votre projet doit être suffisamment
                      développé pour être présenté à une banque partenaire.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-medium">
                      Quel est le montant maximum de financement que je peux obtenir ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      FGVEJ couvre des projets nécessitant un financement entre 10 et 100 millions de FCFA. Le montant
                      exact dépendra de la nature de votre projet, de sa viabilité économique, et de son impact
                      écologique. Notre garantie couvre 50% du montant financé par la banque.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="text-center">
                <Button asChild variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                  <Link href="/ressources#faq">
                    Consulter la FAQ Complète
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

interface ResourceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  downloadLink: string
}

function ResourceCard({ title, description, icon, downloadLink }: ResourceCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4 flex-grow">{description}</p>
        <Button asChild variant="outline" className="w-full mt-auto">
          <Link href={downloadLink} className="flex items-center justify-center">
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

interface VideoCardProps {
  title: string
  description: string
  duration: string
  thumbnailSrc: string
  videoLink: string
}

function VideoCard({ title, description, duration, thumbnailSrc, videoLink }: VideoCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative">
        <Link href={videoLink}>
          <div className="relative h-48 w-full">
            <Image src={thumbnailSrc || "/placeholder.svg"} alt={title} fill className="object-cover rounded-t-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white bg-opacity-80 rounded-full p-3">
                <Video className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
        </Link>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4 flex-grow">{description}</p>
        <Button asChild className="w-full mt-auto bg-green-600 hover:bg-green-700">
          <Link href={videoLink}>Regarder la Vidéo</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
