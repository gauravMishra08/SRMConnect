import { Button } from "@/components/ui/button"
import { getCompetitions } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash } from "lucide-react"
import Link from "next/link"

export default async function CompetitionsPage() {
  const competitions = await getCompetitions() // Correctly fetch competitions

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitions</h1>
          <p className="text-muted-foreground">Manage competitions and challenges in the system</p>
        </div>
        <Link href="/competitions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Competition
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Event ID</TableHead>
              <TableHead>Prize Pool</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Footfall</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No competitions found
                </TableCell>
              </TableRow>
            ) : (
              competitions.map((competition) => (
                <TableRow key={competition.id}>
                  <TableCell>{competition.id}</TableCell>
                  <TableCell className="font-medium">{competition.name}</TableCell>
                  <TableCell>{competition.eventId}</TableCell>
                  <TableCell>{competition.prizePool}</TableCell>
                  <TableCell>{competition.type}</TableCell>
                  <TableCell>{competition.footfall}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/competitions/${competition.id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={`/api/competitions/${competition.id}/delete`} method="POST">
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
