import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CareerQuizPrompt() {
  // Mock quiz progress - in real app this would come from user state
  const quizProgress = {
    completed: false,
    questionsAnswered: 0,
    totalQuestions: 15,
    lastPersonalityType: "The Innovator",
  }

  const progressPercentage = (quizProgress.questionsAnswered / quizProgress.totalQuestions) * 100

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-green-500/10 p-1">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="w-5 h-5 text-purple-600" />
              Career Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!quizProgress.completed ? (
              <>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Discover your learning style and get personalized career recommendations!
                  </p>

                  {quizProgress.questionsAnswered > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>
                          {quizProgress.questionsAnswered}/{quizProgress.totalQuestions}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  )}
                </div>

                <Link href="/quiz" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    {quizProgress.questionsAnswered > 0 ? "Continue Quiz" : "Start Quiz"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-center space-y-2">
                  <div className="text-2xl">🎯</div>
                  <p className="text-sm font-medium">You're {quizProgress.lastPersonalityType}!</p>
                  <p className="text-xs text-muted-foreground">
                    Check your profile for detailed insights and recommendations
                  </p>
                </div>

                <div className="space-y-2">
                  <Link href="/profile?tab=personality" className="block">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Results
                    </Button>
                  </Link>
                  <Link href="/quiz" className="block">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      Retake Quiz
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}
