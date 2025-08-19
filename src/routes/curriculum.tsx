import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/curriculum")({
  component: CurriculumPage,
});

function CurriculumPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const subjects = [
    "English",
    "Mathematics", 
    "Science",
    "History",
    "Geography",
    "The Arts",
    "Health and Physical Education",
    "Technologies",
    "Languages",
    "Civics and Citizenship",
    "Economics and Business"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Australian Curriculum</h1>
            <p className="text-muted-foreground">
              Select a subject to view its curriculum content
            </p>
          </div>
        </div>
      </div>

      {/* Subject Selector */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Subject</CardTitle>
            <CardDescription>
              Choose a subject area to explore the curriculum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-base"
            >
              <option value="">-- Select a subject --</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      {/* Curriculum Content Placeholder */}
      {selectedSubject ? (
        <Card>
          <CardHeader>
            <CardTitle>{selectedSubject} Curriculum</CardTitle>
            <CardDescription>
              Curriculum content for {selectedSubject} will be displayed here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Curriculum Content</h3>
              <p className="text-muted-foreground">
                This is a placeholder for the {selectedSubject} curriculum content.
                <br />
                In the future, this will display learning outcomes, achievement standards, and content descriptions.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Subject Selected</h3>
              <p className="text-muted-foreground">
                Please select a subject above to view its curriculum content.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
