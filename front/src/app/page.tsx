import { Navigation } from "@/components/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { QuestBoard } from "@/components/dashboard/quest-board"
import { NotificationPanel } from "@/components/dashboard/notification-panel"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { CareerQuizPrompt } from "@/components/dashboard/career-quiz-prompt"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="lg:pl-64 pb-16 lg:pb-0">
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <DashboardHeader />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Quest Board */}
              <div className="lg:col-span-3 space-y-6">
                <QuestBoard />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <QuickStats />
                <NotificationPanel />
                <CareerQuizPrompt />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
