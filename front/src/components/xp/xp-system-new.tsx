"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Trophy, Star, TrendingUp } from "lucide-react"

interface XPGain {
  id: string
  amount: number
  source: string
  timestamp: Date
  type: "lesson" | "quiz" | "feedback" | "bonus"
}

interface LevelUpData {
  newLevel: number
  xpGained: number
  rewards: string[]
}

export function XPSystem() {
  const [currentXP, setCurrentXP] = useState(2450)
  const [currentLevel, setCurrentLevel] = useState(7)
  const [xpToNext, setXpToNext] = useState(3000)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showXPGain, setShowXPGain] = useState(false)
  const [recentXPGains, setRecentXPGains] = useState<XPGain[]>([
    {
      id: "1",
      amount: 150,
      source: "Completed React Hooks lesson",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "lesson",
    },
    {
      id: "2",
      amount: 50,
      source: "Perfect quiz score",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: "quiz",
    },
    {
      id: "3",
      amount: 25,
      source: "Positive peer feedback",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      type: "feedback",
    },
    {
      id: "4",
      amount: 100,
      source: "Daily streak bonus",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: "bonus",
    },
  ])

  const xpProgress = (currentXP / xpToNext) * 100

  const simulateXPGain = (amount: number, source: string, type: XPGain["type"]) => {
    const newXP = currentXP + amount
    const newGain: XPGain = {
      id: Date.now().toString(),
      amount,
      source,
      timestamp: new Date(),
      type,
    }

    setRecentXPGains((prev) => [newGain, ...prev.slice(0, 9)])
    setCurrentXP(newXP)
    setShowXPGain(true)

    // Check for level up
    if (newXP >= xpToNext) {
      const newLevel = currentLevel + 1
      setCurrentLevel(newLevel)
      setXpToNext(newLevel * 500) // Simple level scaling
      setShowLevelUp(true)
    }

    setTimeout(() => setShowXPGain(false), 2000)
  }

  const getXPTypeIcon = (type: XPGain["type"]) => {
    switch (type) {
      case "lesson":
        return "📚"
      case "quiz":
        return "🧠"
      case "feedback":
        return "⭐"
      case "bonus":
        return "🎁"
      default:
        return "⚡"
    }
  }

  const getXPTypeColor = (type: XPGain["type"]) => {
    switch (type) {
      case "lesson":
        return "text-primary"
      case "quiz":
        return "text-secondary"
      case "feedback":
        return "text-chart-1"
      case "bonus":
        return "text-chart-3"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Level Up Modal */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 level-up">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Level Up!
              </h2>
              <p className="text-xl">You're now Level {currentLevel}!</p>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Rewards unlocked:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge className="bg-gradient-to-r from-primary to-primary/80">New Avatar Items</Badge>
                  <Badge className="bg-gradient-to-r from-secondary to-secondary/80">Bonus XP Multiplier</Badge>
                </div>
              </div>
              <Button onClick={() => setShowLevelUp(false)} className="bg-gradient-to-r from-primary to-secondary">
                Awesome!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* XP Gain Animation */}
      {showXPGain && (
        <div className="fixed top-20 right-4 z-40">
          <div className="xp-gain bg-gradient-to-r from-secondary to-secondary/80 text-white px-4 py-2 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="font-semibold">+{recentXPGains[0]?.amount} XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Current XP Status */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Level {currentLevel} Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">{currentXP.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total XP Earned</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{(xpToNext - currentXP).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">XP to Level {currentLevel + 1}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {currentLevel}</span>
              <span>Level {currentLevel + 1}</span>
            </div>
            <Progress value={xpProgress} className="h-4 bg-muted">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${xpProgress}%` }}
              />
            </Progress>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{currentLevel}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-1">2.5x</div>
              <div className="text-sm text-muted-foreground">XP Multiplier</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* XP Simulation Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-secondary" />
            Earn XP (Demo)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => simulateXPGain(150, "Completed lesson", "lesson")}
              className="flex flex-col h-auto p-4 gap-2"
            >
              <span className="text-2xl">📚</span>
              <span className="text-sm">Complete Lesson</span>
              <Badge variant="secondary" className="text-xs">
                +150 XP
              </Badge>
            </Button>

            <Button
              variant="outline"
              onClick={() => simulateXPGain(75, "Aced quiz", "quiz")}
              className="flex flex-col h-auto p-4 gap-2"
            >
              <span className="text-2xl">🧠</span>
              <span className="text-sm">Perfect Quiz</span>
              <Badge variant="secondary" className="text-xs">
                +75 XP
              </Badge>
            </Button>

            <Button
              variant="outline"
              onClick={() => simulateXPGain(25, "Great feedback", "feedback")}
              className="flex flex-col h-auto p-4 gap-2"
            >
              <span className="text-2xl">⭐</span>
              <span className="text-sm">Peer Feedback</span>
              <Badge variant="secondary" className="text-xs">
                +25 XP
              </Badge>
            </Button>

            <Button
              variant="outline"
              onClick={() => simulateXPGain(200, "Weekly streak", "bonus")}
              className="flex flex-col h-auto p-4 gap-2"
            >
              <span className="text-2xl">🎁</span>
              <span className="text-sm">Streak Bonus</span>
              <Badge variant="secondary" className="text-xs">
                +200 XP
              </Badge>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent XP Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-chart-3" />
            Recent XP Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentXPGains.map((gain) => (
              <div key={gain.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getXPTypeIcon(gain.type)}</span>
                  <div>
                    <div className="font-medium">{gain.source}</div>
                    <div className="text-sm text-muted-foreground">
                      {gain.timestamp.toLocaleDateString()} at {gain.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${getXPTypeColor(gain.type)}`}>+{gain.amount} XP</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* XP Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-chart-4" />
            Upcoming Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-semibold">Level 10</div>
              <div className="text-sm text-muted-foreground mb-2">Unlock exclusive badges</div>
              <Progress value={70} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">1,550 XP to go</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold">Avatar Master</div>
              <div className="text-sm text-muted-foreground mb-2">Unlock all customizations</div>
              <Progress value={45} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">2,750 XP to go</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-chart-1/10 to-chart-1/5 rounded-lg">
              <div className="text-2xl mb-2">👑</div>
              <div className="font-semibold">Mentor Status</div>
              <div className="text-sm text-muted-foreground mb-2">Become a platform mentor</div>
              <Progress value={25} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">7,500 XP to go</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
