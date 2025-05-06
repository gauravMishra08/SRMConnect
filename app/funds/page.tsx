import { getFunds } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash } from "lucide-react"
import Link from "next/link"

export default async function FundsPage() {
  const funds = await getFunds()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funds</h1>
          <p className="text-muted-foreground">Manage funds and financial transactions</p>
        </div>
        <Link href="/funds/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Fund
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Club</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {funds.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  No funds found
                </TableCell>
              </TableRow>
            ) : (
              funds.map((fund: any) => (
                <TableRow key={fund.id}>
                  <TableCell>{fund.id}</TableCell>
                  <TableCell>{fund.clubName}</TableCell>
                  <TableCell>{fund.source}</TableCell>
                  <TableCell>₹{fund.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(fund.date).toLocaleDateString()}</TableCell>
                  <TableCell>{fund.type}</TableCell>
                  <TableCell>₹{fund.balance.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        fund.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : fund.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {fund.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/funds/${fund.id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={`/api/funds/${fund.id}/delete`} method="POST">
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
