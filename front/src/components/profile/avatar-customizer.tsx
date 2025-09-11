"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Shirt, Eye, Smile, Lock, Save } from "lucide-react"
import { cn } from "@/lib/utils"

interface AvatarCustomizerProps {
  currentAvatar: string
}

export function AvatarCustomizer({ currentAvatar }: AvatarCustomizerProps) {
  const [selectedOptions, setSelectedOptions] = useState({
    hair: "style1",
    eyes: "brown",
    skin: "light",
    clothes: "casual",
    accessories: "none",
  })

  const customizationOptions = {
    hair: [
      { id: "style1", name: "Short & Neat", unlocked: true, level: 1 },
      { id: "style2", name: "Curly", unlocked: true, level: 1 },
      { id: "style3", name: "Long & Wavy", unlocked: false, level: 5 },
      { id: "style4", name: "Punk Rock", unlocked: false, level: 10 },
    ],
    eyes: [
      { id: "brown", name: "Brown", unlocked: true, level: 1 },
      { id: "blue", name: "Blue", unlocked: true, level: 1 },
      { id: "green", name: "Green", unlocked: false, level: 3 },
      { id: "hazel", name: "Hazel", unlocked: false, level: 7 },
    ],
    skin: [
      { id: "light", name: "Light", unlocked: true, level: 1 },
      { id: "medium", name: "Medium", unlocked: true, level: 1 },
      { id: "dark", name: "Dark", unlocked: true, level: 1 },
    ],
    clothes: [
      { id: "casual", name: "Casual Tee", unlocked: true, level: 1 },
      { id: "hoodie", name: "Cool Hoodie", unlocked: true, level: 2 },
      { id: "formal", name: "Smart Shirt", unlocked: false, level: 8 },
      { id: "superhero", name: "Hero Cape", unlocked: false, level: 15 },
    ],
    accessories: [
      { id: "none", name: "None", unlocked: true, level: 1 },
      { id: "glasses", name: "Cool Glasses", unlocked: true, level: 4 },
      { id: "hat", name: "Trendy Hat", unlocked: false, level: 6 },
      { id: "headphones", name: "Gaming Headset", unlocked: false, level: 12 },
    ],
  }

  const handleOptionSelect = (category: string, optionId: string) => {
    const option = customizationOptions[category as keyof typeof customizationOptions].find(
      (opt) => opt.id === optionId,
    )

    if (option?.unlocked) {
      setSelectedOptions((prev) => ({
        ...prev,
        [category]: optionId,
      }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Avatar Customization</h2>
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Preview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage src={currentAvatar || "/placeholder.svg"} alt="Avatar Preview" />
                <AvatarFallback className="bg-primary/10 text-primary text-4xl font-bold">AC</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                12
              </div>
            </div>
            <div className="text-center">
              <p className="font-semibold">Alex Chen</p>
              <p className="text-sm text-muted-foreground">Level 12 Innovator</p>
            </div>
          </CardContent>
        </Card>

        {/* Customization Options */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Customize Your Look</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hair" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="hair" className="flex items-center gap-1">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Hair</span>
                </TabsTrigger>
                <TabsTrigger value="eyes" className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Eyes</span>
                </TabsTrigger>
                <TabsTrigger value="skin" className="flex items-center gap-1">
                  <Smile className="w-4 h-4" />
                  <span className="hidden sm:inline">Skin</span>
                </TabsTrigger>
                <TabsTrigger value="clothes" className="flex items-center gap-1">
                  <Shirt className="w-4 h-4" />
                  <span className="hidden sm:inline">Clothes</span>
                </TabsTrigger>
                <TabsTrigger value="accessories" className="flex items-center gap-1">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Extras</span>
                </TabsTrigger>
              </TabsList>

              {Object.entries(customizationOptions).map(([category, options]) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {options.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "relative p-4 border rounded-lg cursor-pointer transition-all",
                          selectedOptions[category as keyof typeof selectedOptions] === option.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50",
                          !option.unlocked && "opacity-50 cursor-not-allowed",
                        )}
                        onClick={() => handleOptionSelect(category, option.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{option.name}</span>
                          {!option.unlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant={option.unlocked ? "secondary" : "outline"} className="text-xs">
                            Level {option.level}
                          </Badge>
                          {selectedOptions[category as keyof typeof selectedOptions] === option.id && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>

                        {!option.unlocked && (
                          <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                              <p className="text-xs text-muted-foreground">Level {option.level}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Unlock Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Unlock Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Next unlock at Level 15</span>
              <span>3 levels to go!</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl mb-1">🦸</div>
                <p className="text-xs font-medium">Hero Cape</p>
                <p className="text-xs text-muted-foreground">Level 15</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl mb-1">🎧</div>
                <p className="text-xs font-medium">Gaming Headset</p>
                <p className="text-xs text-muted-foreground">Level 12</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl mb-1">🎩</div>
                <p className="text-xs font-medium">Trendy Hat</p>
                <p className="text-xs text-muted-foreground">Level 6</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl mb-1">👔</div>
                <p className="text-xs font-medium">Smart Shirt</p>
                <p className="text-xs text-muted-foreground">Level 8</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
