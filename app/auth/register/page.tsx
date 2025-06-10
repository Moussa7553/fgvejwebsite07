"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import Image from "next/image"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user, signUp } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, rediriger vers le tableau de bord
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    // Vérifier la complexité du mot de passe
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.")
      return
    }

    setIsLoading(true)

    try {
      // Créer l'utilisateur avec Firebase Auth
      await signUp(email, password)

      // Stocker les informations supplémentaires dans Firestore
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          createdAt: new Date(),
        })
      }

      // Rediriger vers le tableau de bord
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Erreur d'inscription:", error)

      // Gérer les différents types d'erreurs Firebase
      if (error.code === "auth/email-already-in-use") {
        setError("Cette adresse e-mail est déjà utilisée.")
      } else if (error.code === "auth/invalid-email") {
        setError("Adresse e-mail invalide.")
      } else if (error.code === "auth/weak-password") {
        setError("Le mot de passe est trop faible.")
      } else {
        setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/Logo1.png" alt="FGVEJ Logo" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Créer un compte</h2>
          <p className="mt-2 text-gray-600">Rejoignez FGVEJ pour soumettre et gérer vos projets écologiques</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom et prénom"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création du compte...
                  </>
                ) : (
                  "Créer un compte"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6">
            <p className="text-center text-sm text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Link href="/auth/login" className="font-medium text-green-600 hover:text-green-500">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
