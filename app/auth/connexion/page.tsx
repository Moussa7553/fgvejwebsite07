"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { actionConnexion } from "@/app/actions/authentification"

export default function PageConnexion() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const inscrit = searchParams.get("inscrit") === "true"

  const [enSoumission, setEnSoumission] = useState(false)
  const [donnees, setDonnees] = useState({
    email: "",
    motDePasse: "",
    seSouvenir: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setDonnees((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnSoumission(true)

    try {
      const resultat = await actionConnexion({
        email: donnees.email,
        motDePasse: donnees.motDePasse,
        seSouvenir: donnees.seSouvenir,
      })

      if (resultat.succes) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
        })
        router.push("/tableau-de-bord")
      } else {
        toast({
          title: "Erreur",
          description: resultat.message,
          variant: "destructive",
        })
      }
    } catch (erreur) {
      console.error("Erreur lors de la connexion:", erreur)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      })
    } finally {
      setEnSoumission(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-md mx-auto lg:w-96">
          <div className="mb-6">
            <Link href="/" className="text-green-600 font-bold text-2xl">
              FGVEJ
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Connexion</h2>
            <p className="mt-2 text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link href="/auth/inscription" className="font-medium text-green-600 hover:text-green-500">
                Inscrivez-vous
              </Link>
            </p>
          </div>

          {inscrit && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Inscription réussie !</AlertTitle>
              <AlertDescription className="text-green-700">
                Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input id="email" name="email" type="email" value={donnees.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="motDePasse">Mot de passe</Label>
                    <Link
                      href="/auth/mot-de-passe-oublie"
                      className="text-sm font-medium text-green-600 hover:text-green-500"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <Input
                    id="motDePasse"
                    name="motDePasse"
                    type="password"
                    value={donnees.motDePasse}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="seSouvenir"
                    name="seSouvenir"
                    checked={donnees.seSouvenir}
                    onCheckedChange={(checked) => setDonnees((prev) => ({ ...prev, seSouvenir: checked as boolean }))}
                  />
                  <label
                    htmlFor="seSouvenir"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se souvenir de moi
                  </label>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={enSoumission}>
                  {enSoumission ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="relative flex-1 hidden w-0 lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/energie-renouvelable.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Bienvenue sur la plateforme FGVEJ</h2>
            <p className="text-xl">
              Connectez-vous pour accéder à votre espace personnel et gérer vos projets écologiques.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
