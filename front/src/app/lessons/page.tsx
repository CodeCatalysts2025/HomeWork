import { Navigation } from "@/components/navigation"
import { LessonInterface } from "@/components/lessons/lesson-interface"

interface LessonPageProps {
  params: {
    id: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="lg:pl-64 pb-16 lg:pb-0">
        <LessonInterface lessonId={params.id} />
      </main>
    </div>
  )
}
