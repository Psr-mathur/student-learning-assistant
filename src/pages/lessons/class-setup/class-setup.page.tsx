import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LessonsService from '@/services/lessons/lessons.service'
import { BookOpen, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCurrentSubjectStore } from '../lessons.store'

export function ClassSetupPage() {
  const navigate = useNavigate();
  const { selectedSubject, setSelectedSubject } = useCurrentSubjectStore()
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const { data: subjects } = LessonsService.useGetSubjects({});

  useEffect(() => {
    if (!selectedSubject.id) {
      if (subjects && subjects.length > 0) {
        setSelectedSubject(subjects[0]);
      }
    }
  }, [subjects, selectedSubject.id, setSelectedSubject]);

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Class Setup</h1>
        <p className="text-muted-foreground text-lg">Select a subject to begin your learning journey</p>
      </div>

      {selectedSubject && (
        <Card className="mb-8 border-primary/50 bg-card/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  Current Subject
                </CardTitle>
                <CardDescription>Active learning path</CardDescription>
              </div>
              {/* <Button variant="outline" size="sm" onClick={() => setSelectedSubject(null)}>
                Change Subject
              </Button> */}
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-semibold mb-4">{selectedSubject.name}</h3>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Syllabus Topics:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSubject.syllabus.map((topic, index) => (
                  <Badge key={index} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects?.map((subject) => (
          <Card
            key={subject.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${selectedSubject?.id === subject.id ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50"
              }`}
            onMouseEnter={() => setHoveredSubject(subject.id)}
            onMouseLeave={() => setHoveredSubject(null)}
            onClick={() => setSelectedSubject(subject)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen
                  className={`h-5 w-5 ${hoveredSubject === subject.id || selectedSubject?.id === subject.id
                    ? "text-primary"
                    : "text-muted-foreground"
                    }`}
                />
                {subject.name}
              </CardTitle>
              <CardDescription>{subject.syllabus.length} topics covered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {subject.syllabus.slice(0, 4).map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{topic}</span>
                  </div>
                ))}
                {subject.syllabus.length > 4 && (
                  <p className="text-sm text-muted-foreground italic">+{subject.syllabus.length - 4} more topics</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={() => {
          if (!selectedSubject) {
            toast.error('Please select a subject')
            return
          }
          navigate('/lessons/pre-class')
        }}>Next</Button>
      </div>
    </div>
  )
}
