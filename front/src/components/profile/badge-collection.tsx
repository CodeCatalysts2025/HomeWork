import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface BadgeItem {
  id: string
  name: string
  icon: string
  description: string
  earned: boolean
}

interface BadgeCollectionProps {
  badges: BadgeItem[]
}

export function BadgeCollection({ badges }: BadgeCollectionProps) {
  const earnedBadges = badges.filter((badge) => badge.earned)
  const lockedBadges = badges.filter((badge) => !badge.earned)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Badge Collection</h2>
        <Badge variant="secondary" className="bg-primary/20 text-primary">
          {earnedBadges.length}/{badges.length} Earned
        </Badge>
      </div>

      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Earned Badges ({earnedBadges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="group relative p-4 border border-border rounded-lg hover:shadow-md transition-all cursor-pointer bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{badge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{badge.name}</h3>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{badge.description}</p>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  {badge.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locked Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            Locked Badges ({lockedBadges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedBadges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "group relative p-4 border border-border rounded-lg transition-all cursor-pointer",
                  "bg-muted/30 opacity-60 hover:opacity-80",
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl grayscale">{badge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-muted-foreground">{badge.name}</h3>
                  </div>
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">{badge.description}</p>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  {badge.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
