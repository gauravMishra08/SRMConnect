import { getClubs } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash } from "lucide-react"
import Link from "next/link"

export default async function ClubsPage() {
  const clubs = await getClubs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clubs</h1>
          <p className="text-muted-foreground">Manage clubs in the system</p>
        </div>
        <Link href="/clubs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Club
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Founded</TableHead>
              <TableHead>President</TableHead>
              <TableHead>Vice President</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clubs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No clubs found
                </TableCell>
              </TableRow>
            ) : (
              clubs.map((club: any) => (
                <TableRow key={club.id}>
                  <TableCell>{club.id}</TableCell>
                  <TableCell className="font-medium">{club.name}</TableCell>
                  <TableCell>{club.domain}</TableCell>
                  <TableCell>{club.foundedYear}</TableCell>
                  <TableCell>{club.presidentName}</TableCell>
                  <TableCell>{club.vicePresidentName}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/clubs/${club.id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={`/api/clubs/${club.id}/delete`} method="POST">
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
