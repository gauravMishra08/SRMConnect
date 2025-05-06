import { getFeedback } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash, Eye } from "lucide-react"
import Link from "next/link"

export default async function FeedbackPage() {
  const feedbackList = await getFeedback()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
          <p className="text-muted-foreground">View and manage feedback from students</p>
        </div>
        <Link href="/feedback/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Feedback
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Anonymous</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbackList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No feedback found
                </TableCell>
              </TableRow>
            ) : (
              feedbackList.map((feedback: any) => (
                <TableRow key={feedback.id}>
                  <TableCell>{feedback.id}</TableCell>
                  <TableCell>{feedback.eventName}</TableCell>
                  <TableCell>{feedback.studentName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {feedback.rating}
                      <span className="ml-1 text-yellow-500">★</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                  <TableCell>{feedback.anonymous ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/feedback/${feedback.id}`}>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={`/api/feedback/${feedback.id}/delete`} method="POST">
                        <Button variant="outline" size="icon" className="text-red-500">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
