"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { actionInscription } from "@/app/actions/authentification"

export default function PageInscription() {
  const { toast } = useToast()
  const router = useRouter()
  const [enSoumission, setEnSoumission] = useState(false)
  const [inscriptionReussie, setInscriptionReussie] = useState(false)
  const [donnees, setDonnees] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    motDePasse: "",
    confirmationMotDePasse: "",
    typeEntrepreneur: "",
    accepterConditions: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setDonnees((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setDonnees((prev) => ({ ...prev, typeEntrepreneur: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (donnees.motDePasse !== donnees.confirmationMotDePasse) {
      toast({
        title: "Les mots de passe ne correspondent pas",
        description: "Veuillez vérifier que les mots de passe saisis sont identiques.",
        variant: "destructive",
      })
      return
    }

    if (!donnees.accepterConditions) {
      toast({
        title: "Acceptation des conditions requise",
        description: "Veuillez accepter les conditions d'utilisation pour continuer.",
        variant: "destructive",
      })
      return
    }

    setEnSoumission(true)

    try {
      const resultat = await actionInscription({
        prenom: donnees.prenom,
        nom: donnees.nom,
        email: donnees.email,
        telephone: donnees.telephone,
        motDePasse: donnees.motDePasse,
        typeEntrepreneur: donnees.typeEntrepreneur,
      })

      if (resultat.succes) {
        setInscriptionReussie(true)

        // Redirection automatique après 3 secondes
        setTimeout(() => {
          router.push("/auth/connexion")
        }, 3000)
      } else {
        toast({
          title: "Erreur",
          description: resultat.message,
          variant: "destructive",
        })
      }
    } catch (erreur) {
      console.error("Erreur lors de l'inscription:", erreur)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      })
    } finally {
      setEnSoumission(false)
    }
  }

  if (inscriptionReussie) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="w-full max-w-md p-6">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 text-xl font-bold">Inscription réussie !</AlertTitle>
            <AlertDescription className="text-green-700">
              <p className="mb-4">
                Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion dans quelques
                instants.
              </p>
              <Button
                onClick={() => router.push("/auth/connexion")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Aller à la page de connexion
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-md mx-auto lg:w-96">
          <div className="mb-6">
            <Link href="/" className="text-green-600 font-bold text-2xl">
              FGVEJ
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Créer un compte</h2>
            <p className="mt-2 text-sm text-gray-600">
              Déjà inscrit ?{" "}
              <Link href="/auth/connexion" className="font-medium text-green-600 hover:text-green-500">
                Connectez-vous
              </Link>
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" name="prenom" value={donnees.prenom} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" name="nom" value={donnees.nom} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input id="email" name="email" type="email" value={donnees.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Numéro de téléphone</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={donnees.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="typeEntrepreneur">Type d'entrepreneur</Label>
                  <Select value={donnees.typeEntrepreneur} onValueChange={handleSelectChange}>
                    <SelectTrigger id="typeEntrepreneur">
                      <SelectValue placeholder="Sélectionnez votre profil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individuel">Entrepreneur individuel</SelectItem>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="cooperative">Coopérative</SelectItem>
                      <SelectItem value="association">Association</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motDePasse">Mot de passe</Label>
                  <Input
                    id="motDePasse"
                    name="motDePasse"
                    type="password"
                    value={donnees.motDePasse}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmationMotDePasse">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmationMotDePasse"
                    name="confirmationMotDePasse"
                    type="password"
                    value={donnees.confirmationMotDePasse}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accepterConditions"
                    name="accepterConditions"
                    checked={donnees.accepterConditions}
                    onCheckedChange={(checked) =>
                      setDonnees((prev) => ({ ...prev, accepterConditions: checked as boolean }))
                    }
                  />
                  <label
                    htmlFor="accepterConditions"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    J'accepte les{" "}
                    <Link href="/conditions" className="text-green-600 hover:text-green-500">
                      conditions d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link href="/confidentialite" className="text-green-600 hover:text-green-500">
                      politique de confidentialité
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={enSoumission}>
                  {enSoumission ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    "S'inscrire"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="relative flex-1 hidden w-0 lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/agriculture-durable.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Rejoignez la communauté des entrepreneurs verts</h2>
            <p className="text-xl">
              Créez votre compte pour accéder à notre plateforme et bénéficier de nos services de garantie,
              d'accompagnement et de formation pour votre projet écologique.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
