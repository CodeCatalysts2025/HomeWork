import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, Target, Users, Lightbulb } from "lucide-react"

interface CareerPersonalityProps {
  personalityType: string
  description: string
}

export function CareerPersonality({ personalityType, description }: CareerPersonalityProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Career Personality</h2>
        <Badge variant="secondary" className="bg-primary/20 text-primary">
          <Brain className="w-4 h-4 mr-1" />
          {personalityType}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Your Learning Style
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-lg mb-2 text-purple-900 dark:text-purple-100">
              {personalityType}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-sm">Learning Focus</p>
                <p className="text-xs text-muted-foreground">Creative problem-solving</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Users className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-sm">Teaching Style</p>
                <p className="text-xs text-muted-foreground">Collaborative & supportive</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium text-sm">Innovation</p>
                <p className="text-xs text-muted-foreground">Explores new ideas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
