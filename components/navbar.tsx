"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, FileText } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo et nom du site */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo1.png"
                alt="FGVEJ Logo"
                width={40}
                height={40}
                className="mr-2"
                style={{ width: 'auto', height: 'auto' }}
              />
              <span className="text-xl font-bold text-green-800">FGVEJ</span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 text-gray-700 hover:text-green-600">
              Accueil
            </Link>
            <Link href="/qui-sommes-nous" className="px-3 py-2 text-gray-700 hover:text-green-600">
              Qui sommes-nous
            </Link>
            <Link href="/nos-services" className="px-3 py-2 text-gray-700 hover:text-green-600">
              Nos Services
            </Link>
            <Link href="/projets-finances" className="px-3 py-2 text-gray-700 hover:text-green-600">
              Projets Financés
            </Link>
            <Link href="/ressources" className="px-3 py-2 text-gray-700 hover:text-green-600">
              Ressources
            </Link>
            <Link href="/contact" className="px-3 py-2 text-gray-700 hover:text-green-600">
              Contact
            </Link>
          </div>

          {/* Boutons d'authentification - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Mon Compte
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/soumettre-projet" className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Soumettre un projet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/auth/login">Connexion</Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/auth/register">Inscription</Link>
                </Button>
              </>
            )}
          </div>

          {/* Bouton Menu - Mobile */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/qui-sommes-nous"
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Qui sommes-nous
            </Link>
            <Link
              href="/nos-services"
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Nos Services
            </Link>
            <Link
              href="/projets-finances"
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Projets Financés
            </Link>
            <Link
              href="/ressources"
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Ressources
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-2 border-t border-gray-200 mt-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Tableau de bord
                  </Link>
                  <Link
                    href="/soumettre-projet"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Soumettre un projet
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      Connexion
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-center bg-green-600 hover:bg-green-700">
                    <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                      Inscription
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
