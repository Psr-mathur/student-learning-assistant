import { CodingQuestionsCard } from '@/components/coding-questions-card'
import { TheoryQuestionCard } from '@/components/theory-question-card'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, Trophy } from "lucide-react"
import { useState } from "react"
import { useLessonsStore } from '../lessons.store'

// Mock practice problems
const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy" as const,
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
    ],
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "easy" as const,
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    starterCode: `function reverseString(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' },
    ],
  },
  {
    id: 3,
    title: "Valid Palindrome",
    difficulty: "medium" as const,
    description:
      "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    starterCode: `function isPalindrome(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: "true" },
      { input: '"race a car"', expectedOutput: "false" },
    ],
  },
  {
    id: 4,
    title: "Binary Search",
    difficulty: "medium" as const,
    description:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    starterCode: `function search(nums, target) {
  // Write your solution here
  
}`,
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", expectedOutput: "4" },
      { input: "[-1,0,3,5,9,12], 2", expectedOutput: "-1" },
    ],
  },
  {
    id: 5,
    title: "Merge Sorted Arrays",
    difficulty: "hard" as const,
    description:
      "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as one sorted array.",
    starterCode: `function merge(nums1, m, nums2, n) {
  // Write your solution here
  
}`,
    testCases: [
      { input: "[1,2,3,0,0,0], 3, [2,5,6], 3", expectedOutput: "[1,2,2,3,5,6]" },
      { input: "[1], 1, [], 0", expectedOutput: "[1]" },
    ],
  },
]

export default function PracticePage() {
  const { selectedSubject, practices } = useLessonsStore()
  const [selectedProblem, setSelectedProblem] = useState(mockProblems[0])
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set())

  const theoryQuestions = practices.map((q) => q.questions).flat().filter(q => q.type === "theory");

  const codingQuestions = practices.map((q) => q.questions).flat().filter(q => q.type === "coding");

  console.log(selectedProblem);

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Practice Zone</h1>
        <p className="text-muted-foreground text-lg">Sharpen your coding skills with hands-on practice problems</p>
        <p className="text-sm text-muted-foreground mt-1">Current Subject: {selectedSubject?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Code className="h-4 w-4" />
              Total Problems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mockProblems.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="h-4 w-4" />
              Solved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">{solvedProblems.size}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {mockProblems.length > 0 ? Math.round((solvedProblems.size / mockProblems.length) * 100) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theory">Theory</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
        </TabsList>
        <TabsContent value="theory" className="space-y-4">
          {theoryQuestions.map((question, index) => (
            <TheoryQuestionCard key={question.id} question={question} index={index} />
          ))}
        </TabsContent>
        <TabsContent value="coding" className="space-y-4">
          <CodingQuestionsCard questions={codingQuestions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
