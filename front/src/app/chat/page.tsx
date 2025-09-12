"use client"

import { ChatInterface } from '@/components/chat/chat-interface'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, Users, Zap } from 'lucide-react'

export default function ChatPage() {
  // In real app, get from authentication context
  const currentUserId = "current-user-id"

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Peer Chat</h1>
          <p className="text-muted-foreground">Connect and learn with your peers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Messages
              </CardTitle>
              <CardDescription>
                Chat with other students, ask questions, and share knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChatInterface currentUserId={currentUserId} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Online Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Sarah Johnson", level: 15, status: "online" },
                  { name: "Mike Chen", level: 8, status: "online" },
                  { name: "Emma Wilson", level: 22, status: "away" },
                  { name: "Alex Kim", level: 12, status: "online" },
                  { name: "Lisa Park", level: 18, status: "online" }
                ].map((student, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {student.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">Level {student.level}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      student.status === 'online' ? 'bg-green-500' : 
                      student.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <p className="font-medium text-sm">Start Study Group</p>
                  <p className="text-xs text-muted-foreground">Create a group chat for studying</p>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <p className="font-medium text-sm">Ask Question</p>
                  <p className="text-xs text-muted-foreground">Post a question to the community</p>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <p className="font-medium text-sm">Find Study Partner</p>
                  <p className="text-xs text-muted-foreground">Match with similar interests</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}