"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Users, ArrowRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock lesson data
const lessons = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript",
    duration: "2 hours",
    difficulty: "Beginner",
    progress: 75,
    rating: 4.8,
    students: 1250,
    category: "Web Development",
    thumbnail: "/placeholder-lesson.jpg",
  },
  {
    id: "2",
    title: "React Fundamentals",
    description: "Master React components, state, and props",
    duration: "3 hours",
    difficulty: "Intermediate",
    progress: 0,
    rating: 4.9,
    students: 890,
    category: "Web Development",
    thumbnail: "/placeholder-lesson.jpg",
  },
  {
    id: "3",
    title: "Database Design",
    description: "Learn to design efficient database schemas",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    progress: 100,
    rating: 4.7,
    students: 650,
    category: "Database",
    thumbnail: "/placeholder-lesson.jpg",
  },
  {
    id: "4",
    title: "Python for Data Science",
    description: "Introduction to data analysis with Python",
    duration: "4 hours",
    difficulty: "Advanced",
    progress: 30,
    rating: 4.6,
    students: 420,
    category: "Data Science",
    thumbnail: "/placeholder-lesson.jpg",
  },
];

const categories = ["All", "Web Development", "Database", "Data Science", "Mobile Development"];

export default function LessonsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLessons = lessons.filter(lesson => {
    const matchesCategory = selectedCategory === "All" || lesson.category === selectedCategory;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Lessons</h1>
              <p className="text-muted-foreground mt-2">
                Explore our comprehensive learning modules
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "transition-colors",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{lesson.title}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">
                      {lesson.description}
                    </CardDescription>
                  </div>
                  <Badge className={cn("ml-2", getDifficultyColor(lesson.difficulty))}>
                    {lesson.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Progress Bar */}
                {lesson.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>{lesson.progress}%</span>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                  </div>
                )}

                {/* Lesson Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{lesson.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{lesson.students}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full group-hover:bg-primary/90 transition-colors"
                  disabled={lesson.progress === 100}
                >
                  {lesson.progress === 100 ? "Completed" : lesson.progress > 0 ? "Continue" : "Start Lesson"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No lessons found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
