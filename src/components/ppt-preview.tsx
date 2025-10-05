import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TDocument } from '@/types/lessons.types'
import { FileText, Presentation } from "lucide-react"

interface PPTPreviewProps {
  document: TDocument
}

export function PPTPreview({ document }: PPTPreviewProps) {
  // Mock slide previews
  const slides = [
    { id: 1, title: "Introduction", content: "Overview of key concepts" },
    { id: 2, title: "Core Principles", content: "Fundamental theories and applications" },
    { id: 3, title: "Practical Examples", content: "Real-world use cases" },
    { id: 4, title: "Advanced Topics", content: "Deep dive into complex scenarios" },
    { id: 5, title: "Summary", content: "Key takeaways and next steps" },
  ]

  console.log(document);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Presentation className="h-5 w-5 text-primary" />
            Presentation Preview
          </CardTitle>
          <Badge variant="secondary">{slides.length} slides</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {slides.map((slide) => (
            <Card key={slide.id} className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium mb-1">Slide {slide.id}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{slide.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
