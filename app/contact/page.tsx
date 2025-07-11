"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, MessageSquare, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { envoyerFormulaire } from "@/app/actions/contact"

export default function PageContact() {
  const { toast } = useToast()
  const [enSoumission, setEnSoumission] = useState(false)
  const [donnees, setDonnees] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  })
  const [afficherChat, setAfficherChat] = useState(false)
  const [messagesChat, setMessagesChat] = useState<{ texte: string; estUtilisateur: boolean }[]>([
    { texte: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", estUtilisateur: false },
  ])
  const [saisieChat, setSaisieChat] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDonnees((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setDonnees((prev) => ({ ...prev, sujet: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnSoumission(true)

    try {
      const formData = new FormData()
      formData.append("nom", donnees.nom)
      formData.append("email", donnees.email)
      formData.append("telephone", donnees.telephone)
      formData.append("sujet", donnees.sujet)
      formData.append("message", donnees.message)

      const resultat = await envoyerFormulaire(formData)

      if (resultat.success) {
        toast({
          title: "Message envoyé",
          description: "Nous vous répondrons dans les plus brefs délais.",
        })

        setDonnees({
          nom: "",
          email: "",
          telephone: "",
          sujet: "",
          message: "",
        })
      } else {
        toast({
          title: "Erreur",
          description: resultat.message,
          variant: "destructive",
        })
      }
    } catch (erreur) {
      console.error("Erreur lors de l'envoi du message:", erreur)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message",
        variant: "destructive",
      })
    } finally {
      setEnSoumission(false)
    }
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!saisieChat.trim()) return

    // Ajouter le message de l'utilisateur
    setMessagesChat((prev) => [...prev, { texte: saisieChat, estUtilisateur: true }])

    // Simuler une réponse
    setTimeout(() => {
      let reponse = "Merci pour votre message. Un conseiller va vous répondre très prochainement."

      if (saisieChat.toLowerCase().includes("projet")) {
        reponse =
          "Pour soumettre un projet, vous pouvez utiliser notre formulaire en ligne sur la page 'Soumettre un Projet'. Avez-vous des questions spécifiques sur le processus ?"
      } else if (saisieChat.toLowerCase().includes("garantie") || saisieChat.toLowerCase().includes("financement")) {
        reponse =
          "FGVEJ offre une garantie partielle pour les prêts bancaires, en prenant en charge les frais de garantie. Nous couvrons 50% du montant financé par la banque. Souhaitez-vous en savoir plus ?"
      } else if (saisieChat.toLowerCase().includes("formation")) {
        reponse =
          "Nous proposons une formation de 5 jours en écologie et pratiques durables, financée par nos partenaires. Cette formation est disponible pour les entrepreneurs ayant obtenu un financement."
      }

      setMessagesChat((prev) => [...prev, { texte: reponse, estUtilisateur: false }])
    }, 1000)

    setSaisieChat("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section Héro */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Contact et Assistance</h1>
          <p className="text-xl max-w-3xl">
            Besoin d'aide ou d'informations supplémentaires ? Contactez-nous et notre équipe vous répondra dans les plus
            brefs délais.
          </p>
        </div>
      </section>

      {/* Section Formulaire de Contact et Informations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de Contact */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Besoin d'Aide ? Contactez-nous !</h2>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        name="nom"
                        value={donnees.nom}
                        onChange={handleChange}
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse e-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={donnees.email}
                        onChange={handleChange}
                        placeholder="votre.email@exemple.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telephone">Numéro de téléphone (optionnel)</Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={donnees.telephone}
                        onChange={handleChange}
                        placeholder="+223 XX XX XX XX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sujet">Objet du message</Label>
                      <Select value={donnees.sujet} onValueChange={handleSelectChange}>
                        <SelectTrigger id="sujet">
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="information">Information sur les garanties</SelectItem>
                          <SelectItem value="soumission">Aide à la soumission d'un projet</SelectItem>
                          <SelectItem value="partenariat">Partenariats</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={donnees.message}
                        onChange={handleChange}
                        placeholder="Détaillez votre demande ici..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={enSoumission}>
                      {enSoumission ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        "Envoyer le Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informations de Contact */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Nous Joindre Directement</h2>
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Adresse</h3>
                      <address className="not-italic text-gray-700">
                        <p>Siège de FGVEJ</p>
                        <p>Bamako, Mali</p>
                      </address>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
                      <p className="text-gray-700 font-semibold">+223 76 42 83 83</p>
                      <p className="text-sm text-gray-500 mt-1">Du lundi au vendredi, de 9h00 à 17h00</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Adresse e-mail</h3>
                      <p className="text-gray-700">contact@fgvej.org</p>
                      <p className="text-sm text-gray-500 mt-1">Nous répondons généralement dans les 24 heures</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Assistance en Ligne via Chat</h3>
                      <p className="text-gray-700 mb-4">
                        Pour une assistance immédiate, utilisez notre service de chat en ligne disponible sur notre
                        plateforme.
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={() => setAfficherChat(true)}>
                        Démarrer une Conversation en Ligne
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Suivez-nous sur les Réseaux Sociaux</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/profile.php?id=61558478945678" target="_blank" rel="noopener noreferrer" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="https://twitter.com/FGVEJ_Official" target="_blank" rel="noopener noreferrer" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/search/results/companies/?keywords=FGVEJ%20Mali" target="_blank" rel="noopener noreferrer" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="https://instagram.com/fgvej_official" target="_blank" rel="noopener noreferrer" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="https://wa.me/+22376428383" target="_blank" rel="noopener noreferrer" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Chat */}
      {afficherChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col h-[500px]">
            <div className="p-4 border-b flex justify-between items-center bg-green-600 text-white rounded-t-lg">
              <h3 className="font-semibold">Chat avec FGVEJ</h3>
              <button onClick={() => setAfficherChat(false)} className="text-white hover:text-gray-200">
                ✕
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messagesChat.map((msg, index) => (
                <div key={index} className={`flex ${msg.estUtilisateur ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.estUtilisateur
                        ? "bg-green-600 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {msg.texte}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="border-t p-4 flex">
              <Input
                value={saisieChat}
                onChange={(e) => setSaisieChat(e.target.value)}
                placeholder="Tapez votre message ici..."
                className="flex-grow mr-2"
              />
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Envoyer
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
