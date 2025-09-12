"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Send, Users, MessageCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  _id: string
  sender: {
    _id: string
    username: string
    avatar?: string
    level: number
  }
  receiver: {
    _id: string
    username: string
    avatar?: string
    level: number
  }
  content: string
  createdAt: string
  match?: string
}

interface Conversation {
  userId: string
  username: string
  avatar?: string
  level: number
  lastMessage: {
    id: string
    content: string
    createdAt: string
  }
}

interface ChatInterfaceProps {
  currentUserId: string
}

export function ChatInterface({ currentUserId }: ChatInterfaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

    // Mock data for demonstration
    useEffect(() => {
      // In real app, fetch from API
      const mockConversations: Conversation[] = [
        {
          userId: '1',
          username: 'Sarah Johnson',
          level: 15,
          lastMessage: {
            id: '1',
            content: 'Hey! How did you solve that math problem?',
            createdAt: new Date().toISOString()
          }
        },
        {
          userId: '2',
          username: 'Mike Chen',
          level: 8,
          lastMessage: {
            id: '2',
            content: 'Thanks for the help with the project!',
            createdAt: new Date(Date.now() - 3600000).toISOString()
          }
        },
        {
          userId: '3',
          username: 'Emma Wilson',
          level: 22,
          lastMessage: {
            id: '3',
            content: 'Can you review my code?',
            createdAt: new Date(Date.now() - 7200000).toISOString()
          }
        }
      ]
      setConversations(mockConversations)
    }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    const messageData = {
      sender: currentUserId,
      receiver: selectedConversation,
      content: newMessage.trim()
    }

    setLoading(true)
    try {
      // In real app, send to API
      const response = await fetch('/api/message/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(messageData)
      })

      if (response.ok) {
        const newMsg: Message = {
          _id: Date.now().toString(),
          sender: {
            _id: currentUserId,
            username: 'You',
            level: 12
          },
          receiver: {
            _id: selectedConversation,
            username: conversations.find(c => c.userId === selectedConversation)?.username || 'Unknown',
            level: 8
          },
          content: newMessage.trim(),
          createdAt: new Date().toISOString()
        }
        setMessages(prev => [...prev, newMsg])
        setNewMessage('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const selectedUser = conversations.find(c => c.userId === selectedConversation)

  return (
    <div className="flex h-[600px] bg-background border border-border rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-border bg-muted/20">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Messages
          </h2>
        </div>
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.userId}
              onClick={() => setSelectedConversation(conversation.userId)}
              className={cn(
                "p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors",
                selectedConversation === conversation.userId && "bg-muted"
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>{conversation.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{conversation.username}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(conversation.lastMessage.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Level {conversation.level}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={selectedUser?.avatar} />
                  <AvatarFallback>{selectedUser?.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedUser?.username}</h3>
                  <p className="text-sm text-muted-foreground">
                    Level {selectedUser?.level} • Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation with {selectedUser?.username}</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message._id}
                    className={cn(
                      "flex gap-3",
                      message.sender._id === currentUserId ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender._id !== currentUserId && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback>{message.sender.username[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg px-3 py-2",
                        message.sender._id === currentUserId
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs opacity-70">
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                    {message.sender._id === currentUserId && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback>{message.sender.username[0]}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  disabled={loading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || loading}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p>Choose a user to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}