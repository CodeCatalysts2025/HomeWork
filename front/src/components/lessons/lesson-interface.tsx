"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Star, Users, BookOpen, Play, Pause, Award } from "lucide-react"
import Link from "next/link"
import { LessonContent } from "./lesson-content"
import { LessonQuiz } from "./lesson-quiz"
import { cn } from "@/lib/utils"

interface LessonInterfaceProps {
  lessonId: string
}

interface LessonData {
  id: string
  title: string
  description: string
  subject: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  teacher: {
    name: string
    avatar: string
    rating: number
  }
  studentsEnrolled: number
  xpReward: number
  sections: {
    id: string
    title: string
    type: "content" | "quiz"
    completed: boolean
  }[]
  currentSection: number
  totalProgress: number
}

export function LessonInterface({ lessonId }: LessonInterfaceProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  // Mock lesson data - in real app this would be fetched
  const lesson: LessonData = {
    id: lessonId,
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript programming including variables, functions, and control structures",
    subject: "Programming",
    difficulty: "Beginner",
    duration: "45 min",
    teacher: {
      name: "Sarah Kim",
      avatar: null,
      rating: 4.9,
    },
    studentsEnrolled: 234,
    xpReward: 100,
    sections: [
      { id: "1", title: "Introduction to JavaScript", type: "content", completed: true },
      { id: "2", title: "Variables and Data Types", type: "content", completed: true },
      { id: "3", title: "Quiz: Variables", type: "quiz", completed: true },
      { id: "4", title: "Functions and Scope", type: "content", completed: false },
      { id: "5", title: "Control Structures", type: "content", completed: false },
      { id: "6", title: "Final Quiz", type: "quiz", completed: false },
    ],
    currentSection: 3,
    totalProgress: 50,
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeSpent((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSectionComplete = () => {
    // Mark current section as completed
    lesson.sections[currentSection].completed = true

    // Show celebration animation
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 2000)

    // Move to next section after delay
    setTimeout(() => {
      if (currentSection < lesson.sections.length - 1) {
        setCurrentSection(currentSection + 1)
      }
    }, 1500)
  }

  const currentSectionData = lesson.sections[currentSection]
  const completedSections = lesson.sections.filter((s) => s.completed).length
  const progressPercentage = (completedSections / lesson.sections.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-center space-y-4 animate-bounce">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-primary">Section Complete!</h2>
            <div className="flex items-center gap-2 justify-center">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-yellow-600">+25 XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <Link href="/lessons">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Lessons
                </Button>
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeSpent)}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Pause" : "Resume"}
                </Button>
              </div>
            </div>

            {/* Lesson Info */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{lesson.title}</h1>
                <p className="text-muted-foreground mb-4">{lesson.description}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <Badge className="bg-primary/20 text-primary">{lesson.subject}</Badge>
                  <Badge variant="outline">{lesson.difficulty}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {lesson.studentsEnrolled} students
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={lesson.teacher.avatar || "/placeholder.svg"} alt={lesson.teacher.name} />
                        <AvatarFallback>
                          {lesson.teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{lesson.teacher.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{lesson.teacher.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">XP Reward</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold text-yellow-600">+{lesson.xpReward}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Section Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lesson Sections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {lesson.sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(index)}
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-colors",
                        index === currentSection
                          ? "bg-primary text-primary-foreground"
                          : section.completed
                            ? "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300"
                            : "bg-muted/50 hover:bg-muted",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {section.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : section.type === "quiz" ? (
                            <Award className="w-5 h-5" />
                          ) : (
                            <BookOpen className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{section.title}</p>
                          <p className="text-xs opacity-75 capitalize">{section.type}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <Card className="min-h-[600px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {currentSectionData.type === "quiz" ? (
                        <Award className="w-5 h-5 text-purple-600" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      )}
                      {currentSectionData.title}
                    </CardTitle>

                    <Badge variant={currentSectionData.type === "quiz" ? "default" : "secondary"}>
                      {currentSectionData.type === "quiz" ? "Quiz" : "Content"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  {currentSectionData.type === "quiz" ? (
                    <LessonQuiz
                      sectionId={currentSectionData.id}
                      onComplete={handleSectionComplete}
                      isCompleted={currentSectionData.completed}
                    />
                  ) : (
                    <LessonContent
                      sectionId={currentSectionData.id}
                      onComplete={handleSectionComplete}
                      isCompleted={currentSectionData.completed}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    {currentSection + 1} of {lesson.sections.length}
                  </span>
                </div>

                <Button
                  onClick={() => setCurrentSection(Math.min(lesson.sections.length - 1, currentSection + 1))}
                  disabled={currentSection === lesson.sections.length - 1}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
