"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageCircle, Send, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedbackFormProps {
  lessonId: string
  teacherId: string
  teacherName: string
  teacherAvatar: string
  onSubmit: (feedback: FeedbackData) => void
  onClose: () => void
}

interface FeedbackData {
  rating: number
  helpfulness: number
  clarity: number
  comment: string
  emoji: string
}

export function PeerFeedbackForm({
  lessonId,
  teacherId,
  teacherName,
  teacherAvatar,
  onSubmit,
  onClose,
}: FeedbackFormProps) {
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: 0,
    helpfulness: 0,
    clarity: 0,
    comment: "",
    emoji: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const emojiOptions = [
    { emoji: "😍", label: "Amazing!" },
    { emoji: "😊", label: "Great!" },
    { emoji: "👍", label: "Good" },
    { emoji: "😐", label: "Okay" },
    { emoji: "😕", label: "Needs work" },
  ]

  const handleStarRating = (category: keyof FeedbackData, rating: number) => {
    setFeedback((prev) => ({ ...prev, [category]: rating }))
  }

  const handleSubmit = async () => {
    if (feedback.rating === 0) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubmit(feedback)
    setIsSubmitting(false)
  }

  const renderStarRating = (category: keyof FeedbackData, label: string) => {
    const value = feedback[category] as number
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarRating(category, star)}
              className="transition-colors hover:scale-110"
            >
              <Star
                className={cn(
                  "w-6 h-6",
                  star <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-400",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-primary" />
          Rate Your Learning Experience
        </CardTitle>

        {/* Teacher Info */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <Avatar className="w-10 h-10">
            <AvatarImage src={teacherAvatar || "/placeholder.svg"} alt={teacherName} />
            <AvatarFallback>
              {teacherName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{teacherName}</p>
            <p className="text-xs text-muted-foreground">Your teacher for this lesson</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Emoji Feedback */}
        <div className="space-y-3">
          <label className="text-sm font-medium">How was this lesson?</label>
          <div className="flex items-center gap-2">
            {emojiOptions.map((option) => (
              <button
                key={option.emoji}
                onClick={() => setFeedback((prev) => ({ ...prev, emoji: option.emoji }))}
                className={cn(
                  "p-3 rounded-lg border-2 transition-all hover:scale-105",
                  feedback.emoji === option.emoji
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50",
                )}
              >
                <div className="text-2xl">{option.emoji}</div>
                <div className="text-xs text-muted-foreground mt-1">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Star Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderStarRating("rating", "Overall Rating")}
          {renderStarRating("helpfulness", "Helpfulness")}
          {renderStarRating("clarity", "Clarity")}
        </div>

        {/* Written Feedback */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Additional Comments (Optional)</label>
          <Textarea
            placeholder="Share what you liked or how the lesson could be improved..."
            value={feedback.comment}
            onChange={(e) => setFeedback((prev) => ({ ...prev, comment: e.target.value }))}
            className="min-h-[100px]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} className="bg-transparent">
            Skip for Now
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={feedback.rating === 0 || isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface FeedbackSummaryProps {
  teacherId: string
  feedbacks: Array<{
    id: string
    studentName: string
    studentAvatar: string
    rating: number
    helpfulness: number
    clarity: number
    comment: string
    emoji: string
    date: Date
  }>
}

export function FeedbackSummary({ teacherId, feedbacks }: FeedbackSummaryProps) {
  const averageRating = feedbacks.length > 0 ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length : 0

  const averageHelpfulness =
    feedbacks.length > 0 ? feedbacks.reduce((sum, f) => sum + f.helpfulness, 0) / feedbacks.length : 0

  const averageClarity = feedbacks.length > 0 ? feedbacks.reduce((sum, f) => sum + f.clarity, 0) / feedbacks.length : 0

  const emojiCounts = feedbacks.reduce(
    (acc, feedback) => {
      acc[feedback.emoji] = (acc[feedback.emoji] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Overall Rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <ThumbsUp className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold">{averageHelpfulness.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Helpfulness</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Award className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold">{averageClarity.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Clarity</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <MessageCircle className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{feedbacks.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Emoji Summary */}
      {Object.keys(emojiCounts).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Reactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {Object.entries(emojiCounts).map(([emoji, count]) => (
                <div key={emoji} className="text-center">
                  <div className="text-2xl mb-1">{emoji}</div>
                  <Badge variant="secondary" className="text-xs">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbacks.slice(0, 5).map((feedback) => (
            <div key={feedback.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={feedback.studentAvatar || "/placeholder.svg"} alt={feedback.studentName} />
                  <AvatarFallback className="text-xs">
                    {feedback.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-sm">{feedback.studentName}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-3 h-3",
                            star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xl">{feedback.emoji}</span>
                  </div>

                  {feedback.comment && <p className="text-sm text-muted-foreground mb-2">{feedback.comment}</p>}

                  <p className="text-xs text-muted-foreground">{feedback.date.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
