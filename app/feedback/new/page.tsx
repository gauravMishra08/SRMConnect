"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createFeedback } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import { Star } from "lucide-react"

export default function NewFeedbackPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [events, setEvents] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        // Mock data since API might not be available
        setEvents([
          { id: 1, name: "Tech Symposium 2023" },
          { id: 2, name: "Cultural Night" },
          { id: 3, name: "Workshop on AI" },
          { id: 4, name: "Sports Meet" },
          { id: 5, name: "Alumni Meet" },
        ])

        setStudents([
          { id: 1, name: "Rahul Sharma" },
          { id: 2, name: "Priya Patel" },
          { id: 3, name: "Amit Kumar" },
          { id: 4, name: "Sneha Gupta" },
          { id: 5, name: "Vikram Singh" },
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const feedbackData = {
      id: Number(formData.get("id")),
      eventId: Number(formData.get("eventId")),
      studentId: Number(formData.get("studentId")),
      rating: rating,
      comments: formData.get("comments") as string,
      date: new Date().toISOString().split("T")[0],
      suggestion: formData.get("suggestion") as string,
      anonymous: formData.get("anonymous") === "on",
    }

    try {
      await createFeedback(feedbackData)
      toast({
        title: "Feedback submitted",
        description: "Your feedback has been successfully submitted.",
      })
      router.push("/feedback")
      router.refresh()
    } catch (error) {
      console.error("Failed to submit feedback:", error)
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Submit Feedback</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>Share your thoughts about an event or activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Feedback ID</Label>
                <Input id="id" name="id" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventId">Event</Label>
                <Select name="eventId">
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">Student</Label>
              <Select name="studentId">
                <SelectTrigger>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${
                      star <= (hoveredRating || rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea id="comments" name="comments" rows={4} placeholder="Share your experience..." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="suggestion">Suggestions for Improvement</Label>
              <Textarea id="suggestion" name="suggestion" rows={3} placeholder="How can we improve?" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="anonymous" name="anonymous" />
              <Label htmlFor="anonymous">Submit as anonymous</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || rating === 0}>
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
