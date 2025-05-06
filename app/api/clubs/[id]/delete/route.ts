import { NextResponse } from "next/server"
import { deleteClub } from "@/lib/actions"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const result = await deleteClub(id)

    if (!result.success) {
      return NextResponse.json({ error: "Failed to delete club" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting club:", error)
    return NextResponse.json({ error: "Failed to delete club" }, { status: 500 })
  }
}
