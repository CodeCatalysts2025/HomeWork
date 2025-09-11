"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Star, Edit, Award, Brain, Palette, Settings } from "lucide-react"
import { ProfileStats } from "@/components/profile/profile-stats"
import { BadgeCollection } from "@/components/profile/badge-collection"
import { AvatarCustomizer } from "@/components/profile/avatar-customizer"
import { CareerPersonality } from "@/components/profile/career-personality"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data - in real app this would come from context/state
  const user = {
    id: "1",
    name: "Alex Chen",
    username: "@alexchen",
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    avatar: "/teen-avatar.png",
    joinedDate: "September 2024",
    lessonstaught: 23,
    lessonsLearned: 47,
    totalStudents: 156,
    averageRating: 4.8,
    personalityType: "The Innovator",
    personalityDescription: "Creative problem-solver who loves exploring new ideas and helping others learn",
    badges: [
      { id: "1", name: "First Lesson", icon: "🎯", description: "Completed your first lesson", earned: true },
      { id: "2", name: "Teacher", icon: "👨‍🏫", description: "Taught 10 lessons", earned: true },
      { id: "3", name: "Popular", icon: "⭐", description: "Received 50+ positive ratings", earned: true },
      { id: "4", name: "Streak Master", icon: "🔥", description: "7-day learning streak", earned: true },
      { id: "5", name: "Helper", icon: "🤝", description: "Helped 100+ students", earned: true },
      { id: "6", name: "Expert", icon: "🧠", description: "Master level in 3 subjects", earned: false },
    ],
  }

  const xpProgress = (user.xp / user.xpToNext) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="lg:pl-64 pb-16 lg:pb-0">
        <div className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      onClick={() => setActiveTab("avatar")}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                      <p className="text-muted-foreground">{user.username}</p>
                      <p className="text-sm text-muted-foreground">Member since {user.joinedDate}</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          Level {user.level}
                        </Badge>
                        <span className="text-sm font-medium">{user.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{user.averageRating}/5.0</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to Level {user.level + 1}</span>
                        <span>
                          {user.xp}/{user.xpToNext} XP
                        </span>
                      </div>
                      <Progress value={xpProgress} className="h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Profile Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="badges" className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span className="hidden sm:inline">Badges</span>
                </TabsTrigger>
                <TabsTrigger value="personality" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Personality</span>
                </TabsTrigger>
                <TabsTrigger value="avatar" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Avatar</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <ProfileStats user={user} />
              </TabsContent>

              <TabsContent value="badges" className="space-y-6">
                <BadgeCollection badges={user.badges} />
              </TabsContent>

              <TabsContent value="personality" className="space-y-6">
                <CareerPersonality personalityType={user.personalityType} description={user.personalityDescription} />
              </TabsContent>

              <TabsContent value="avatar" className="space-y-6">
                <AvatarCustomizer currentAvatar={user.avatar} />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Settings panel coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
