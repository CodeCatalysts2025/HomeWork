"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap, Star, Award, TrendingUp, Gift, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface XPGain {
  amount: number
  source: string
  bonus?: number
  timestamp: Date
}

interface XPSystemProps {
  currentXP: number
  currentLevel: number
  onXPGain?: (xp: XPGain) => void
  showLevelUpAnimation?: boolean
  onLevelUp?: (newLevel: number) => void
}

export function XPSystem({
  currentXP,
  currentLevel,
  onXPGain,
  showLevelUpAnimation = false,
  onLevelUp,
}: XPSystemProps) {
  const [displayXP, setDisplayXP] = useState(currentXP)
  const [displayLevel, setDisplayLevel] = useState(currentLevel)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // XP calculation functions
  const getXPForLevel = (level: number) => {
    return Math.floor(100 * Math.pow(1.5, level - 1))
  }

  const getLevelFromXP = (xp: number) => {
    let level = 1
    let totalXP = 0
    while (totalXP <= xp) {
      totalXP += getXPForLevel(level)
      if (totalXP > xp) break
      level++
    }
    return level
  }

  const getXPForCurrentLevel = (level: number) => {
    let totalXP = 0
    for (let i = 1; i < level; i++) {
      totalXP += getXPForLevel(i)
    }
    return totalXP
  }

  const currentLevelXP = getXPForCurrentLevel(displayLevel)
  const nextLevelXP = currentLevelXP + getXPForLevel(displayLevel)
  const progressInLevel = displayXP - currentLevelXP
  const xpNeededForNext = getXPForLevel(displayLevel)
  const progressPercentage = (progressInLevel / xpNeededForNext) * 100

  // Animate XP gain
  const animateXPGain = (targetXP: number) => {
    setIsAnimating(true)
    const startXP = displayXP
    const difference = targetXP - startXP
    const duration = 1500 // 1.5 seconds
    const steps = 60
    const increment = difference / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const newXP = startXP + increment * currentStep
      setDisplayXP(Math.floor(newXP))

      // Check for level up
      const newLevel = getLevelFromXP(newXP)
      if (newLevel > displayLevel) {
        setDisplayLevel(newLevel)
        setShowConfetti(true)
        onLevelUp?.(newLevel)
        setTimeout(() => setShowConfetti(false), 3000)
      }

      if (currentStep >= steps) {
        clearInterval(interval)
        setDisplayXP(targetXP)
        setIsAnimating(false)
      }
    }, duration / steps)
  }

  // Demo XP gain function
  const handleDemoXPGain = (amount: number, source: string, bonus = 0) => {
    const xpGain: XPGain = {
      amount,
      source,
      bonus,
      timestamp: new Date(),
    }

    onXPGain?.(xpGain)
    animateXPGain(displayXP + amount + bonus)
  }

  return (
    <div className="space-y-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
          {/* Confetti particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Level Up Animation */}
      {showLevelUpAnimation && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="p-8 text-center space-y-4 animate-pulse">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary">LEVEL UP!</h2>
            <p className="text-xl">You reached Level {displayLevel}!</p>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-yellow-600">New rewards unlocked!</span>
            </div>
          </Card>
        </div>
      )}

      {/* XP Display Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Level and XP Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Level {displayLevel}</h3>
                  <p className="text-sm text-muted-foreground">{displayXP.toLocaleString()} Total XP</p>
                </div>
              </div>

              <Badge
                variant="secondary"
                className={cn("text-lg px-3 py-1", isAnimating && "animate-pulse bg-yellow-100 text-yellow-800")}
              >
                {displayLevel >= 50
                  ? "Master"
                  : displayLevel >= 25
                    ? "Expert"
                    : displayLevel >= 10
                      ? "Advanced"
                      : "Beginner"}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {displayLevel + 1}</span>
                <span>
                  {progressInLevel.toLocaleString()} / {xpNeededForNext.toLocaleString()} XP
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className={cn("h-3 transition-all duration-500", isAnimating && "animate-pulse")}
              />
              <p className="text-xs text-muted-foreground text-center">
                {(xpNeededForNext - progressInLevel).toLocaleString()} XP until next level
              </p>
            </div>

            {/* XP Sources Breakdown */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Lessons</p>
                <p className="text-xs text-muted-foreground">1,250 XP</p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm font-medium">Teaching</p>
                <p className="text-xs text-muted-foreground">800 XP</p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-sm font-medium">Streaks</p>
                <p className="text-xs text-muted-foreground">300 XP</p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Gift className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-sm font-medium">Bonuses</p>
                <p className="text-xs text-muted-foreground">100 XP</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo XP Gain Buttons */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3">Demo XP Gains</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDemoXPGain(50, "Lesson Complete")}
              className="bg-transparent"
            >
              +50 XP Lesson
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDemoXPGain(75, "Teaching", 25)}
              className="bg-transparent"
            >
              +75 XP Teaching
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDemoXPGain(100, "Quiz Perfect")}
              className="bg-transparent"
            >
              +100 XP Quiz
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDemoXPGain(200, "Daily Streak", 50)}
              className="bg-transparent"
            >
              +200 XP Streak
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
