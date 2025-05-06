import { getAnnouncements } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash } from "lucide-react"
import Link from "next/link"

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Manage announcements in the system</p>
        </div>
        <Link href="/announcements/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Announcement
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Club</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Target Audience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No announcements found
                </TableCell>
              </TableRow>
            ) : (
              announcements.map((announcement: any) => (
                <TableRow key={announcement.id}>
                  <TableCell>{announcement.id}</TableCell>
                  <TableCell className="font-medium">{announcement.title}</TableCell>
                  <TableCell>{announcement.clubName}</TableCell>
                  <TableCell>{new Date(announcement.date).toLocaleDateString()}</TableCell>
                  <TableCell>{announcement.audience}</TableCell>
                  <TableCell>{announcement.status}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/announcements/${announcement.id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={`/api/announcements/${announcement.id}/delete`} method="POST">
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
