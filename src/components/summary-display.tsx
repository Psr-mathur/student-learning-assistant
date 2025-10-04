import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TSummary } from "@/types/lessons.types"
import { Clock, FileText } from "lucide-react"

interface SummaryDisplayProps {
  summary: TSummary
}

export function SummaryDisplay({ summary }: SummaryDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Generated Summary
          </CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(summary.generatedAt).toLocaleTimeString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-foreground leading-relaxed">{summary.content}</p>
        </div>
      </CardContent>
    </Card>
  )
}
