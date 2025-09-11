"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Star, Users, BookOpen, Target, Trophy, Heart, Lock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface BadgeData {
  id: string
  name: string
  description: string
  icon: string
  category: "learning" | "teaching" | "social" | "achievement" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
  requirements: {
    type: string
    value: number
    current?: number
  }[]
  earned: boolean
  earnedDate?: Date
  xpReward: number
}

interface BadgeSystemProps {
  userStats: {
    lessonsCompleted: number
    lessonsTaught: number
    studentsHelped: number
    perfectQuizzes: number
    currentStreak: number
    totalXP: number
    level: number
  }
  onBadgeEarned?: (badge: BadgeData) => void
}

export function BadgeSystem({ userStats, onBadgeEarned }: BadgeSystemProps) {
  const [showNewBadge, setShowNewBadge] = useState<BadgeData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const badges: BadgeData[] = [
    {
      id: "first-lesson",
      name: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      category: "learning",
      rarity: "common",
      requirements: [{ type: "lessonsCompleted", value: 1, current: userStats.lessonsCompleted }],
      earned: userStats.lessonsCompleted >= 1,
      earnedDate: userStats.lessonsCompleted >= 1 ? new Date() : undefined,
      xpReward: 25,
    },
    {
      id: "dedicated-learner",
      name: "Dedicated Learner",
      description: "Complete 10 lessons",
      icon: "📚",
      category: "learning",
      rarity: "common",
      requirements: [{ type: "lessonsCompleted", value: 10, current: userStats.lessonsCompleted }],
      earned: userStats.lessonsCompleted >= 10,
      xpReward: 100,
    },
    {
      id: "knowledge-seeker",
      name: "Knowledge Seeker",
      description: "Complete 50 lessons",
      icon: "🔍",
      category: "learning",
      rarity: "rare",
      requirements: [{ type: "lessonsCompleted", value: 50, current: userStats.lessonsCompleted }],
      earned: userStats.lessonsCompleted >= 50,
      xpReward: 250,
    },
    {
      id: "first-teacher",
      name: "First Teacher",
      description: "Teach your first lesson",
      icon: "👨‍🏫",
      category: "teaching",
      rarity: "common",
      requirements: [{ type: "lessonsTaught", value: 1, current: userStats.lessonsTaught }],
      earned: userStats.lessonsTaught >= 1,
      xpReward: 50,
    },
    {
      id: "mentor",
      name: "Mentor",
      description: "Teach 25 lessons",
      icon: "🎓",
      category: "teaching",
      rarity: "rare",
      requirements: [{ type: "lessonsTaught", value: 25, current: userStats.lessonsTaught }],
      earned: userStats.lessonsTaught >= 25,
      xpReward: 300,
    },
    {
      id: "helper",
      name: "Helper",
      description: "Help 100 students",
      icon: "🤝",
      category: "social",
      rarity: "rare",
      requirements: [{ type: "studentsHelped", value: 100, current: userStats.studentsHelped }],
      earned: userStats.studentsHelped >= 100,
      xpReward: 200,
    },
    {
      id: "perfectionist",
      name: "Perfectionist",
      description: "Get perfect scores on 10 quizzes",
      icon: "💯",
      category: "achievement",
      rarity: "epic",
      requirements: [{ type: "perfectQuizzes", value: 10, current: userStats.perfectQuizzes }],
      earned: userStats.perfectQuizzes >= 10,
      xpReward: 400,
    },
    {
      id: "streak-master",
      name: "Streak Master",
      description: "Maintain a 30-day learning streak",
      icon: "🔥",
      category: "achievement",
      rarity: "epic",
      requirements: [{ type: "currentStreak", value: 30, current: userStats.currentStreak }],
      earned: userStats.currentStreak >= 30,
      xpReward: 500,
    },
    {
      id: "xp-champion",
      name: "XP Champion",
      description: "Earn 10,000 total XP",
      icon: "⚡",
      category: "achievement",
      rarity: "epic",
      requirements: [{ type: "totalXP", value: 10000, current: userStats.totalXP }],
      earned: userStats.totalXP >= 10000,
      xpReward: 1000,
    },
    {
      id: "legend",
      name: "Legend",
      description: "Reach Level 50",
      icon: "👑",
      category: "special",
      rarity: "legendary",
      requirements: [{ type: "level", value: 50, current: userStats.level }],
      earned: userStats.level >= 50,
      xpReward: 2000,
    },
  ]

  const categories = [
    { id: "all", name: "All Badges", icon: Award },
    { id: "learning", name: "Learning", icon: BookOpen },
    { id: "teaching", name: "Teaching", icon: Users },
    { id: "social", name: "Social", icon: Heart },
    { id: "achievement", name: "Achievement", icon: Trophy },
    { id: "special", name: "Special", icon: Star },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "epic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const filteredBadges = badges.filter((badge) => selectedCategory === "all" || badge.category === selectedCategory)

  const earnedBadges = filteredBadges.filter((badge) => badge.earned)
  const availableBadges = filteredBadges.filter((badge) => !badge.earned)

  // Check for newly earned badges
  useEffect(() => {
    const newlyEarned = badges.find(
      (badge) =>
        badge.earned &&
        !badge.earnedDate &&
        badge.requirements.every((req) => (userStats as any)[req.type] >= req.value),
    )

    if (newlyEarned) {
      newlyEarned.earnedDate = new Date()
      setShowNewBadge(newlyEarned)
      onBadgeEarned?.(newlyEarned)
      setTimeout(() => setShowNewBadge(null), 4000)
    }
  }, [userStats])

  return (
    <div className="space-y-6">
      {/* New Badge Animation */}
      {showNewBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="p-8 text-center space-y-4 animate-bounce max-w-md">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl">
              {showNewBadge.icon}
            </div>
            <h2 className="text-2xl font-bold text-primary">Badge Earned!</h2>
            <h3 className="text-xl font-semibold">{showNewBadge.name}</h3>
            <p className="text-muted-foreground">{showNewBadge.description}</p>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-yellow-600">+{showNewBadge.xpReward} XP</span>
            </div>
          </Card>
        </div>
      )}

      {/* Badge Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2 bg-transparent"
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Badge Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{earnedBadges.length}</div>
            <p className="text-sm text-muted-foreground">Earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">{availableBadges.length}</div>
            <p className="text-sm text-muted-foreground">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {earnedBadges.reduce((sum, badge) => sum + badge.xpReward, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Bonus XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((earnedBadges.length / badges.length) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">Complete</p>
          </CardContent>
        </Card>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Earned Badges ({earnedBadges.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="group relative p-4 border border-border rounded-lg hover:shadow-md transition-all cursor-pointer bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{badge.name}</h3>
                      <Badge className={cn("text-xs", getRarityColor(badge.rarity))}>{badge.rarity}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-yellow-600 font-medium">+{badge.xpReward} XP</span>
                    {badge.earnedDate && (
                      <span className="text-muted-foreground">{badge.earnedDate.toLocaleDateString()}</span>
                    )}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                    {badge.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Badges */}
      {availableBadges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-muted-foreground" />
              Available Badges ({availableBadges.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {availableBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="group relative p-4 border border-border rounded-lg hover:shadow-md transition-all cursor-pointer bg-muted/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl grayscale opacity-60">{badge.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-muted-foreground">{badge.name}</h3>
                      <Badge className={cn("text-xs", getRarityColor(badge.rarity))}>{badge.rarity}</Badge>
                    </div>
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>

                  {/* Progress */}
                  <div className="space-y-2">
                    {badge.requirements.map((req, index) => {
                      const progress = Math.min((req.current || 0) / req.value, 1) * 100
                      return (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="capitalize">{req.type.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
                            <span>
                              {req.current || 0} / {req.value}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div
                              className="bg-primary h-1.5 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-border">
                    <span className="text-yellow-600 font-medium">+{badge.xpReward} XP</span>
                    <span className="text-muted-foreground">
                      {Math.round(
                        Math.min((badge.requirements[0].current || 0) / badge.requirements[0].value, 1) * 100,
                      )}
                      %
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                    {badge.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
