"use client"

import { useEffect, useState } from "react"
import { getProjects } from "@/app/actions/projet"

interface Notification {
  id: string
  type: "projet" | "message"
  message: string
  date: string
  lu: boolean
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [lastCheck, setLastCheck] = useState<Date>(new Date())

  // Charger les notifications initiales
  useEffect(() => {
    const chargerNotifications = async () => {
      try {
        const resultat = await getProjects()
        if (resultat.succes && resultat.projets) {
          // Convertir les projets en notifications
          const nouvellesNotifications = resultat.projets
            .filter((projet: any) => new Date(projet.date_creation) > lastCheck)
            .map((projet: any) => ({
              id: projet._id,
              type: "projet" as const,
              message: `Nouveau projet : ${projet.titre} par ${projet.nom}`,
              date: projet.date_creation,
              lu: false
            }))

          if (nouvellesNotifications.length > 0) {
            setNotifications(prev => [...nouvellesNotifications, ...prev])
            setUnreadCount(prev => prev + nouvellesNotifications.length)
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des notifications:", error)
      }
    }

    // Vérifier les nouvelles notifications toutes les 30 secondes
    const interval = setInterval(() => {
      chargerNotifications()
      setLastCheck(new Date())
    }, 30000)

    // Charger les notifications au démarrage
    chargerNotifications()

    return () => clearInterval(interval)
  }, [lastCheck])

  const marquerCommeLu = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, lu: true } : notif
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const marquerToutCommeLu = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, lu: true }))
    )
    setUnreadCount(0)
  }

  return (
    <div className="relative">
      {/* Bouton de notification */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Liste des notifications */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={marquerToutCommeLu}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Aucune notification
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 ${
                    !notification.lu ? "bg-blue-50" : ""
                  }`}
                  onClick={() => marquerCommeLu(notification.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {notification.type === "projet" ? (
                        <svg
                          className="h-6 w-6 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
} 