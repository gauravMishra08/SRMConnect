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
import { createResource } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

export default function NewResourcePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clubs, setClubs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
    const resourceData = {
      id: Number(formData.get("id")),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      quantity: Number(formData.get("quantity")),
      availability: formData.get("availability") as string,
      cost: Number(formData.get("cost")),
      maintenanceSchedule: formData.get("maintenanceSchedule") as string,
      clubId: Number(formData.get("clubId")),
    }

    try {
      await createResource(resourceData)
      toast({
        title: "Resource created",
        description: "The resource has been successfully created.",
      })
      router.push("/resources")
      router.refresh()
    } catch (error) {
      console.error("Failed to create resource:", error)
      toast({
        title: "Error",
        description: "Failed to create resource. Please try again.",
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
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Resource</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Resource Information</CardTitle>
            <CardDescription>Enter the details of the new resource to add to the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Resource ID</Label>
                <Input id="id" name="id" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Resource Name</Label>
                <Input id="name" name="name" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" name="quantity" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Cost (₹)</Label>
                <Input id="cost" name="cost" type="number" step="0.01" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select name="availability">
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="In Use">In Use</SelectItem>
                    <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                    <SelectItem value="Not Available">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceSchedule">Maintenance Schedule</Label>
                <Input id="maintenanceSchedule" name="maintenanceSchedule" placeholder="e.g., Monthly" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clubId">Assigned Club</Label>
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Resource"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
