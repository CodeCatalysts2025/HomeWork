"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, X, Award, RotateCcw, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface LessonQuizProps {
  sectionId: string
  onComplete: () => void
  isCompleted: boolean
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export function LessonQuiz({ sectionId, onComplete, isCompleted }: LessonQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(isCompleted)

  // Mock quiz data - in real app this would be fetched based on sectionId
  const questions: Question[] = [
    {
      id: "1",
      question: "Which keyword is recommended for declaring variables in modern JavaScript?",
      options: ["var", "let", "const", "Both let and const"],
      correctAnswer: 3,
      explanation:
        "Both 'let' and 'const' are recommended. Use 'const' for values that won't change, and 'let' for values that will change.",
    },
    {
      id: "2",
      question: "What data type is the value 'Hello World'?",
      options: ["Number", "String", "Boolean", "Object"],
      correctAnswer: 1,
      explanation: "Text values enclosed in quotes are strings in JavaScript.",
    },
    {
      id: "3",
      question: "Which of these is a valid way to create an array in JavaScript?",
      options: ["let arr = [1, 2, 3]", "let arr = (1, 2, 3)", "let arr = {1, 2, 3}", "let arr = <1, 2, 3>"],
      correctAnswer: 0,
      explanation: "Arrays in JavaScript are created using square brackets [] with comma-separated values.",
    },
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setQuizCompleted(true)
    onComplete()
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setQuizCompleted(false)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) }
  }

  const score = calculateScore()
  const currentQuestionData = questions[currentQuestion]

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <Award className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Quiz Complete!</h2>
          <p className="text-muted-foreground">Here's how you did:</p>
        </div>

        {/* Score Summary */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{score.percentage}%</div>
            <p className="text-muted-foreground">
              {score.correct} out of {score.total} questions correct
            </p>
            <Badge
              className={cn(
                "mt-3",
                score.percentage >= 80
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : score.percentage >= 60
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
              )}
            >
              {score.percentage >= 80 ? "Excellent!" : score.percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
            </Badge>
          </CardContent>
        </Card>

        {/* Question Review */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Review Your Answers</h3>
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index]
            const isCorrect = userAnswer === question.correctAnswer

            return (
              <Card
                key={question.id}
                className={cn("border-l-4", isCorrect ? "border-l-green-500" : "border-l-red-500")}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Your answer:</span>{" "}
                          <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                            {question.options[userAnswer]}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p>
                            <span className="text-muted-foreground">Correct answer:</span>{" "}
                            <span className="text-green-600">{question.options[question.correctAnswer]}</span>
                          </p>
                        )}
                        <div className="flex items-start gap-2 mt-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-blue-800 dark:text-blue-200 text-xs">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={handleRetakeQuiz} className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </Button>
          <Button onClick={handleSubmitQuiz} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Complete Section
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {questions.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              index <= currentQuestion ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>

      {/* Question */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">Quiz</Badge>
        </div>

        <h2 className="text-xl font-semibold leading-relaxed">{currentQuestionData.question}</h2>

        {/* Answer Options */}
        <RadioGroup
          value={selectedAnswers[currentQuestion]?.toString()}
          onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
          className="space-y-3"
        >
          {currentQuestionData.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="flex items-center gap-2"
        >
          {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
        </Button>
      </div>

      {/* Completion Status */}
      {quizCompleted && (
        <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Quiz Completed!</span>
          </div>
        </div>
      )}
    </div>
  )
}
