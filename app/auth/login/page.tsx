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
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user, signIn } = useAuth()
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
    setIsLoading(true)
    console.log("Login attempt started")

    try {
      console.log("Attempting to sign in with:", email)
      const user = await signIn(email, password)
      console.log("Sign in successful, user:", user)
      
      if (user) {
        console.log("User found, redirecting to dashboard")
        try {
          await router.push("/dashboard")
          console.log("Navigation initiated")
        } catch (navError) {
          console.error("Navigation error:", navError)
        }
      } else {
        console.log("No user returned from sign in")
      }
    } catch (error: any) {
      console.error("Login error details:", error)
      console.error("Error code:", error.code)
      console.error("Error message:", error.message)

      // Gérer les différents types d'erreurs Firebase
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setError("Email ou mot de passe incorrect.")
      } else if (error.code === "auth/too-many-requests") {
        setError("Trop de tentatives de connexion. Veuillez réessayer plus tard.")
      } else {
        setError("Une erreur est survenue lors de la connexion. Veuillez réessayer.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/Logo1.png"
            alt="FGVEJ Logo"
            width={80}
            height={80}
            className="mx-auto"
            style={{ objectFit: 'contain' }}
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Connexion</h2>
          <p className="mt-2 text-gray-600">Accédez à votre espace personnel pour gérer vos projets</p>
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="/auth/reset-password" className="text-sm font-medium text-green-600 hover:text-green-500">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? (
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
          <CardFooter className="flex justify-center border-t p-6">
            <p className="text-center text-sm text-gray-600">
              Vous n'avez pas de compte ?{" "}
              <Link href="/auth/register" className="font-medium text-green-600 hover:text-green-500">
                Créer un compte
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
