"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Plus, Target, BookOpen } from "lucide-react"

export function DashboardHeader() {
  const [timeOfDay] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 17) return "afternoon"
    return "evening"
  })

  const user = {
    name: "Alex",
    level: 12,
    xp: 2450,
    streak: 7,
  }

  return (
    <div className="space-y-4">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            Good {timeOfDay}, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">Ready to level up your knowledge today?</p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            <Plus className="w-4 h-4" />
            Create Lesson
          </Button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-xl border border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Level {user.level}</p>
            <p className="text-xs text-muted-foreground">{user.xp} XP</p>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium">{user.streak} Day Streak</p>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium">3 Active</p>
            <p className="text-xs text-muted-foreground">Lessons</p>
          </div>
        </div>

        <div className="ml-auto">
          <Badge variant="secondary" className="bg-success/20 text-success-foreground">
            🔥 On Fire!
          </Badge>
        </div>
      </div>
    </div>
  )
}
