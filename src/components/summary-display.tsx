import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TSummary } from "@/types/lessons.types"
import { FileText } from "lucide-react"

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
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-foreground leading-relaxed">{summary}</p>
        </div>
      </CardContent>
    </Card>
  )
}
