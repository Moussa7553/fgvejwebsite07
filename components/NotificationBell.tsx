import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  _id: string
  type: "project" | "contact"
  title: string
  message: string
  reference_id: string
  created_at: string
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/notifications")
      const data = await response.json()
      if (data.notifications) {
        setNotifications(data.notifications)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications:", error)
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les notifications",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      })

      if (response.ok) {
        setNotifications((prev) =>
          prev.filter((n) => n._id !== notificationId)
        )
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notification:", error)
      toast({
        title: "Erreur",
        description: "Impossible de marquer la notification comme lue",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchNotifications()
    // Rafraîchir les notifications toutes les 30 secondes
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => notifications.forEach((n) => markAsRead(n._id))}
            >
              Tout marquer comme lu
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Chargement des notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Aucune notification
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => markAsRead(notification._id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
} 