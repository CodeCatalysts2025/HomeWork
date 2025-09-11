import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Zap, Clock } from "lucide-react"

export function QuickStats() {
  const stats = {
    weeklyXP: 340,
    weeklyGoal: 500,
    streak: 7,
    todayLessons: 2,
    todayGoal: 3,
  }

  const weeklyProgress = (stats.weeklyXP / stats.weeklyGoal) * 100
  const dailyProgress = (stats.todayLessons / stats.todayGoal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly XP Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Weekly XP</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {stats.weeklyXP}/{stats.weeklyGoal}
            </Badge>
          </div>
          <Progress value={weeklyProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">{stats.weeklyGoal - stats.weeklyXP} XP to reach weekly goal</p>
        </div>

        {/* Daily Lessons Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Today's Lessons</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {stats.todayLessons}/{stats.todayGoal}
            </Badge>
          </div>
          <Progress value={dailyProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {stats.todayGoal - stats.todayLessons} more to complete daily goal
          </p>
        </div>

        {/* Learning Streak */}
        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="font-semibold text-orange-900 dark:text-orange-100">{stats.streak} Day Streak</p>
              <p className="text-xs text-orange-700 dark:text-orange-300">Keep the momentum going!</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
              Find Lesson
            </button>
            <button className="p-2 text-xs bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors">
              Create Quest
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
