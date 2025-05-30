import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { QuoteIcon } from "lucide-react"

export default function TestimonialsPage() {
  const testimonials = [
    {
      quote:
        "Grâce à FGVEJ, j'ai pu lancer mon projet de gestion des déchets plastiques et contribuer à la réduction de la pollution dans ma communauté. Leur soutien financier et technique m'a permis de concrétiser mon rêve.",
      author: "Aïcha S.",
      role: "Entrepreneure verte",
      imageSrc: "/placeholder.svg",
      project: "Recyclage des Déchets Plastiques",
    },
    {
      quote:
        "Le programme de formation en écologie m'a donné les compétences nécessaires pour intégrer des pratiques durables dans mon entreprise agricole. Aujourd'hui, je produis plus tout en consommant moins d'eau.",
      author: "Moussa K.",
      role: "Agriculteur durable",
      imageSrc: "/placeholder.svg",
      project: "Agriculture Durable et Économie d'Eau",
    },
    {
      quote:
        "Sans les frais de garantie pris en charge par FGVEJ, je n'aurais jamais pu obtenir le financement pour mon projet d'énergie solaire. Maintenant, plus de 100 foyers dans mon village ont accès à l'électricité.",
      author: "Fatou D.",
      role: "Entrepreneur en énergie renouvelable",
      imageSrc: "/placeholder.svg",
      project: "Production d'Énergies Renouvelables",
    },
    {
      quote:
        "L'accompagnement personnalisé de FGVEJ a été déterminant pour structurer mon projet de compostage communautaire. Leur expertise m'a aidé à éviter de nombreuses erreurs et à optimiser mon modèle d'affaires.",
      author: "Ibrahim T.",
      role: "Entrepreneur en gestion des déchets",
      imageSrc: "/placeholder.svg",
      project: "Centre de Compostage Communautaire",
    },
    {
      quote:
        "Grâce à la formation en pratiques écologiques de FGVEJ, j'ai pu développer un système aquaponique innovant qui économise 90% d'eau par rapport à l'agriculture traditionnelle. Un vrai changement pour notre communauté !",
      author: "Aminata L.",
      role: "Innovatrice en agriculture urbaine",
      imageSrc: "/placeholder.svg",
      project: "Ferme Aquaponique Urbaine",
    },
    {
      quote:
        "FGVEJ m'a aidé à transformer mon idée d'éclairage solaire en un projet viable qui dessert maintenant cinq villages. Leur réseau de partenaires m'a ouvert des portes que je n'aurais jamais pu ouvrir seul.",
      author: "Oumar B.",
      role: "Entrepreneur en énergie solaire",
      imageSrc: "/placeholder.svg",
      project: "Éclairage Solaire pour Villages",
    },
    {
      quote:
        "En tant que jeune femme entrepreneure, j'ai souvent rencontré des obstacles pour accéder au financement. FGVEJ a cru en mon projet de recyclage textile et m'a donné les moyens de créer une entreprise qui emploie aujourd'hui 12 personnes.",
      author: "Kadiatou M.",
      role: "Entrepreneure en économie circulaire",
      imageSrc: "/placeholder.svg",
      project: "Recyclage Textile Écologique",
    },
    {
      quote:
        "Le mentorat offert par FGVEJ a été aussi précieux que leur soutien financier. Les conseils pratiques et le réseau professionnel m'ont permis de surmonter les défis de la première année d'activité de mon entreprise d'énergie éolienne.",
      author: "Mamadou S.",
      role: "Ingénieur en énergies renouvelables",
      imageSrc: "/placeholder.svg",
      project: "Micro-éoliennes Rurales",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Témoignages</h1>
          <p className="text-xl max-w-3xl">
            Découvrez les histoires inspirantes des entrepreneurs qui ont bénéficié du soutien de FGVEJ pour réaliser
            leurs projets écologiques.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ils Partagent Leur Expérience avec FGVEJ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                imageSrc={testimonial.imageSrc}
                project={testimonial.project}
              />
            ))}
          </div>

          <div className="mt-16 bg-green-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Partagez Votre Histoire</h3>
            <p className="text-lg mb-6">
              Vous avez bénéficié du soutien de FGVEJ pour votre projet ? Partagez votre expérience et inspirez d'autres
              entrepreneurs verts.
            </p>
            <a
              href="/contact"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Soumettre Votre Témoignage
            </a>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Témoignages Vidéo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="relative pb-[56.25%] h-0 mb-4">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Témoignage vidéo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-xl font-bold mb-2">L'histoire de Fatou D.</h3>
              <p className="text-gray-600">
                Découvrez comment Fatou a transformé son village grâce à son projet d'énergie solaire soutenu par FGVEJ.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="relative pb-[56.25%] h-0 mb-4">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Témoignage vidéo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-xl font-bold mb-2">L'histoire de Moussa K.</h3>
              <p className="text-gray-600">
                Comment Moussa a révolutionné ses pratiques agricoles grâce à la formation en écologie de FGVEJ.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  imageSrc: string
  project: string
}

function TestimonialCard({ quote, author, role, imageSrc, project }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <QuoteIcon className="h-8 w-8 text-green-600 mb-4" />
        <p className="text-gray-700 mb-6 flex-grow">{quote}</p>
        <div className="flex items-center mt-auto">
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
            <Image 
              src={imageSrc || "/placeholder.svg"} 
              alt={author} 
              fill 
              sizes="48px"
              className="object-cover" 
            />
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-gray-500">{role}</p>
            <p className="text-xs text-green-600 mt-1">{project}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
