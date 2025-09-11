import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Star, Users, Award, MessageCircle } from "lucide-react"

interface Notification {
  id: string
  type: "xp" | "feedback" | "badge" | "lesson" | "message"
  title: string
  description: string
  time: string
  isNew: boolean
}

export function NotificationPanel() {
  const notifications: Notification[] = [
    {
      id: "1",
      type: "xp",
      title: "XP Gained!",
      description: "You earned 50 XP from completing React Hooks lesson",
      time: "2 hours ago",
      isNew: true,
    },
    {
      id: "2",
      type: "feedback",
      title: "New Feedback",
      description: "Sarah rated your JavaScript lesson 5 stars!",
      time: "4 hours ago",
      isNew: true,
    },
    {
      id: "3",
      type: "badge",
      title: "Badge Unlocked!",
      description: "You earned the 'Helper' badge for teaching 10 lessons",
      time: "1 day ago",
      isNew: false,
    },
    {
      id: "4",
      type: "lesson",
      title: "New Lesson Available",
      description: "Advanced CSS Grid lesson is now available",
      time: "2 days ago",
      isNew: false,
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "xp":
        return <Star className="w-4 h-4 text-yellow-500" />
      case "feedback":
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case "badge":
        return <Award className="w-4 h-4 text-purple-500" />
      case "lesson":
        return <Users className="w-4 h-4 text-green-500" />
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />
    }
  }

  const newNotificationsCount = notifications.filter((n) => n.isNew).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </CardTitle>
          {newNotificationsCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {newNotificationsCount} new
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {notifications.slice(0, 4).map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 ${
                notification.isNew ? "bg-muted/30 border-primary/20" : "bg-muted/20 border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium truncate text-black dark:text-white">{notification.title}</p>
                    {notification.isNew && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          View All Notifications
        </Button>
      </CardContent>
    </Card>
  )
}
