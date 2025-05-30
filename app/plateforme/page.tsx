import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users } from "lucide-react"
import Link from "next/link"

export default function PlatformPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-20">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bienvenue sur la plateforme des Entrepreneurs Verts de FGVEJ
            </h1>
            <p className="text-xl mb-8">
              Ressources, garanties, et accompagnement pour donner vie à votre projet durable. 
              Avec FGVEJ, obtenez le soutien nécessaire pour développer un projet à impact positif.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-green-900 hover:bg-gray-100">
                <Link href="/auth/register">Rejoignez la communauté</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-green-800">
                <Link href="/soumettre-projet">Démarrez votre projet durable</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir FGVEJ pour soutenir votre projet ?</h2>
          
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12">
            FGVEJ est dédié aux jeunes entrepreneurs engagés dans la transition écologique. Nous éliminons les obstacles 
            financiers en prenant en charge vos frais de garantie, et nous vous accompagnons à chaque étape de votre projet durable.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-green-600">
              <CardContent className="p-6">
                <div className="mb-4 bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Garantie sans Frais</h3>
                <p className="text-gray-700">
                  Financer votre projet sans coûts additionnels grâce à notre couverture complète des frais de garantie.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-green-600">
              <CardContent className="p-6">
                <div className="mb-4 bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accompagnement Personnalisé</h3>
                <p className="text-gray-700">
                  Structurez votre projet avec le soutien de nos conseillers spécialisés.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-green-600">
              <CardContent className="p-6">
                <div className="mb-4 bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Communauté Dynamique</h3>
                <p className="text-gray-700">
                  Connectez-vous avec d'autres entrepreneurs verts pour partager et inspirer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Inscrivez-vous et lancez votre projet durable</h2>
              <p className="text-gray-700 mb-6">
                Rejoignez FGVEJ et accédez à un espace dédié pour structurer et gérer votre projet. Créez votre profil, 
                présentez votre idée, et bénéficiez d'un accompagnement sur mesure pour chaque étape.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex">
                  <div className="bg-green-100 p-2 rounded-full mr-4 h-8 w-8 flex items-center justify-center">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Informations de Base</h3>
                    <p className="text-gray-600">
                      Partagez vos informations personnelles et celles de votre projet pour démarrer votre aventure avec FGVEJ.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-green-100 p-2 rounded-full mr-4 h-8 w-8 flex items-center justify-center">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Description du Projet</h3>
                    <p className="text-gray-600">
                      Décrivez votre projet, ses objectifs et son impact écologique.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-green-100 p-2 rounded-full mr-4 h-8 w-8 flex items-center justify-center">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Suivi et Évaluation</h3>
                    <p className="text-gray-600">
                      Suivez l'évolution de votre projet et évaluez son impact écologique.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
