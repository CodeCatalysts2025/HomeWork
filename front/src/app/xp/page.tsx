"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { XPSystem } from "@/components/xp/xp-system"
import { BadgeSystem } from "@/components/xp/badge-system"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Award, TrendingUp, Target } from "lucide-react"

export default function XPPage() {
  const [userStats, setUserStats] = useState({
    lessonsCompleted: 23,
    lessonsTaught: 12,
    studentsHelped: 156,
    perfectQuizzes: 8,
    currentStreak: 7,
    totalXP: 2450,
    level: 12,
  })

  const handleXPGain = (xpGain: any) => {
    setUserStats((prev) => ({
      ...prev,
      totalXP: prev.totalXP + xpGain.amount + (xpGain.bonus || 0),
    }))
  }

  const handleBadgeEarned = (badge: any) => {
    setUserStats((prev) => ({
      ...prev,
      totalXP: prev.totalXP + badge.xpReward,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="lg:pl-64 pb-16 lg:pb-0">
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">XP & Rewards</h1>
              <p className="text-muted-foreground">Track your progress and unlock achievements</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="xp" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="xp" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  XP System
                </TabsTrigger>
                <TabsTrigger value="badges" className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Badges
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Leaderboard
                </TabsTrigger>
              </TabsList>

              <TabsContent value="xp" className="space-y-6">
                <XPSystem
                  currentXP={userStats.totalXP}
                  currentLevel={userStats.level}
                  onXPGain={handleXPGain}
                  onLevelUp={(newLevel) => setUserStats((prev) => ({ ...prev, level: newLevel }))}
                />
              </TabsContent>

              <TabsContent value="badges" className="space-y-6">
                <BadgeSystem userStats={userStats} onBadgeEarned={handleBadgeEarned} />
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Coming Soon
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The leaderboard feature will be available in the next update!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
