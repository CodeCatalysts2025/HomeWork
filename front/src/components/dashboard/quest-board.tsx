"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Clock, Users, Star, Zap, BookOpen, Search as Teach } from "lucide-react"
import { cn } from "@/lib/utils"

interface Quest {
  id: string
  title: string
  description: string
  subject: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  xpReward: number
  duration: string
  teacher?: {
    name: string
    avatar: string
    rating: number
  }
  studentsEnrolled?: number
  type: "learn" | "teach"
  status: "available" | "in-progress" | "completed"
}

export function QuestBoard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [activeTab, setActiveTab] = useState("available")

  const quests: Quest[] = [
    {
      id: "1",
      title: "Master React Hooks",
      description: "Learn the fundamentals of useState, useEffect, and custom hooks",
      subject: "Programming",
      difficulty: "Intermediate",
      xpReward: 150,
      duration: "45 min",
      teacher: {
        name: "Sarah Kim",
        avatar: "/teacher-avatar-1.png",
        rating: 4.9,
      },
      studentsEnrolled: 23,
      type: "learn",
      status: "available",
    },
    {
      id: "2",
      title: "JavaScript Fundamentals",
      description: "Teach the basics of JavaScript to beginners",
      subject: "Programming",
      difficulty: "Beginner",
      xpReward: 200,
      duration: "60 min",
      type: "teach",
      status: "available",
    },
    {
      id: "3",
      title: "Advanced CSS Grid",
      description: "Master complex layouts with CSS Grid and Flexbox",
      subject: "Design",
      difficulty: "Advanced",
      xpReward: 180,
      duration: "50 min",
      teacher: {
        name: "Mike Chen",
        avatar: "/teacher-avatar-2.png",
        rating: 4.7,
      },
      studentsEnrolled: 15,
      type: "learn",
      status: "available",
    },
    {
      id: "4",
      title: "Math Problem Solving",
      description: "Help students with algebra and geometry concepts",
      subject: "Mathematics",
      difficulty: "Intermediate",
      xpReward: 120,
      duration: "40 min",
      type: "teach",
      status: "in-progress",
    },
  ]

  const subjects = ["all", "Programming", "Mathematics", "Science", "Design", "Languages"]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredQuests = quests.filter((quest) => {
    const matchesSearch =
      quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quest.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === "all" || quest.subject === selectedSubject
    const matchesDifficulty = selectedDifficulty === "all" || quest.difficulty === selectedDifficulty
    const matchesTab =
      activeTab === "available"
        ? quest.status === "available"
        : activeTab === "in-progress"
          ? quest.status === "in-progress"
          : quest.status === "completed"

    return matchesSearch && matchesSubject && matchesDifficulty && matchesTab
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="w-6 h-6 text-primary" />
            Quest Board
          </CardTitle>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search quests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty === "all" ? "All Levels" : difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">
              Available ({quests.filter((q) => q.status === "available").length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({quests.filter((q) => q.status === "in-progress").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({quests.filter((q) => q.status === "completed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredQuests.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No quests found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredQuests.map((quest) => (
                  <Card key={quest.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Quest Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={cn(
                                  "w-6 h-6 rounded-full flex items-center justify-center",
                                  quest.type === "learn"
                                    ? "bg-blue-100 dark:bg-blue-900/20"
                                    : "bg-purple-100 dark:bg-purple-900/20",
                                )}
                              >
                                {quest.type === "learn" ? (
                                  <BookOpen className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                ) : (
                                  <Teach className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                                )}
                              </div>
                              <Badge
                                variant="outline"
                                className={quest.type === "learn" ? "text-blue-600" : "text-purple-600"}
                              >
                                {quest.type === "learn" ? "Learn" : "Teach"}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {quest.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{quest.description}</p>
                          </div>
                        </div>

                        {/* Quest Details */}
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{quest.subject}</Badge>
                          <Badge className={getDifficultyColor(quest.difficulty)}>{quest.difficulty}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {quest.duration}
                          </div>
                        </div>

                        {/* Teacher Info (for learn quests) */}
                        {quest.teacher && (
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={quest.teacher.avatar || "/placeholder.svg"} alt={quest.teacher.name} />
                              <AvatarFallback className="text-xs">
                                {quest.teacher.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{quest.teacher.name}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs">{quest.teacher.rating}</span>
                                </div>
                                {quest.studentsEnrolled && (
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{quest.studentsEnrolled}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold text-yellow-600">+{quest.xpReward} XP</span>
                          </div>

                          <Button
                            size="sm"
                            className={cn(
                              quest.status === "in-progress"
                                ? "bg-orange-600 hover:bg-orange-700"
                                : quest.status === "completed"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : quest.type === "learn"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-purple-600 hover:bg-purple-700",
                            )}
                          >
                            {quest.status === "in-progress"
                              ? "Continue"
                              : quest.status === "completed"
                                ? "Review"
                                : quest.type === "learn"
                                  ? "Start Learning"
                                  : "Start Teaching"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
