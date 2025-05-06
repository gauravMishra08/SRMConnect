import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

// Mock feedback data
const feedbackData = {
  id: 1,
  eventName: "Tech Symposium 2023",
  studentName: "Rahul Sharma",
  rating: 4,
  date: "2023-12-10",
  anonymous: false,
  comments:
    "The event was well organized and the speakers were very knowledgeable. I learned a lot about the latest technologies and trends in the industry. The networking opportunities were also great.",
  suggestion:
    "It would be better if the event could start a bit later in the day to accommodate students with morning classes. Also, providing more refreshments during the breaks would be appreciated.",
  clubName: "Technical Club",
  eventDate: "2023-12-05",
  eventVenue: "Main Auditorium",
}

export default function FeedbackDetailPage({ params }: { params: { id: string } }) {
  const feedback = feedbackData

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/feedback">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Feedback Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Feedback Information</CardTitle>
            <CardDescription>Details of the feedback submitted by the student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Feedback ID</h3>
                <p>{feedback.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date Submitted</h3>
                <p>{new Date(feedback.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Event</h3>
              <p>{feedback.eventName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Student</h3>
              <p>{feedback.anonymous ? "Anonymous" : feedback.studentName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2">{feedback.rating}/5</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Comments</h3>
              <p className="whitespace-pre-line">{feedback.comments}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Suggestions</h3>
              <p className="whitespace-pre-line">{feedback.suggestion}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
            <CardDescription>Details of the event this feedback is for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Event Name</h3>
              <p>{feedback.eventName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Organizing Club</h3>
              <p>{feedback.clubName}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Event Date</h3>
                <p>{new Date(feedback.eventDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Venue</h3>
                <p>{feedback.eventVenue}</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Feedback Summary</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Content Quality</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Organization</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Venue & Facilities</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time Management</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Download as PDF</Button>
        <Button variant="outline" className="text-red-500">
          Delete Feedback
        </Button>
      </div>
    </div>
  )
}
