"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Star, Brain, Lightbulb, Users, Target, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const quizQuestions = [
  {
    id: 1,
    question: "When working on a group project, you prefer to:",
    options: [
      { id: "a", text: "Take charge and organize everyone's tasks", type: "leader" },
      { id: "b", text: "Focus on the creative and innovative aspects", type: "creator" },
      { id: "c", text: "Analyze data and find logical solutions", type: "analyst" },
      { id: "d", text: "Support teammates and ensure everyone feels included", type: "helper" },
    ],
  },
  {
    id: 2,
    question: "Your ideal learning environment is:",
    options: [
      { id: "a", text: "Hands-on workshops with real-world applications", type: "leader" },
      { id: "b", text: "Open-ended projects where you can explore ideas", type: "creator" },
      { id: "c", text: "Structured lessons with clear objectives", type: "analyst" },
      { id: "d", text: "Collaborative spaces where you can help others", type: "helper" },
    ],
  },
  {
    id: 3,
    question: "When facing a difficult problem, you:",
    options: [
      { id: "a", text: "Break it down into actionable steps", type: "leader" },
      { id: "b", text: "Think outside the box for creative solutions", type: "creator" },
      { id: "c", text: "Research and gather all available information", type: "analyst" },
      { id: "d", text: "Ask others for their perspectives and input", type: "helper" },
    ],
  },
  {
    id: 4,
    question: "Your favorite subjects tend to be:",
    options: [
      { id: "a", text: "Business, Economics, or Leadership courses", type: "leader" },
      { id: "b", text: "Art, Design, or Creative Writing", type: "creator" },
      { id: "c", text: "Math, Science, or Computer Programming", type: "analyst" },
      { id: "d", text: "Psychology, Social Studies, or Health Sciences", type: "helper" },
    ],
  },
  {
    id: 5,
    question: "In your free time, you enjoy:",
    options: [
      { id: "a", text: "Planning events or leading community activities", type: "leader" },
      { id: "b", text: "Creating art, music, or writing stories", type: "creator" },
      { id: "c", text: "Solving puzzles or learning new technologies", type: "analyst" },
      { id: "d", text: "Volunteering or helping friends with their problems", type: "helper" },
    ],
  },
  {
    id: 6,
    question: "Your dream job would involve:",
    options: [
      { id: "a", text: "Managing teams and making strategic decisions", type: "leader" },
      { id: "b", text: "Designing innovative products or experiences", type: "creator" },
      { id: "c", text: "Researching and analyzing complex data", type: "analyst" },
      { id: "d", text: "Supporting and empowering others to succeed", type: "helper" },
    ],
  },
]

const personalityTypes = {
  leader: {
    title: "The Innovator",
    description:
      "You're a natural leader who thrives on organizing, planning, and inspiring others to achieve great things.",
    icon: Target,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    careers: ["Entrepreneur", "Project Manager", "CEO", "Team Lead", "Consultant"],
    subjects: ["Business", "Economics", "Leadership", "Marketing", "Management"],
    traits: ["Strategic thinking", "Decision making", "Team building", "Goal-oriented", "Confident"],
  },
  creator: {
    title: "The Visionary",
    description:
      "You're driven by creativity and innovation, always looking for new ways to express ideas and solve problems.",
    icon: Lightbulb,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    careers: ["Designer", "Artist", "Writer", "Architect", "Creative Director"],
    subjects: ["Art", "Design", "Creative Writing", "Media Studies", "Innovation"],
    traits: ["Creative thinking", "Artistic vision", "Innovation", "Imagination", "Originality"],
  },
  analyst: {
    title: "The Problem Solver",
    description:
      "You excel at logical thinking, data analysis, and finding systematic solutions to complex challenges.",
    icon: Brain,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    careers: ["Data Scientist", "Engineer", "Researcher", "Analyst", "Developer"],
    subjects: ["Mathematics", "Science", "Computer Science", "Statistics", "Research"],
    traits: ["Analytical thinking", "Problem solving", "Attention to detail", "Logical reasoning", "Research skills"],
  },
  helper: {
    title: "The Supporter",
    description: "You're motivated by helping others succeed and creating positive impacts in your community.",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    careers: ["Teacher", "Counselor", "Social Worker", "Healthcare Worker", "Coach"],
    subjects: ["Psychology", "Education", "Social Studies", "Health Sciences", "Communication"],
    traits: ["Empathy", "Communication", "Collaboration", "Supportive", "Patient"],
  },
}

export default function CareerQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      calculateResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculateResults = () => {
    const typeScores = { leader: 0, creator: 0, analyst: 0, helper: 0 }

    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = quizQuestions.find((q) => q.id === Number.parseInt(questionId))
      const option = question?.options.find((o) => o.id === optionId)
      if (option) {
        typeScores[option.type as keyof typeof typeScores]++
      }
    })

    const dominantType = Object.entries(typeScores).reduce((a, b) =>
      typeScores[a[0] as keyof typeof typeScores] > typeScores[b[0] as keyof typeof typeScores] ? a : b,
    )[0] as keyof typeof personalityTypes

    setShowResults(true)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setQuizStarted(false)
  }

  const getDominantType = () => {
    const typeScores = { leader: 0, creator: 0, analyst: 0, helper: 0 }

    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = quizQuestions.find((q) => q.id === Number.parseInt(questionId))
      const option = question?.options.find((o) => o.id === optionId)
      if (option) {
        typeScores[option.type as keyof typeof typeScores]++
      }
    })

    return Object.entries(typeScores).reduce((a, b) =>
      typeScores[a[0] as keyof typeof typeScores] > typeScores[b[0] as keyof typeof typeScores] ? a : b,
    )[0] as keyof typeof personalityTypes
  }

  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl mb-2">Career Personality Quiz</CardTitle>
              <p className="text-muted-foreground text-lg">
                Discover your learning style and explore career paths that match your personality!
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="font-semibold mb-1">6 Questions</div>
                  <div className="text-muted-foreground">Quick and fun</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="font-semibold mb-1">Personalized Results</div>
                  <div className="text-muted-foreground">Career recommendations</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">You'll discover:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Your personality type
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Matching career paths
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    Learning preferences
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Recommended subjects
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={() => setQuizStarted(true)}>
                Start Quiz
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showResults) {
    const dominantType = getDominantType()
    const result = personalityTypes[dominantType]
    const IconComponent = result.icon

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center mb-6">
            <CardHeader>
              <div
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                  result.bgColor,
                  result.borderColor,
                  "border-2",
                )}
              >
                <IconComponent className={cn("w-10 h-10", result.color)} />
              </div>
              <CardTitle className="text-3xl mb-2">You're {result.title}!</CardTitle>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{result.description}</p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Career Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {result.careers.map((career, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg text-center font-medium">
                      {career}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Recommended Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {result.subjects.map((subject, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg text-center font-medium">
                      {subject}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Your Key Traits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((trait, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={restartQuiz} variant="outline">
              Retake Quiz
            </Button>
            <Button asChild>
              <a href="/lessons">Explore Lessons</a>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]
  const currentAnswer = answers[question.id]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={currentAnswer || ""} onValueChange={(value) => handleAnswer(question.id, value)}>
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer leading-relaxed">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button onClick={nextQuestion} disabled={!currentAnswer}>
                {currentQuestion === quizQuestions.length - 1 ? "Get Results" : "Next"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
