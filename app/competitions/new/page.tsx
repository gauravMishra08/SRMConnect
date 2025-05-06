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
import { DatePicker } from "@/components/date-picker"
import { useToast } from "@/hooks/use-toast"

export default function NewCompetitionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clubs, setClubs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    async function fetchClubs() {
      try {
        const response = await fetch("/api/clubs")
        if (!response.ok) throw new Error("Failed to fetch clubs")
        const data = await response.json()
        setClubs(data)
      } catch (error) {
        console.error("Error fetching clubs:", error)
        // Use mock data if API fails
        setClubs([
          { id: 1, name: "Coding Club" },
          { id: 2, name: "Robotics Club" },
          { id: 3, name: "Entrepreneurship Club" },
          { id: 4, name: "Design Club" },
          { id: 5, name: "AI Research Club" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchClubs()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const competitionData = {
      id: Number(formData.get("id")),
      name: formData.get("name") as string,
      clubId: Number(formData.get("clubId")),
      date: date?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
      venue: formData.get("venue") as string,
      participants: Number(formData.get("participants")),
      prizes: formData.get("prizes") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      rules: formData.get("rules") as string,
    }

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Competition created",
        description: "The competition has been successfully created.",
      })

      router.push("/competitions")
    } catch (error) {
      console.error("Failed to create competition:", error)
      toast({
        title: "Error",
        description: "Failed to create competition. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Competition</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Competition Information</CardTitle>
            <CardDescription>Enter the details of the new competition to add to the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Competition ID</Label>
                <Input id="id" name="id" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Competition Name</Label>
                <Input id="name" name="name" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <DatePicker date={date} setDate={setDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" name="venue" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="participants">Expected Participants</Label>
                <Input id="participants" name="participants" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prizes">Prize Pool</Label>
                <Input id="prizes" name="prizes" required placeholder="₹50,000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rules">Rules & Guidelines</Label>
              <Textarea id="rules" name="rules" rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clubId">Organizing Club</Label>
                <Select name="clubId">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a club" />
                  </SelectTrigger>
                  <SelectContent>
                    {clubs.map((club) => (
                      <SelectItem key={club.id} value={club.id.toString()}>
                        {club.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Competition"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
