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
import { createClub } from "@/lib/actions"

export default function NewClubPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch("/api/students")
        if (!response.ok) throw new Error("Failed to fetch students")
        const data = await response.json()
        setStudents(data)
      } catch (error) {
        console.error("Error fetching students:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const clubData = {
      id: Number(formData.get("id")),
      name: formData.get("name") as string,
      domain: formData.get("domain") as string,
      foundedYear: Number(formData.get("foundedYear")),
      description: formData.get("description") as string,
      presidentId: Number(formData.get("presidentId")),
      vicePresidentId: Number(formData.get("vicePresidentId")),
      email: formData.get("email") as string,
    }

    try {
      await createClub(clubData)
      router.push("/clubs")
      router.refresh()
    } catch (error) {
      console.error("Failed to create club:", error)
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Club</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Club Information</CardTitle>
            <CardDescription>Enter the details of the new club to add to the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Club ID</Label>
                <Input id="id" name="id" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Club Name</Label>
                <Input id="name" name="name" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input id="domain" name="domain" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input id="foundedYear" name="foundedYear" type="number" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="presidentId">President</Label>
                <Select name="presidentId">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a president" />
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
                <Label htmlFor="vicePresidentId">Vice President</Label>
                <Select name="vicePresidentId">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vice president" />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Club Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Club"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
