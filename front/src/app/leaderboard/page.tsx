import { Navigation } from "@/components/navigation"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="lg:pl-64 pb-16 lg:pb-0">
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <LeaderboardTabs />
          </div>
        </div>
      </main>
    </div>
  )
}
