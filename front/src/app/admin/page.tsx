"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Users,
  BookOpen,
  Flag,
  TrendingUp,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  Download,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  joinDate: Date;
  status: "active" | "suspended" | "pending";
  lessonsCompleted: number;
  lessonsTaught: number;
}

interface FlaggedLesson {
  id: string;
  title: string;
  teacher: string;
  reportedBy: string;
  reason: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
  reportDate: Date;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Emma Chen",
    email: "emma.chen@email.com",
    level: 15,
    xp: 8750,
    joinDate: new Date("2024-01-15"),
    status: "active",
    lessonsCompleted: 45,
    lessonsTaught: 32,
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    level: 14,
    xp: 8200,
    joinDate: new Date("2024-01-20"),
    status: "active",
    lessonsCompleted: 38,
    lessonsTaught: 29,
  },
  {
    id: "3",
    name: "Suspicious User",
    email: "suspicious@email.com",
    level: 2,
    xp: 150,
    joinDate: new Date("2024-02-28"),
    status: "suspended",
    lessonsCompleted: 1,
    lessonsTaught: 0,
  },
];

const mockFlaggedLessons: FlaggedLesson[] = [
  {
    id: "1",
    title: "Advanced Calculus Concepts",
    teacher: "Dr. Smith",
    reportedBy: "Student123",
    reason: "Inappropriate content in lesson materials",
    status: "pending",
    reportDate: new Date("2024-02-15"),
  },
  {
    id: "2",
    title: "Spanish Grammar Basics",
    teacher: "Maria Garcia",
    reportedBy: "LearnerABC",
    reason: "Inaccurate information provided",
    status: "reviewed",
    reportDate: new Date("2024-02-10"),
  },
];

export default function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [xpAdjustment, setXpAdjustment] = useState({
    userId: "",
    amount: "",
    reason: "",
  });
  const [showXpModal, setShowXpModal] = useState(false);

  const handleXpAdjustment = () => {
    // Simulate XP adjustment
    console.log("XP Adjustment:", xpAdjustment);
    setShowXpModal(false);
    setXpAdjustment({ userId: "", amount: "", reason: "" });
  };

  const handleLessonAction = (
    lessonId: string,
    action: "approve" | "reject"
  ) => {
    // Simulate lesson moderation action
    console.log(`Lesson ${lessonId} ${action}ed`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-chart-3 text-white">Active</Badge>;
      case "suspended":
        return <Badge className="bg-destructive text-white">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-secondary text-white">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* XP Adjustment Modal */}
      {showXpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Adjust User XP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>User</Label>
                <Select
                  value={xpAdjustment.userId}
                  onValueChange={(value) =>
                    setXpAdjustment((prev) => ({ ...prev, userId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>XP Amount (use negative for deduction)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 100 or -50"
                  value={xpAdjustment.amount}
                  onChange={(e) =>
                    setXpAdjustment((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Reason</Label>
                <Textarea
                  placeholder="Explain the reason for this adjustment..."
                  value={xpAdjustment.reason}
                  onChange={(e) =>
                    setXpAdjustment((prev) => ({
                      ...prev,
                      reason: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowXpModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleXpAdjustment}
                  disabled={
                    !xpAdjustment.userId ||
                    !xpAdjustment.amount ||
                    !xpAdjustment.reason
                  }
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  Apply Adjustment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage users, moderate content, and oversee platform operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/80">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-xs text-chart-3 mt-2">
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-secondary">3,456</div>
                <div className="text-sm text-muted-foreground">
                  Active Lessons
                </div>
              </div>
              <BookOpen className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-xs text-chart-3 mt-2">+8% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-chart-1">23</div>
                <div className="text-sm text-muted-foreground">
                  Flagged Content
                </div>
              </div>
              <Flag className="w-8 h-8 text-chart-1" />
            </div>
            <div className="text-xs text-destructive mt-2">Needs attention</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-chart-3">94.2%</div>
                <div className="text-sm text-muted-foreground">
                  Platform Health
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-chart-3" />
            </div>
            <div className="text-xs text-chart-3 mt-2">Excellent</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Admin Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="xp">XP Management</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Search users..." className="flex-1" />
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {mockUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold">
                            Level {user.level}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.xp.toLocaleString()} XP
                          </div>
                        </div>
                        {getStatusBadge(user.status)}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          {user.status === "active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive bg-transparent"
                            >
                              <Shield className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* XP Management */}
        <TabsContent value="xp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                XP Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Manual XP Adjustments</h3>
                  <p className="text-sm text-muted-foreground">
                    Adjust user XP for special circumstances or corrections
                  </p>
                </div>
                <Button
                  onClick={() => setShowXpModal(true)}
                  className="bg-gradient-to-r from-secondary to-secondary/80"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Adjustment
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Recent XP Adjustments</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <div>
                      <div className="font-medium">Emma Chen</div>
                      <div className="text-sm text-muted-foreground">
                        Bonus for exceptional teaching
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-chart-3">+500 XP</div>
                      <div className="text-xs text-muted-foreground">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <div>
                      <div className="font-medium">Alex Rodriguez</div>
                      <div className="text-sm text-muted-foreground">
                        Correction for duplicate completion
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-destructive">
                        -150 XP
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1 day ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">2.4M</div>
                  <div className="text-sm text-muted-foreground">
                    Total XP Awarded
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">156</div>
                  <div className="text-sm text-muted-foreground">
                    Manual Adjustments
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-chart-1">1,947</div>
                  <div className="text-sm text-muted-foreground">
                    Average XP/User
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Moderation */}
        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="w-5 h-5" />
                Content Moderation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {mockFlaggedLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{lesson.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Teacher: {lesson.teacher}
                        </p>
                      </div>
                      <Badge
                        variant={
                          lesson.status === "pending"
                            ? "destructive"
                            : "outline"
                        }
                        className={
                          lesson.status === "pending"
                            ? "bg-chart-1 text-white"
                            : ""
                        }
                      >
                        {lesson.status}
                      </Badge>
                    </div>

                    <div className="bg-muted/50 p-3 rounded">
                      <div className="text-sm">
                        <strong>Reported by:</strong> {lesson.reportedBy}
                      </div>
                      <div className="text-sm">
                        <strong>Reason:</strong> {lesson.reason}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Reported on {lesson.reportDate.toLocaleDateString()}
                      </div>
                    </div>

                    {lesson.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleLessonAction(lesson.id, "approve")
                          }
                          className="bg-chart-3 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleLessonAction(lesson.id, "reject")
                          }
                          className="text-destructive border-destructive"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Review Content
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Daily Active Users</span>
                    <span className="font-semibold">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekly Active Users</span>
                    <span className="font-semibold">1,156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Session Time</span>
                    <span className="font-semibold">24 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completion Rate</span>
                    <span className="font-semibold">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Lessons</span>
                    <span className="font-semibold">3,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lessons This Week</span>
                    <span className="font-semibold">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Rating</span>
                    <span className="font-semibold">4.6/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flagged Content</span>
                    <span className="font-semibold text-chart-1">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <Users className="w-6 h-6" />
                  <span>User Activity Report</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <BookOpen className="w-6 h-6" />
                  <span>Content Performance</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <TrendingUp className="w-6 h-6" />
                  <span>Engagement Analytics</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <Zap className="w-6 h-6" />
                  <span>XP Distribution</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <Flag className="w-6 h-6" />
                  <span>Moderation Summary</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <AlertTriangle className="w-6 h-6" />
                  <span>Security Alerts</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
