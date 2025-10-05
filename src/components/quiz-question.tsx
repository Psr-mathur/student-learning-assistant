import type { RadioGroupProps } from '@radix-ui/react-radio-group'
import type { TQuizQuestion } from '../types/lessons.types'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

type TProps = RadioGroupProps & {
  question: TQuizQuestion
}

export const QuizQuestion = ({ question, ...props }: TProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{question.question}</h3>

      <RadioGroup
        {...props}
      >
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/5 transition-colors"
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
              />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
