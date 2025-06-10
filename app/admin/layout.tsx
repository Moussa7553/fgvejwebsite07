"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Notifications from "@/app/components/Notifications"

interface CustomUser {
  uid: string
  email: string | null
  role?: "user" | "admin"
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const customUser = user as CustomUser | null
    if (!customUser || customUser.role !== "admin") {
      router.push("/auth/login")
    }
  }, [user, router])

  const customUser = user as CustomUser | null
  if (!customUser || customUser.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Administration</h1>
            <div className="flex items-center gap-4">
              <Notifications />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
} 