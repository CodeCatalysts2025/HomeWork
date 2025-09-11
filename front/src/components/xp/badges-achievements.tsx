"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Star, Target, Zap, Users, BookOpen, Calendar, Award, Lock, Filter } from "lucide-react"

interface BadgeData {
  id: string
  name: string
  description: string
  icon: string
  category: "learning" | "teaching" | "social" | "streak" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
  earned: boolean
  earnedDate?: Date
  progress?: number
  maxProgress?: number
  xpReward: number
}

const mockBadges: BadgeData[] = [
  // Learning Badges
  {
    id: "first-lesson",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    category: "learning",
    rarity: "common",
    earned: true,
    earnedDate: new Date("2024-01-15"),
    xpReward: 50,
  },
  {
    id: "scholar",
    name: "Scholar",
    description: "Complete 20 lessons",
    icon: "📚",
    category: "learning",
    rarity: "rare",
    earned: true,
    earnedDate: new Date("2024-02-10"),
    progress: 23,
    maxProgress: 20,
    xpReward: 200,
  },
  {
    id: "knowledge-seeker",
    name: "Knowledge Seeker",
    description: "Complete 50 lessons",
    icon: "🔍",
    category: "learning",
    rarity: "epic",
    earned: false,
    progress: 23,
    maxProgress: 50,
    xpReward: 500,
  },
  {
    id: "master-learner",
    name: "Master Learner",
    description: "Complete 100 lessons",
    icon: "🎓",
    category: "learning",
    rarity: "legendary",
    earned: false,
    progress: 23,
    maxProgress: 100,
    xpReward: 1000,
  },

  // Teaching Badges
  {
    id: "helper",
    name: "Helper",
    description: "Teach 5 lessons to peers",
    icon: "🤝",
    category: "teaching",
    rarity: "common",
    earned: true,
    earnedDate: new Date("2024-01-20"),
    progress: 15,
    maxProgress: 5,
    xpReward: 100,
  },
  {
    id: "mentor",
    name: "Mentor",
    description: "Teach 25 lessons",
    icon: "👨‍🏫",
    category: "teaching",
    rarity: "rare",
    earned: false,
    progress: 15,
    maxProgress: 25,
    xpReward: 300,
  },
  {
    id: "guru",
    name: "Guru",
    description: "Teach 100 lessons with 4.5+ rating",
    icon: "🧙‍♂️",
    category: "teaching",
    rarity: "legendary",
    earned: false,
    progress: 15,
    maxProgress: 100,
    xpReward: 1500,
  },

  // Social Badges
  {
    id: "feedback-star",
    name: "Feedback Star",
    description: "Receive 50 positive reviews",
    icon: "⭐",
    category: "social",
    rarity: "rare",
    earned: true,
    earnedDate: new Date("2024-02-05"),
    progress: 67,
    maxProgress: 50,
    xpReward: 250,
  },
  {
    id: "community-favorite",
    name: "Community Favorite",
    description: "Get 100 peer endorsements",
    icon: "💖",
    category: "social",
    rarity: "epic",
    earned: false,
    progress: 34,
    maxProgress: 100,
    xpReward: 400,
  },

  // Streak Badges
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    category: "streak",
    rarity: "common",
    earned: true,
    earnedDate: new Date("2024-01-25"),
    xpReward: 150,
  },
  {
    id: "dedication",
    name: "Dedication",
    description: "Maintain a 30-day streak",
    icon: "💪",
    category: "streak",
    rarity: "epic",
    earned: false,
    progress: 12,
    maxProgress: 30,
    xpReward: 600,
  },

  // Special Badges
  {
    id: "quiz-champion",
    name: "Quiz Champion",
    description: "Perfect score on 10 quizzes",
    icon: "🏆",
    category: "special",
    rarity: "rare",
    earned: true,
    earnedDate: new Date("2024-02-01"),
    progress: 12,
    maxProgress: 10,
    xpReward: 300,
  },
  {
    id: "early-adopter",
    name: "Early Adopter",
    description: "Join PeerXP in the first month",
    icon: "🚀",
    category: "special",
    rarity: "legendary",
    earned: true,
    earnedDate: new Date("2024-01-01"),
    xpReward: 500,
  },
]

const categories = [
  { id: "all", name: "All Badges", icon: Trophy },
  { id: "learning", name: "Learning", icon: BookOpen },
  { id: "teaching", name: "Teaching", icon: Users },
  { id: "social", name: "Social", icon: Star },
  { id: "streak", name: "Streaks", icon: Calendar },
  { id: "special", name: "Special", icon: Award },
]

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
}

const rarityGradients = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-yellow-600",
}

export function BadgesAchievements() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [showNewBadge, setShowNewBadge] = useState(false)
  const [newBadge, setNewBadge] = useState<BadgeData | null>(null)

  const filteredBadges = mockBadges.filter((badge) => selectedCategory === "all" || badge.category === selectedCategory)

  const sortedBadges = [...filteredBadges].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        if (!a.earnedDate && !b.earnedDate) return 0
        if (!a.earnedDate) return 1
        if (!b.earnedDate) return -1
        return b.earnedDate.getTime() - a.earnedDate.getTime()
      case "rarity":
        const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 }
        return rarityOrder[b.rarity] - rarityOrder[a.rarity]
      case "progress":
        const aProgress = a.progress && a.maxProgress ? (a.progress / a.maxProgress) * 100 : a.earned ? 100 : 0
        const bProgress = b.progress && b.maxProgress ? (b.progress / b.maxProgress) * 100 : b.earned ? 100 : 0
        return bProgress - aProgress
      default:
        return 0
    }
  })

  const earnedBadges = mockBadges.filter((badge) => badge.earned)
  const totalBadges = mockBadges.length
  const completionPercentage = (earnedBadges.length / totalBadges) * 100

  const simulateBadgeUnlock = () => {
    const unearnedBadges = mockBadges.filter((badge) => !badge.earned)
    if (unearnedBadges.length > 0) {
      const randomBadge = unearnedBadges[Math.floor(Math.random() * unearnedBadges.length)]
      randomBadge.earned = true
      randomBadge.earnedDate = new Date()
      setNewBadge(randomBadge)
      setShowNewBadge(true)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* New Badge Unlock Modal */}
      {showNewBadge && newBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-gradient-to-br from-secondary/10 to-chart-1/10 border-secondary/30">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="confetti text-6xl mb-4">{newBadge.icon}</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-secondary to-chart-1 bg-clip-text text-transparent">
                Badge Unlocked!
              </h2>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{newBadge.name}</h3>
                <p className="text-muted-foreground">{newBadge.description}</p>
                <Badge className={`bg-gradient-to-r ${rarityGradients[newBadge.rarity]} text-white`}>
                  {newBadge.rarity.charAt(0).toUpperCase() + newBadge.rarity.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center justify-center gap-2 text-secondary font-semibold">
                <Zap className="w-4 h-4" />+{newBadge.xpReward} XP
              </div>
              <Button onClick={() => setShowNewBadge(false)} className="bg-gradient-to-r from-secondary to-chart-1">
                Awesome!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Badges & Achievements
          </h1>
          <p className="text-muted-foreground">Track your progress and celebrate your accomplishments</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{earnedBadges.length}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{Math.round(completionPercentage)}%</div>
            <div className="text-sm text-muted-foreground">Collection Complete</div>
          </Card>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Collection Progress</h3>
              <span className="text-sm text-muted-foreground">
                {earnedBadges.length} / {totalBadges} badges
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                style={{ width: `${completionPercentage}%` }}
              />
            </Progress>
            <Button onClick={simulateBadgeUnlock} className="bg-gradient-to-r from-secondary to-secondary/80">
              Simulate Badge Unlock (Demo)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters & Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    <category.icon className="w-4 h-4 mr-1" />
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Earned</SelectItem>
                  <SelectItem value="rarity">By Rarity</SelectItem>
                  <SelectItem value="progress">By Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedBadges.map((badge) => (
          <Card
            key={badge.id}
            className={`relative overflow-hidden transition-all hover:shadow-lg ${
              badge.earned ? "bg-gradient-to-br from-background to-muted/30" : "bg-muted/20"
            } ${!badge.earned ? "opacity-75" : ""}`}
          >
            {/* Rarity Border */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rarityGradients[badge.rarity]}`} />

            <CardContent className="pt-6 text-center space-y-4">
              {/* Badge Icon */}
              <div className="relative">
                <div
                  className={`text-6xl mb-2 ${badge.earned ? "" : "grayscale opacity-50"} transition-all duration-300`}
                >
                  {badge.earned ? badge.icon : "🔒"}
                </div>
                {!badge.earned && (
                  <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                )}
              </div>

              {/* Badge Info */}
              <div className="space-y-2">
                <h3 className={`font-bold ${badge.earned ? "text-foreground" : "text-muted-foreground"}`}>
                  {badge.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{badge.description}</p>

                {/* Rarity Badge */}
                <Badge className={`bg-gradient-to-r ${rarityGradients[badge.rarity]} text-white`}>
                  {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                </Badge>
              </div>

              {/* Progress or Earned Date */}
              {badge.earned ? (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Earned {badge.earnedDate?.toLocaleDateString()}</div>
                  <div className="flex items-center justify-center gap-1 text-secondary font-semibold text-sm">
                    <Zap className="w-3 h-3" />+{badge.xpReward} XP
                  </div>
                </div>
              ) : badge.progress !== undefined && badge.maxProgress !== undefined ? (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    Progress: {badge.progress} / {badge.maxProgress}
                  </div>
                  <Progress value={(badge.progress / badge.maxProgress) * 100} className="h-2" />
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">Requirements not met</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-chart-1" />
            Achievement Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-chart-1/10 to-chart-1/5 rounded-lg">
              <div className="text-3xl mb-2">🏅</div>
              <div className="font-semibold">Bronze Collector</div>
              <div className="text-sm text-muted-foreground mb-2">Earn 10 badges</div>
              <Progress value={(earnedBadges.length / 10) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {Math.max(0, 10 - earnedBadges.length)} badges to go
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 rounded-lg">
              <div className="text-3xl mb-2">🥈</div>
              <div className="font-semibold">Silver Collector</div>
              <div className="text-sm text-muted-foreground mb-2">Earn 25 badges</div>
              <Progress value={(earnedBadges.length / 25) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {Math.max(0, 25 - earnedBadges.length)} badges to go
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-chart-3/10 to-chart-3/5 rounded-lg">
              <div className="text-3xl mb-2">🥇</div>
              <div className="font-semibold">Gold Collector</div>
              <div className="text-sm text-muted-foreground mb-2">Earn all badges</div>
              <Progress value={completionPercentage} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {Math.max(0, totalBadges - earnedBadges.length)} badges to go
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
