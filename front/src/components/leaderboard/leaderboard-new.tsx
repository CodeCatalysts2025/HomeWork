"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Crown, Medal, Star, TrendingUp, Users, Zap, BookOpen, Calendar } from "lucide-react"

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  level: number
  xp: number
  lessonsCompleted: number
  lessonsTaught: number
  badgesEarned: number
  streak: number
  rank: number
  change: number // Position change from last week
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "Emma Chen",
    avatar: "EC",
    level: 15,
    xp: 8750,
    lessonsCompleted: 45,
    lessonsTaught: 32,
    badgesEarned: 28,
    streak: 21,
    rank: 1,
    change: 2,
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    avatar: "AR",
    level: 14,
    xp: 8200,
    lessonsCompleted: 38,
    lessonsTaught: 29,
    badgesEarned: 25,
    streak: 15,
    rank: 2,
    change: -1,
  },
  {
    id: "3",
    name: "Sarah Kim",
    avatar: "SK",
    level: 13,
    xp: 7890,
    lessonsCompleted: 42,
    lessonsTaught: 28,
    badgesEarned: 24,
    streak: 18,
    rank: 3,
    change: 1,
  },
  {
    id: "4",
    name: "Marcus Johnson",
    avatar: "MJ",
    level: 12,
    xp: 7450,
    lessonsCompleted: 35,
    lessonsTaught: 22,
    badgesEarned: 21,
    streak: 12,
    rank: 4,
    change: -2,
  },
  {
    id: "5",
    name: "Lisa Wang",
    avatar: "LW",
    level: 12,
    xp: 7200,
    lessonsCompleted: 33,
    lessonsTaught: 25,
    badgesEarned: 20,
    streak: 9,
    rank: 5,
    change: 0,
  },
  {
    id: "6",
    name: "David Park",
    avatar: "DP",
    level: 11,
    xp: 6800,
    lessonsCompleted: 29,
    lessonsTaught: 18,
    badgesEarned: 18,
    streak: 7,
    rank: 6,
    change: 3,
  },
  {
    id: "7",
    name: "You",
    avatar: "YU",
    level: 7,
    xp: 2450,
    lessonsCompleted: 23,
    lessonsTaught: 15,
    badgesEarned: 12,
    streak: 5,
    rank: 47,
    change: 8,
  },
]

const timeframes = [
  { id: "weekly", name: "This Week", icon: Calendar },
  { id: "monthly", name: "This Month", icon: TrendingUp },
  { id: "alltime", name: "All Time", icon: Trophy },
]

export function Leaderboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("weekly")
  const [selectedCategory, setSelectedCategory] = useState("overall")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">
            #{rank}
          </span>
        )
    }
  }

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return <Badge className="bg-chart-3 text-white">+{change}</Badge>
    } else if (change < 0) {
      return <Badge className="bg-destructive text-white">{change}</Badge>
    }
    return <Badge variant="outline">-</Badge>
  }

  const currentUser = mockLeaderboard.find((user) => user.name === "You")

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Leaderboard
        </h1>
        <p className="text-muted-foreground">See how you rank among your peers in the learning community</p>
      </div>

      {/* Your Rank Card */}
      {currentUser && (
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-16 h-16 border-4 border-primary/30">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                      {currentUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="absolute -bottom-2 -right-2 bg-gradient-to-r from-secondary to-secondary/80">
                    Level {currentUser.level}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{currentUser.name}</h3>
                  <p className="text-muted-foreground">Rank #{currentUser.rank}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{currentUser.xp.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
                {getChangeIndicator(currentUser.change)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeframe Selection */}
      <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="overall" className="text-sm">
            <Trophy className="w-4 h-4 mr-1" />
            Overall
          </TabsTrigger>
          <TabsTrigger value="learning" className="text-sm">
            <BookOpen className="w-4 h-4 mr-1" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="teaching" className="text-sm">
            <Users className="w-4 h-4 mr-1" />
            Teaching
          </TabsTrigger>
          <TabsTrigger value="streaks" className="text-sm">
            <Zap className="w-4 h-4 mr-1" />
            Streaks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLeaderboard.slice(0, 10).map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    user.name === "You"
                      ? "bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>
                    <Avatar className={`w-12 h-12 ${user.rank <= 3 ? "border-2 border-yellow-400" : ""}`}>
                      <AvatarFallback
                        className={`font-semibold ${
                          user.rank === 1
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                            : user.rank === 2
                              ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                              : user.rank === 3
                                ? "bg-gradient-to-br from-amber-500 to-amber-700 text-white"
                                : "bg-gradient-to-br from-primary to-secondary text-white"
                        }`}
                      >
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">Level {user.level}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-bold text-primary">{user.xp.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{user.badgesEarned}</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                    <div className="w-16">{getChangeIndicator(user.change)}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-chart-1" />
                Top Learners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLeaderboard
                .sort((a, b) => b.lessonsCompleted - a.lessonsCompleted)
                .slice(0, 10)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="w-8 text-center font-bold text-muted-foreground">#{index + 1}</span>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-chart-1 to-chart-1/80 text-white">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">Level {user.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-chart-1">{user.lessonsCompleted}</div>
                      <div className="text-xs text-muted-foreground">Lessons</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teaching" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                Top Teachers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLeaderboard
                .sort((a, b) => b.lessonsTaught - a.lessonsTaught)
                .slice(0, 10)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="w-8 text-center font-bold text-muted-foreground">#{index + 1}</span>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-secondary to-secondary/80 text-white">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">Level {user.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-secondary">{user.lessonsTaught}</div>
                      <div className="text-xs text-muted-foreground">Lessons Taught</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-chart-3" />
                Streak Champions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLeaderboard
                .sort((a, b) => b.streak - a.streak)
                .slice(0, 10)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="w-8 text-center font-bold text-muted-foreground">#{index + 1}</span>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-chart-3 to-chart-3/80 text-white">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">Level {user.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-chart-3">{user.streak}</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Achievement Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-chart-4" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Crown className="w-6 h-6 text-yellow-500" />
              <div>
                <div className="font-semibold">Emma Chen reached Level 15!</div>
                <div className="text-sm text-muted-foreground">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Trophy className="w-6 h-6 text-secondary" />
              <div>
                <div className="font-semibold">Alex Rodriguez earned "Master Teacher" badge</div>
                <div className="text-sm text-muted-foreground">5 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Zap className="w-6 h-6 text-chart-3" />
              <div>
                <div className="font-semibold">Sarah Kim achieved a 20-day streak!</div>
                <div className="text-sm text-muted-foreground">1 day ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
