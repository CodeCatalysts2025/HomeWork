"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lightbulb, Code, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonContentProps {
  sectionId: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export function LessonContent({ sectionId, onComplete, isCompleted }: LessonContentProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock content data - in real app this would be fetched based on sectionId
  const content = {
    slides: [
      {
        id: "1",
        type: "intro",
        title: "What are JavaScript Variables?",
        content: "Variables are containers that store data values. In JavaScript, you can create variables using var, let, or const keywords.",
        example: `let message = "Hello, World!";
const pi = 3.14159;
var userName = "Alex";`,
        tips: ["Use 'let' for variables that can change", "Use 'const' for constants", "Avoid 'var' in modern JavaScript"],
      },
      {
        id: "2",
        type: "concept",
        title: "Data Types in JavaScript",
        content: "JavaScript has several built-in data types including strings, numbers, booleans, arrays, and objects.",
        example: `// Different data types
let name = "Sarah";        // String
let age = 25;             // Number
let isStudent = true;     // Boolean
let hobbies = ["coding", "reading"]; // Array
let person = { name: "Alex", age: 20 }; // Object`,
        tips: ["JavaScript is dynamically typed", "You don't need to declare variable types", "Use typeof to check data types"],
      },
      {
        id: "3",
        type: "practice",
        title: "Try It Yourself!",
        content: "Now let's practice creating variables. Try creating a variable for your favorite color:",
        example: `// Your turn! Create a variable for your favorite color
let favoriteColor = "blue";
 
// Create a variable for your age
let myAge = 18;
 
// Create a boolean for whether you like programming
let likesProgramming = true;`,
        tips: ["Practice makes perfect!", "Try different data types", "Experiment with the examples"],
      },
    ],
  };

  const currentSlideData = content.slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < content.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Completed all slides
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const getSlideIcon = (type: string) => {
    switch (type) {
      case "intro":
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case "concept":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "practice":
        return <Code className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center gap-2">
        {content.slides.map((_, index) => (
          <div key={index} className={cn("h-2 flex-1 rounded-full transition-colors", index <= currentSlide ? "bg-primary" : "bg-muted")} />
        ))}
      </div>

      {/* Slide Content */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          {getSlideIcon(currentSlideData.type)}
          <h2 className="text-2xl font-bold">{currentSlideData.title}</h2>
          <Badge variant="outline" className="capitalize">
            {currentSlideData.type}
          </Badge>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">{currentSlideData.content}</p>
        </div>

        {/* Code Example */}
        {currentSlideData.example && (
          <Card className="bg-gray-50 dark:bg-gray-900/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Code Example</span>
              </div>
              <pre className="text-sm overflow-x-auto">
                <code className="language-javascript">{currentSlideData.example}</code>
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        {currentSlideData.tips && (
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Pro Tips</span>
              </div>
              <ul className="space-y-2">
                {currentSlideData.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button variant="outline" onClick={handlePrevious} disabled={currentSlide === 0}>
          Previous
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {currentSlide + 1} of {content.slides.length}
          </span>
        </div>

        <Button onClick={handleNext} className="flex items-center gap-2">
          {currentSlide === content.slides.length - 1 ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Complete Section
            </>
          ) : (
            "Next"
          )}
        </Button>
      </div>

      {/* Completion Status */}
      {isCompleted && (
        <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Section Completed!</span>
          </div>
        </div>
      )}
    </div>
  );
}
