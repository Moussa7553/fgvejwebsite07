import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function EventsCalendarPage() {
  const events = [
    {
      id: 1,
      title: "Atelier de Sensibilisation pour les Entrepreneurs Verts",
      date: "15 Juin 2024",
      time: "09:00 - 17:00",
      location: "Centre de Conférences FGVEJ, Bamako",
      description:
        "Un atelier d'une journée pour découvrir les opportunités de financement et d'accompagnement offertes par FGVEJ. Présentation des critères d'éligibilité et des étapes pour soumettre un projet.",
      category: "Formation",
      registrationLink: "/actualites/evenements/inscription?event=1",
    },
    {
      id: 2,
      title: "Formation en Pratiques Écologiques - Session Juin",
      date: "20-24 Juin 2024",
      time: "09:00 - 16:00",
      location: "Centre de Formation FGVEJ, Bamako",
      description:
        "Formation de 5 jours en pratiques écologiques pour les entrepreneurs ayant obtenu un financement. Au programme : gestion durable des ressources, énergies renouvelables et agriculture durable.",
      category: "Formation",
      registrationLink: "/actualites/evenements/inscription?event=2",
    },
    {
      id: 3,
      title: "Rencontre avec les Banques Partenaires",
      date: "10 Juillet 2024",
      time: "14:00 - 17:00",
      location: "Hôtel Radisson Blu, Bamako",
      description:
        "Présentation des projets financés par FGVEJ aux banques partenaires et discussion sur les opportunités de collaboration future pour soutenir davantage d'entrepreneurs verts.",
      category: "Partenariat",
      registrationLink: "/actualites/evenements/inscription?event=3",
    },
    {
      id: 4,
      title: "Journée Portes Ouvertes FGVEJ",
      date: "15 Août 2024",
      time: "10:00 - 18:00",
      location: "Siège de FGVEJ, Bamako",
      description:
        "Venez découvrir les locaux de FGVEJ et rencontrer l'équipe. Présentations des projets financés, témoignages d'entrepreneurs et sessions d'information tout au long de la journée.",
      category: "Information",
      registrationLink: "/actualites/evenements/inscription?event=4",
    },
    {
      id: 5,
      title: "Conférence sur l'Entrepreneuriat Vert et les ODD",
      date: "20 Septembre 2024",
      time: "09:00 - 17:00",
      location: "Centre International de Conférences, Bamako",
      description:
        "Conférence internationale sur la contribution de l'entrepreneuriat vert aux Objectifs de Développement Durable. Intervenants de renom et partage d'expériences réussies.",
      category: "Conférence",
      registrationLink: "/actualites/evenements/inscription?event=5",
    },
    {
      id: 6,
      title: "Formation en Élaboration de Plan d'Affaires",
      date: "10-12 Octobre 2024",
      time: "09:00 - 16:00",
      location: "Centre de Formation FGVEJ, Bamako",
      description:
        "Formation de 3 jours pour apprendre à élaborer un plan d'affaires solide pour votre projet écologique. Méthodologie, outils pratiques et conseils d'experts.",
      category: "Formation",
      registrationLink: "/actualites/evenements/inscription?event=6",
    },
    {
      id: 7,
      title: "Rencontre Annuelle des Partenaires FGVEJ",
      date: "10 Décembre 2024",
      time: "09:00 - 17:00",
      location: "Hôtel Azalaï, Bamako",
      description:
        "Événement annuel rassemblant tous les partenaires de FGVEJ pour faire le bilan de l'année, présenter les résultats et discuter des perspectives futures.",
      category: "Partenariat",
      registrationLink: "/actualites/evenements/inscription?event=7",
    },
    {
      id: 8,
      title: "Cérémonie de Remise des Prix de l'Innovation Verte",
      date: "20 Décembre 2024",
      time: "18:00 - 21:00",
      location: "Palais des Congrès, Bamako",
      description:
        "Cérémonie annuelle récompensant les projets les plus innovants et à fort impact écologique financés par FGVEJ au cours de l'année.",
      category: "Événement",
      registrationLink: "/actualites/evenements/inscription?event=8",
    },
  ]

  const categories = ["Tous", "Formation", "Partenariat", "Information", "Conférence", "Événement"]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Calendrier des Événements</h1>
          <p className="text-xl max-w-3xl">
            Découvrez les prochains événements organisés par FGVEJ et inscrivez-vous pour y participer.
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center mb-8">
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className={index === 0 ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {category}
                  // Add this where you want the link to appear in your Actualités page
<Link
  href="/actualites/evenements"
  className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
>
  Voir le calendrier des événements
</Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="flex flex-col h-full">
                <CardContent className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.category === "Formation"
                          ? "bg-blue-100 text-blue-800"
                          : event.category === "Partenariat"
                            ? "bg-purple-100 text-purple-800"
                            : event.category === "Information"
                              ? "bg-yellow-100 text-yellow-800"
                              : event.category === "Conférence"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                      }`}
                    >
                      {event.category}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600">{event.description}</p>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href={event.registrationLink}>S'inscrire à cet événement</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-green-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Vous organisez un événement lié à l'entrepreneuriat vert ?</h3>
            <p className="text-lg mb-6">
              FGVEJ peut vous aider à promouvoir votre événement auprès de notre communauté d'entrepreneurs verts.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/contact">Nous contacter pour un partenariat</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
