"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Lock,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  teacher: {
    name: string;
    avatar: string;
    rating: number;
  };
  studentsEnrolled: number;
  progress?: number;
  status: "not-started" | "in-progress" | "completed" | "locked";
  xpReward: number;
  prerequisites?: string[];
}

export function LessonBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const lessons: Lesson[] = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description:
        "Learn the basics of JavaScript programming including variables, functions, and control structures",
      subject: "Programming",
      difficulty: "Beginner",
      duration: "45 min",
      teacher: {
        name: "Sarah Kim",
        avatar: "/teacher-avatar-1.png",
        rating: 4.9,
      },
      studentsEnrolled: 234,
      progress: 75,
      status: "in-progress",
      xpReward: 100,
    },
    {
      id: "2",
      title: "React Hooks Deep Dive",
      description:
        "Master useState, useEffect, useContext and custom hooks with practical examples",
      subject: "Programming",
      difficulty: "Intermediate",
      duration: "60 min",
      teacher: {
        name: "Mike Chen",
        avatar: "/teacher-avatar-2.png",
        rating: 4.8,
      },
      studentsEnrolled: 156,
      status: "not-started",
      xpReward: 150,
    },
    {
      id: "3",
      title: "Advanced CSS Grid",
      description:
        "Create complex layouts with CSS Grid and learn advanced positioning techniques",
      subject: "Design",
      difficulty: "Advanced",
      duration: "50 min",
      teacher: {
        name: "Emma Wilson",
        avatar: "/teacher-avatar-1.png",
        rating: 4.7,
      },
      studentsEnrolled: 89,
      status: "completed",
      xpReward: 180,
    },
    {
      id: "4",
      title: "Node.js Backend Development",
      description:
        "Build scalable backend applications with Node.js, Express, and databases",
      subject: "Programming",
      difficulty: "Advanced",
      duration: "90 min",
      teacher: {
        name: "Alex Rodriguez",
        avatar: "/teacher-avatar-2.png",
        rating: 4.9,
      },
      studentsEnrolled: 67,
      status: "locked",
      xpReward: 200,
      prerequisites: ["JavaScript Fundamentals", "React Hooks Deep Dive"],
    },
  ];

  const subjects = [
    "all",
    "Programming",
    "Mathematics",
    "Science",
    "Design",
    "Languages",
  ];
  const statuses = ["all", "not-started", "in-progress", "completed"];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || lesson.subject === selectedSubject;
    const matchesStatus =
      selectedStatus === "all" || lesson.status === selectedStatus;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Play className="w-5 h-5 text-blue-500" />;
      case "locked":
        return <Lock className="w-5 h-5 text-muted-foreground" />;
      default:
        return <BookOpen className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lessons</h1>
          <p className="text-muted-foreground">
            Explore and learn from our comprehensive lesson library
          </p>
        </div>

        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          Create New Lesson
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all"
                      ? "All Status"
                      : status === "not-started"
                      ? "Not Started"
                      : status === "in-progress"
                      ? "In Progress"
                      : "Completed"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="hover:shadow-lg transition-all duration-200 group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(lesson.status)}
                  <Badge className={getDifficultyColor(lesson.difficulty)}>
                    {lesson.difficulty}
                  </Badge>
                </div>
                <Badge variant="secondary">{lesson.subject}</Badge>
              </div>

              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {lesson.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lesson.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Bar (for in-progress lessons) */}
              {lesson.status === "in-progress" && lesson.progress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{lesson.progress}%</span>
                  </div>
                  <Progress value={lesson.progress} className="h-2" />
                </div>
              )}

              {/* Prerequisites (for locked lessons) */}
              {lesson.status === "locked" && lesson.prerequisites && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Prerequisites:
                  </p>
                  <div className="space-y-1">
                    {lesson.prerequisites.map((prereq) => (
                      <div
                        key={prereq}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <Lock className="w-3 h-3" />
                        {prereq}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teacher Info */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={lesson.teacher.avatar || "/placeholder.svg"}
                    alt={lesson.teacher.name}
                  />
                  <AvatarFallback className="text-sm">
                    {lesson.teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{lesson.teacher.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{lesson.teacher.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{lesson.studentsEnrolled}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-yellow-600">
                    +{lesson.xpReward} XP
                  </span>
                </div>

                {lesson.status === "locked" ? (
                  <Button disabled size="sm" variant="outline">
                    <Lock className="w-4 h-4 mr-2" />
                    Locked
                  </Button>
                ) : (
                  <Link href={`/lessons/${lesson.id}`}>
                    <Button
                      size="sm"
                      className={
                        lesson.status === "completed"
                          ? "bg-green-600 hover:bg-green-700"
                          : lesson.status === "in-progress"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-primary hover:bg-primary/90"
                      }
                    >
                      {lesson.status === "completed"
                        ? "Review"
                        : lesson.status === "in-progress"
                        ? "Continue"
                        : "Start Lesson"}
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No lessons found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
