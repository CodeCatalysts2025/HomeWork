"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import {
  PeerFeedbackForm,
  FeedbackSummary,
} from "@/components/feedback/peer-feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Star, Award } from "lucide-react";

export default function FeedbackPage() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Mock feedback data
  const mockFeedbacks = [
    {
      id: "1",
      studentName: "Emma Wilson",
      studentAvatar: "/teacher-avatar-1.png",
      rating: 5,
      helpfulness: 5,
      clarity: 4,
      comment:
        "Amazing lesson! Really helped me understand React hooks better.",
      emoji: "😍",
      date: new Date("2024-01-15"),
    },
    {
      id: "2",
      studentName: "David Park",
      studentAvatar: "/teacher-avatar-2.png",
      rating: 4,
      helpfulness: 4,
      clarity: 5,
      comment:
        "Clear explanations and good examples. Would love more practice exercises.",
      emoji: "😊",
      date: new Date("2024-01-14"),
    },
    {
      id: "3",
      studentName: "Lisa Chen",
      studentAvatar: "/teen-avatar.png",
      rating: 5,
      helpfulness: 5,
      clarity: 5,
      comment:
        "Perfect lesson! The step-by-step approach made everything easy to follow.",
      emoji: "😍",
      date: new Date("2024-01-13"),
    },
  ];

  const handleFeedbackSubmit = (feedback: any) => {
    console.log("Feedback submitted:", feedback);
    setShowFeedbackForm(false);
    // In real app, this would send to API
  };

  if (showFeedbackForm) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="lg:pl-64 pb-16 lg:pb-0">
          <div className="p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <PeerFeedbackForm
                lessonId="1"
                teacherId="teacher-1"
                teacherName="Sarah Kim"
                teacherAvatar="/teacher-avatar-1.png"
                onSubmit={handleFeedbackSubmit}
                onClose={() => setShowFeedbackForm(false)}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="lg:pl-64 pb-16 lg:pb-0">
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Peer Feedback
                </h1>
                <p className="text-muted-foreground">
                  Give and receive feedback to improve learning experiences
                </p>
              </div>

              <Button
                onClick={() => setShowFeedbackForm(true)}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Give Feedback
              </Button>
            </div>

            <Tabs defaultValue="received" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="received"
                  className="flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Feedback Received
                </TabsTrigger>
                <TabsTrigger value="given" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Feedback Given
                </TabsTrigger>
              </TabsList>

              <TabsContent value="received" className="space-y-6">
                <FeedbackSummary
                  teacherId="current-user"
                  feedbacks={mockFeedbacks}
                />
              </TabsContent>

              <TabsContent value="given" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Your Feedback History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          teacher: "Mike Chen",
                          lesson: "Advanced CSS Grid",
                          rating: 4,
                          date: "2024-01-14",
                        },
                        {
                          teacher: "Emma Wilson",
                          lesson: "JavaScript Fundamentals",
                          rating: 5,
                          date: "2024-01-12",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-sm">
                              {item.lesson}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              by {item.teacher}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= item.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
