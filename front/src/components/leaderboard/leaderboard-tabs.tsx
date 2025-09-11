"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Crown, Star, TrendingUp, Users, BookOpen, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  level: number
  xp: number
  weeklyXP: number
  monthlyXP: number
  lessonsCompleted: number
  lessonsTaught: number
  rating: number
  badges: number
  streak: number
  rank: number
  previousRank?: number
}

export function LeaderboardTabs() {
  const [selectedPeriod, setSelectedPeriod] = useState("all-time")

  // Mock leaderboard data
  const users: LeaderboardUser[] = [
    {
      id: "1",
      name: "Sarah Kim",
      avatar: "/teacher-avatar-1.png",
      level: 25,
      xp: 15420,
      weeklyXP: 850,
      monthlyXP: 3200,
      lessonsCompleted: 89,
      lessonsTaught: 45,
      rating: 4.9,
      badges: 28,
      streak: 21,
      rank: 1,
      previousRank: 2,
    },
    {
      id: "2",
      name: "Alex Chen",
      avatar: "/teen-avatar.png",
      level: 12,
      xp: 2450,
      weeklyXP: 340,
      monthlyXP: 1200,
      lessonsCompleted: 23,
      lessonsTaught: 12,
      rating: 4.8,
      badges: 15,
      streak: 7,
      rank: 2,
      previousRank: 1,
    },
    {
      id: "3",
      name: "Mike Chen",
      avatar: "/teacher-avatar-2.png",
      level: 18,
      xp: 8750,
      weeklyXP: 520,
      monthlyXP: 2100,
      lessonsCompleted: 67,
      lessonsTaught: 32,
      rating: 4.7,
      badges: 22,
      streak: 14,
      rank: 3,
      previousRank: 3,
    },
    {
      id: "4",
      name: "Emma Wilson",
      avatar: "/teacher-avatar-1.png",
      level: 15,
      xp: 6890,
      weeklyXP: 420,
      monthlyXP: 1800,
      lessonsCompleted: 54,
      lessonsTaught: 28,
      rating: 4.6,
      badges: 19,
      streak: 9,
      rank: 4,
      previousRank: 5,
    },
    {
      id: "5",
      name: "David Park",
      avatar: "/teacher-avatar-2.png",
      level: 14,
      xp: 5670,
      weeklyXP: 380,
      monthlyXP: 1650,
      lessonsCompleted: 48,
      lessonsTaught: 22,
      rating: 4.5,
      badges: 17,
      streak: 5,
      rank: 5,
      previousRank: 4,
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">
            #{rank}
          </span>
        )
    }
  }

  const getRankChange = (user: LeaderboardUser) => {
    if (!user.previousRank) return null
    const change = user.previousRank - user.rank
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else if (change < 0) {
      return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
    }
    return <div className="w-4 h-4 bg-muted rounded-full" />
  }

  const getXPForPeriod = (user: LeaderboardUser, period: string) => {
    switch (period) {
      case "weekly":
        return user.weeklyXP
      case "monthly":
        return user.monthlyXP
      default:
        return user.xp
    }
  }

  const sortedUsers = [...users].sort((a, b) => {
    const aXP = getXPForPeriod(a, selectedPeriod)
    const bXP = getXPForPeriod(b, selectedPeriod)
    return bXP - aXP
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other learners</p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Updated daily</span>
        </div>
      </div>

      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-time">All Time</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPeriod} className="space-y-6">
          {/* Top 3 Podium */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-50 via-gray-50 to-amber-50 dark:from-yellow-950/20 dark:via-gray-950/20 dark:to-amber-950/20 p-6">
              <div className="flex items-end justify-center gap-8">
                {/* 2nd Place */}
                {sortedUsers[1] && (
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-20 bg-gray-300 rounded-t-lg flex items-end justify-center pb-2">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <Avatar className="w-16 h-16 border-4 border-gray-300 absolute -top-8 left-0">
                        <AvatarImage src={sortedUsers[1].avatar || "/placeholder.svg"} alt={sortedUsers[1].name} />
                        <AvatarFallback>
                          {sortedUsers[1].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <p className="font-semibold text-sm">{sortedUsers[1].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {getXPForPeriod(sortedUsers[1], selectedPeriod).toLocaleString()} XP
                    </p>
                  </div>
                )}

                {/* 1st Place */}
                {sortedUsers[0] && (
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-24 bg-yellow-400 rounded-t-lg flex items-end justify-center pb-2">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <Avatar className="w-20 h-20 border-4 border-yellow-400 absolute -top-10 left-0 right-0 mx-auto">
                        <AvatarImage src={sortedUsers[0].avatar || "/placeholder.svg"} alt={sortedUsers[0].name} />
                        <AvatarFallback>
                          {sortedUsers[0].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <p className="font-bold text-lg">{sortedUsers[0].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {getXPForPeriod(sortedUsers[0], selectedPeriod).toLocaleString()} XP
                    </p>
                  </div>
                )}

                {/* 3rd Place */}
                {sortedUsers[2] && (
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-amber-600 rounded-t-lg flex items-end justify-center pb-2">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <Avatar className="w-16 h-16 border-4 border-amber-600 absolute -top-8 left-0">
                        <AvatarImage src={sortedUsers[2].avatar || "/placeholder.svg"} alt={sortedUsers[2].name} />
                        <AvatarFallback>
                          {sortedUsers[2].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <p className="font-semibold text-sm">{sortedUsers[2].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {getXPForPeriod(sortedUsers[2], selectedPeriod).toLocaleString()} XP
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/50",
                      index < 3 &&
                        "bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-950/10 dark:to-orange-950/10",
                      user.id === "2" && "ring-2 ring-primary/20 bg-primary/5", // Highlight current user
                    )}
                  >
                    {/* Rank */}
                    <div className="flex items-center gap-2 w-16">
                      {getRankIcon(index + 1)}
                      {getRankChange(user)}
                    </div>

                    {/* Avatar */}
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold truncate">{user.name}</p>
                        {user.id === "2" && (
                          <Badge variant="secondary" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Level {user.level}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{user.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>{user.badges}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <p className="font-bold text-lg">{getXPForPeriod(user, selectedPeriod).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Active Learners</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold">{users.reduce((sum, user) => sum + user.lessonsCompleted, 0)}</p>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold">
                  {Math.max(...users.map((user) => getXPForPeriod(user, selectedPeriod))).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Highest{" "}
                  {selectedPeriod === "all-time" ? "Total" : selectedPeriod === "monthly" ? "Monthly" : "Weekly"} XP
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
